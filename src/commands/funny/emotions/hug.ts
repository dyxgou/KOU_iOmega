import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    const mentionated = message.mentions.members?.first()
    const { author } =  message

    const embed = gifEmbed("hug")

    if(author.id === mentionated?.id)
      return message.reply("¿ Qué haces mencionandote a ti mismo ? 😎 ")

    if(!mentionated)
      embed.setDescription(`Ven ${author}, dame un abrazo . 😋`)
    else
      embed.setDescription(`${author} está abrazando a ${mentionated}. 😳`)

    return message.reply({
      embeds : [ embed ]
    })
  },
  help : `Podrás demostrar tu amor y que eres tremendo Simp con este comando. 😳`
} as ICallback
