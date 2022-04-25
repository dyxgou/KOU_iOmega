import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const embed = await gifEmbed(message , "lick")

    const mention = message.mentions.members?.first()

    if(!mention)
      embed.setDescription(`${message.author} se está lamiendo. . _.XD`)
    else
      embed.setDescription(`${message.author} está contagiando de enfermedades a ${mention} con su lengua. 🤮`)
    
    return message.channel.send({ embeds : [ embed ] })
  }
} as ICallback