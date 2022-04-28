import { ImageURLOptions, Message, MessageEmbed } from "discord.js";
import { ICallback } from "utils/Command";
import { commonEmbed } from "utils/embeds";

export default {
  callback : (message : Message , ...args : string[]) => 
  { 
    const mentionated = message.mentions.members?.first()
    const { author } = message
    const options : ImageURLOptions  = { dynamic : true , size : 1024 }

    const embed = new MessageEmbed({
      color : "RANDOM",
      timestamp : Date.now(),
      footer : { text : "Re fachero" , iconURL : "https://cdn.discordapp.com/emojis/848385379031711754.webp?size=96&quality=lossless"  }
    })

    if(!mentionated)
    {
      embed
        .setImage(author.displayAvatarURL(options))
        .setAuthor({ name : `${author.username}'s avatar` , iconURL : message.guild?.iconURL() || "" })
    }
    else
    {
      embed
        .setImage(mentionated.displayAvatarURL(options))
        .setAuthor(
          { name : `${mentionated.user.username}'s avatar`,  iconURL : message.guild?.iconURL() || "" }
        )
    }

    return message.reply({ embeds : [ embed ] })
  }  ,
  help : `Muestra lo fachero que eres y no serán los demás con tu Avatar al aire libre. 😎`
} as ICallback