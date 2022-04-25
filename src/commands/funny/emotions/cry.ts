import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const embed = await gifEmbed(message , "lonely")

    const mention = message.mentions.members?.first()

    if(message.author.id === mention?.id) 
      return message.reply("¿Qué haces mencionandote a ti mismo? o.O")
      
    if(!mention)
      embed.setDescription(`Lloremos juntos ${message.author}. 😭`)
    else
      embed.setDescription(`${message.author} está llorando con ${mention}. :c`)
    
    return message.channel.send({ embeds : [ embed ] })
  }
} as ICallback