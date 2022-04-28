import { Message } from "discord.js";
import { ICallback } from "utils/Command";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    if(args.length === 0)
      return message.reply("`z!say [ Mensaje a enviar ]`")

    message.channel.send(args.join(" ")).then(() => message.delete())
  },
  help : `Podrás enviar un mensaje común con nuestro bot. 🤩`
} as ICallback