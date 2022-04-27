import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "utils/embeds";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    const mentionated = message.mentions.members?.first()
    const { author } =  message

    const embed = gifEmbed("slap")

    if(author.id === mentionated?.id)
      return message.reply("¿ Qué haces mencionandote a ti mismo ? 😎 ")

    if(!mentionated)
      embed.setDescription(`${author}, ya deje de ser tan métido, tan lambón, marika. 😡`)
    else
      embed.setDescription(`${author} le ha dado una cachetada a ${mentionated}. 😎`)

    return message.reply({
      embeds : [ embed ]
    })
  }
} as ICallback
