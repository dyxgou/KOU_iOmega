import { Message } from "discord.js";
import UserSchema from "../../schemas/UserSchema";
import { ICallback } from "utils/Command";
import { getUserInfo } from "../../utils/getInformation";
import { commonEmbed } from "../../utils/embeds";
import { userNotFoundEmbed } from "../../utils/embeds";

const WITH_ALL_BANK = "all"

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const userInfo = getUserInfo(message)

    const amountToWith = args[0]

    const user  = await UserSchema.findOne(userInfo)

    let finalAmount : number

    const embed = commonEmbed(message)

    if(!user)
      return message.reply({ embeds : [ userNotFoundEmbed(message) ] })
    
      
    if(user?.bank <= 0 || +amountToWith <= 0)
      return message.reply(`No puedes retirar cantidades menores o iguales a cero del banco. :angry:`)
    

    if(amountToWith === WITH_ALL_BANK)
      finalAmount = user?.bank
    else
      finalAmount = parseInt(amountToWith)

    try {
      await user.updateOne({
        $inc : {
          cash : Math.floor(finalAmount),
          bank : Math.floor(-finalAmount)
        }
      })
      
      embed.setDescription(`Has retirado del banco la cantidad de \`$ ${finalAmount}\` del banco. :bank:`)
    } catch (error) {
      console.error({ error });
    
      embed.setDescription(`Ha ocurrido un error al retirar tu dinero.`)
    }
    
    return message.reply({ embeds : [ embed ] })
  },
  help : `Podrás sacar tu dinero del banco, para poder usarlo para otra cosa, pero cuídado, si tu dinero está en tu bolcillo, te puden robar. 😡`
} as ICallback