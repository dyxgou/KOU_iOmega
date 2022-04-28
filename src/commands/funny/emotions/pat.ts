import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    const mentionated = message.mentions.members?.first()
    const { author } =  message

    const embed = gifEmbed("pat")

    if(author.id === mentionated?.id)
      return message.reply("¿ Qué haces mencionandote a ti mismo ? 😎 ")

    if(!mentionated)
      embed.setDescription(`${author}, sólo dejese querer. -w-`)
    else
      embed.setDescription(`${author} está acariciando la cabeza de ${mentionated}. o.O`)

    return message.reply({
      embeds : [ embed ]
    })
  },
  help:  `Iniciarás tu camino en el Simpismo con este comando o también se lo darás alguien que quiera una acaricia. 😋`
} as ICallback
