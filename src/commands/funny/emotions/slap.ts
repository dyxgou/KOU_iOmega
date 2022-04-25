import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const embed = await gifEmbed(message , "punch")

    const mention = message.mentions.members?.first()

    if(!mention)
      embed.setDescription(`Ole' ${message.author}, labese esa getta con jabón rey. 😡`)
    else
      embed.setDescription(`${message.author} está cacheteando a ${mention}. 😟`)
    
    return message.channel.send({ embeds : [ embed ] })
  }
} as ICallback