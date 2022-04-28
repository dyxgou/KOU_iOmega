import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { commonEmbed } from "../../utils/embeds";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    const serverImage = message.guild?.iconURL({ dynamic : true , size : 1024 })
    
    if(!serverImage)
      return

    const embed = commonEmbed(message)
      .setAuthor({ name : `${message.guild?.name}'s Icon` })
      .setImage(serverImage)
      .setFooter({
        text : "Re fachero  😎"
      })

    return message.reply({ embeds : [ embed ] })
  },
  help : `Podrás ver la imagen que porta tu hermosa comunidad o server. 🤩`
} as ICallback