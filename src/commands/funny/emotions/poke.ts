import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const embed = await gifEmbed(message , "poke")

    const mention = message.mentions.members?.first()

    if(!mention)
      embed.setDescription(`La piel de ${message.author} está suave. p.p`)
    else
      embed.setDescription(`${message.author} está manoseando a ${mention}. p-P`)
    
    return message.channel.send({ embeds : [ embed ] })
  }
} as ICallback