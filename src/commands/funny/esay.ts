import { Message, MessageEmbed } from "discord.js";
import { ICallback } from "utils/Command";

export default  {
  callback : (message : Message , ...args : string[]) => 
  {
    if(args.length === 0)
      return message.reply("`z!esay [ Mensaje a enviar ]`")

    const embed = new MessageEmbed({
      author : {
        iconURL : message.guild?.iconURL() || "",
        name : "Secreto 🤫"
      },
      color :  "RANDOM",
      description : args.join(" "),
    })

    return message.channel.send({ embeds : [ embed ] })
      .then(() => message.delete())
  },
  help : `Podrás mandar un mensaje bonito con nuestro bot. 🤩`
} as ICallback