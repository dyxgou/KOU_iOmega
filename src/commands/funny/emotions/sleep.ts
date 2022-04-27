import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "utils/embeds";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    const mentionated = message.mentions.members?.first()
    const { author } =  message

    const embed = gifEmbed("sleep")

    if(author.id === mentionated?.id)
      return message.reply("¿ Qué haces mencionandote a ti mismo ? 😎 ")

    if(!mentionated)
      embed.setDescription(`${author} se fue a hacer la mimisión. 🤩`)
    else
      embed.setDescription(`${author} se fue a dormir con ${mentionated}. 😳`)

    return message.reply({
      embeds : [ embed ]
    })
  }
} as ICallback
