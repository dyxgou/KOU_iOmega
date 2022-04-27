import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    const mentionated = message.mentions.members?.first()
    const { author } =  message

    const embed = gifEmbed("run")
      .setFooter({text : "WTF amigo con los Gifs. ._."})

    if(author.id === mentionated?.id)
      return message.reply("¿ Qué haces mencionandote a ti mismo ? 😎 ")

    if(!mentionated)
      embed.setDescription(`${author} se está lamiendo. 😐`)
    else
      embed.setDescription(`${author} está contagiado de enfermedades a ${mentionated} con su lengua. 🤮`)

    return message.reply({
      embeds : [ embed ]
    })
  }
} as ICallback
