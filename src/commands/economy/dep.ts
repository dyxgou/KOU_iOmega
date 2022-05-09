import { Message } from "discord.js";
import UserSchema from "../../schemas/UserSchema";
import { ICallback } from "utils/Command";
import { getUserInfo } from "../../utils/getInformation";
import { commonEmbed, userNotFoundEmbed } from "../../utils/embeds";

const ALL_OF_CASH = "all"

export default {
  callback : async(message : Message ,  ...args : string[]) => 
  {
    const userInfo = getUserInfo(message)

    const amountToDep = args[0]
    if(!amountToDep) 
      return message.reply("`z!dep [Cantidad a depositar]`")

    const user = await UserSchema.findOne(userInfo)
    
    if(!user)
      return message.reply({ embeds : [ userNotFoundEmbed(message) ] })
    
    if(user?.cash <= 0 || +amountToDep <= 0)
      return message.reply(`No puedes depositar una cantidad menor o igual a 0. <:what:852705600226983996>`)


    
    let finalAmount : number

    if(amountToDep === ALL_OF_CASH)
      finalAmount = user?.cash
    else
      finalAmount = parseInt(amountToDep)
    
    const embed = commonEmbed(message)
    
    try {

      await user.updateOne({
        $inc : {
          cash : Math.floor(-finalAmount),
          bank : Math.floor(finalAmount)
        }
      })

      embed.setDescription(`Has depositado la cantidad de \`$ ${finalAmount} \`. <a:Bling:967855659477524560>`)
    } catch (error) {
      console.error({ error })

      embed.setDescription(`Ha ocurrido un error al depositar tú dinero.`)
    }
 
    return message.reply({ embeds : [ embed ] })    
  },
  help : `Podrás depositar tu dinero en el banco, para que no te lo roben. 🧐`
} as ICallback