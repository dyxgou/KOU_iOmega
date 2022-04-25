import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const embed = await gifEmbed(message , "bread")

    const mention = message.mentions.members?.first()

    if(message.author.id === mention?.id) 
      return message.reply("¿Qué haces mencionandote a ti mismo? o.O")

    if(!mention)
      embed.setDescription(`${message.author} aquí tienes tu legendario **PAN KOU**. OwO`)
    else
      embed.setDescription(`${message.author} le está dando un legendario **PAN KOU** a ${mention}. o.O`)
    
    return message.channel.send({ embeds : [ embed ] })
  }
} as ICallback