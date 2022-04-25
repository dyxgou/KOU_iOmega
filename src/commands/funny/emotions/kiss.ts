import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const embed = await gifEmbed(message , "kiss")

    const mention = message.mentions.members?.first()

    if(message.author.id === mention?.id) 
      return message.reply("¿Qué haces mencionandote a ti mismo? o.O")

    if(!mention)
      embed.setDescription(`${message.author} se está besando con la parejita. 7u7`)
    else
      embed.setDescription(`${message.author} está besando a ${mention}. 😈 7u7`)
    
    return message.channel.send({ embeds : [ embed ] })
  }
} as ICallback