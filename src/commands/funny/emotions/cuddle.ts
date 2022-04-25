import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const embed = await gifEmbed(message , "cuddle")

    const mention = message.mentions.members?.first()

    if(!mention)
      embed.setDescription(`${message.author} se hizo en mi hombro el/la mari**. >:c`)
    else
      embed.setDescription(`${message.author} se acurruco cerca de ${mention}. 7u7`)
    
    return message.channel.send({ embeds : [ embed ] })
  }
} as ICallback