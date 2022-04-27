import { Message, MessageEmbed } from "discord.js";
import { userNotFoundEmbed } from "../../utils/embeds";
import UserSchema from "../../schemas/UserSchema";
import { ICallback } from "../../utils/Command";
import { getMentionInfo, getUserInfo , IUserInfo } from "../../utils/getInformation";
import { randomInt } from "mathjs";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    let userInfo : IUserInfo

    const notFound = userNotFoundEmbed(message)

    if(!!message.mentions.members?.first()) 
    {
      userInfo = getMentionInfo(message , ...args)

      notFound.setDescription(`No hemos encontrado a <@!${userInfo.userId}> en el sistema de Economía, es posible que no se haya registrado. o.O`)
    }
    else 
    {
      userInfo = getUserInfo(message)
    }

    const user = await UserSchema.findOne(userInfo , {
      cash : true , bank : true , _id : false
    })

    if(!user)
      return message.reply({ embeds : [ notFound ] })

    const total = user?.cash + user?.bank

    const embed = new MessageEmbed({
      author : { name : "ECONOMY - BALANCE" ,  iconURL : message.guild?.iconURL({ dynamic : true }) || "" },
      color : "RANDOM",
      description : `**Nombre** : <@!${userInfo.userId}>
      **Número de cuenta** : ||\`${randomInt(0 , 999)}\`||
      **Contraseña** : ||\`${randomInt(1000 , 9999)}\`||`,
      timestamp : Date.now(),
      fields : [
        {
          name : "| 🪙 | KOINS",
          value : `\`$ ${user?.cash.toFixed(0)}\``,
          inline : true
        }, 
        {
          name : "| 🏦 | BANK",
          value : `\`$ ${user?.bank.toFixed(0)}\``,
          inline : true
        },
        {
          name : "| 🏧 | TOTAL",
          value : `\`$ ${total.toFixed(0)}\``,
          inline : true 
        }
      ]
    })

    return message.reply({ embeds : [ embed ] })
  }
} as ICallback