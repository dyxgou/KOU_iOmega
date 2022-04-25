import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { gifEmbed } from "../../../utils/embeds";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const embed = await gifEmbed(message , "drunk")

    const mention = message.mentions.members?.first()
    
    if(message.author.id === mention?.id) 
      return message.reply("¿Qué haces mencionandote a ti mismo? o.O")

    if(!mention)
      embed.setDescription(`${message.author} se puso a tirar mari... digo vino. 😈`)
    else
      embed.setDescription(`La partida de sinvergüenzas de ${message.author} y ${mention} se pusieron a tomar. 😡`)
    
    return message.channel.send({ embeds : [ embed ] })
  }
} as ICallback