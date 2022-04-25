import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const embed = await gifEmbed(message , "bite")

    const mention = message.mentions.members?.first()

    if(message.author.id === mention?.id) 
      return message.reply("¿Qué haces mencionandote a ti mismo? o.O")

    if(!mention)
      embed.setDescription(`${message.author} sabe a Otaku y a canela. -w-`)
    else
      embed.setDescription(`${message.author} está mordiendo a ${mention}. p-p`)
    
    return message.channel.send({ embeds : [ embed ] })
  }
} as ICallback