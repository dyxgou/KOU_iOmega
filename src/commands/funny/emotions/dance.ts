import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    const mentionated = message.mentions.members?.first()
    const { author } =  message

    const embed = gifEmbed("dance")

    if(author.id === mentionated?.id)
      return message.reply("¿ Qué haces mencionandote a ti mismo ? 😎 ")

    if(!mentionated)
      embed.setDescription(`${author} está sacando los prohibidos. 🤑🤙`)
    else
      embed.setDescription(`${author} y ${mentionated} están bailando. OwO`)

    return message.reply({
      embeds : [ embed ]
    })
  },
  help : `Podrás pegarte un **EL PERREO Y LA DIGNIDAD HASTA ABAJO** con este comando. 🥵`
} as ICallback
