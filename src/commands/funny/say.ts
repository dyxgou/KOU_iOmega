import { Message } from "discord.js";
import { ICallback } from "utils/Command";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    if(args.length === 0)
      return

    message.channel.send(args.join(" ")).then(() => message.delete())
  }
} as ICallback