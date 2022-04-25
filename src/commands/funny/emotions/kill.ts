import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const embed = await gifEmbed(message , "kill")

    const mention = message.mentions.members?.first()

    if(!mention)
      embed.setDescription(`${message.author} se encontró con unos matones. 😢`)
    else
      embed.setDescription(`${message.author} mató a ${mention}. D:`)
    
    return message.channel.send({ embeds : [ embed ] })
  }
} as ICallback