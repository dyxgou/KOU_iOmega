import { Message } from "discord.js";
import UserSchema from "../../schemas/UserSchema";
import { ICallback } from "utils/Command";
import { getMentionInfo , getUserInfo } from "../../utils/getInformation";
import { commonEmbed } from "../../utils/embeds";

const ALL_MONEY = "all"

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const userToPayInfo = getMentionInfo(message , ...args)
    const userInfo = getUserInfo(message)
    const amountToPay = args[1]
    let amount : number

    if(userInfo.userId === userToPayInfo.userId)
      return message.reply("No puedes pagarte a ti mismo. <:DiegoDramatico:967630588825722922>")

    if(!userInfo || !amountToPay)
      return message.reply("<:tree:967860441420275792> `z!pay [Miembro] [cantidad]`")

    const [ user , userToPay ] = await Promise.all([
      UserSchema.findOne(userInfo),
      UserSchema.findOne(userToPayInfo),
    ])

    if(!user || !userToPay)
      return message.reply("Alguno de los dos usuarios no está registrado en la base de datos")

    if(parseInt(amountToPay))
      amount = parseInt(amountToPay)
    else if(amountToPay === ALL_MONEY)
      amount = user?.cash
    else
      return message.reply("No puedes pagar cantidades menores o iguales a cero. <:pepewtf:967630589488418886>")
  
    const embed = commonEmbed(message)

    

    try {
      await userToPay?.updateOne({
        $inc : {
          cash : amount
        }
      })

      await user?.updateOne({
        $inc : {
          cash : -amount
        }
      })

      embed.setDescription(`Le has pagado \`$${amount}\` a <@!${userToPay.userId}>. 😍`)
    } catch (error) {
      console.error({ error });
      
      embed.setDescription(`Ha ocurrido un error cuando fuiste a sacar tu dinero.`)
    }

    return message.reply({ embeds :  [ embed ] })
  }
} as ICallback