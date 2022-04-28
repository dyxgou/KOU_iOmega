import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    const mentionated = message.mentions.members?.first()
    const { author } =  message

    const embed = gifEmbed("run")

    if(author.id === mentionated?.id)
      return message.reply("¿ Qué haces mencionandote a ti mismo ? 😎 ")

    if(!mentionated)
      embed.setDescription(`${author} está escapando, quién sabe de qué. 🧐🤙`)
    else
      embed.setDescription(`${author} está escapando de ${mentionated}. 😵`)

    return message.reply({
      embeds : [ embed ]
    })
  },
  help : `Podrás escapar de tod@s es@s acosador@s  que te persiguen por ser más hermos@ que el atardecer y rápido que MessiChiquito. 😎`
} as ICallback
