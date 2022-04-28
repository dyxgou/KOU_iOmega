import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    const mentionated = message.mentions.members?.first()
    const { author } =  message

    const embed = gifEmbed("kill")

    if(author.id === mentionated?.id)
      return message.reply("¿ Qué haces mencionandote a ti mismo ? 😎 ")

    if(!mentionated)
      embed.setDescription(`Venga ${author}, que acá nos damos en la getta. 😡
      *- Lo mata -*`)
    else
      embed.setDescription(`${author} mató a ${mentionated}. 😭  ||😎||`)

    return message.reply({
      embeds : [ embed ]
    })
  },
  help : `Podrás usar tu Nerf o nada, para inflar tus Kills con ésta bola de mancos. 🤑🤙`
} as ICallback
