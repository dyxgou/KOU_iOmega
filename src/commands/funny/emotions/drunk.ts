import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    const mentionated = message.mentions.members?.first()
    const { author } =  message

    const embed = gifEmbed("drunk")

    if(author.id === mentionated?.id)
      return message.reply("¿ Qué haces mencionandote a ti mismo ? 😎 ")

    if(!mentionated)
      embed.setDescription(`${author}, está tomado . 🥴`)
    else
      embed.setDescription(`La bola de sinvergüenzas de ${author} y ${mentionated} se pusieron a tomar. 😡 || 🥴 ||`)

    return message.reply({
      embeds : [ embed ]
    })
  }
} as ICallback
