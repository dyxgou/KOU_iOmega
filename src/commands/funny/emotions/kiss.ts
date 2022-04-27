import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    const mentionated = message.mentions.members?.first()
    const { author } =  message

    const embed = gifEmbed("kiss")

    if(author.id === mentionated?.id)
      return message.reply("¿ Qué haces mencionandote a ti mismo ? 😎 ")

    if(!mentionated)
      embed.setDescription(`${author} se está besando con la parejita. 7u7`)
    else
      embed.setDescription(`${author} le dio un beso a ${mentionated}. 7w7`)

    return message.reply({
      embeds : [ embed ]
    })
  }
} as ICallback
