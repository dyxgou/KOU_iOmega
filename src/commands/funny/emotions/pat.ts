import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const embed = await gifEmbed(message , "pat")

    const mention = message.mentions.members?.first()

    if(!mention)
      embed.setDescription(`Ola'. ${message.author} está lleno de cazpa. p.p`)
    else
      embed.setDescription(`${message.author} está acariciando la cabeza de ${mention}. o.O`)
    
    return message.channel.send({ embeds : [ embed ] })
  }
} as ICallback