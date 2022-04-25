import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const embed = await gifEmbed(message , "punch")

    const mention = message.mentions.members?.first()

    if(!mention)
      embed.setDescription(`${message.author} está escpando de su ... Está en un maraton. 🧐`)
    else
      embed.setDescription(`${message.author} y ${mention} se están escapando de quién sabe qué. 🤫`)
    
    return message.channel.send({ embeds : [ embed ] })
  }
} as ICallback