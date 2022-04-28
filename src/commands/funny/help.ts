import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import getCmdDescription from "../../utils/getCmdDescription";
import { helpCategories } from "../../utils/embeds";

export default {
  callback : (message : Message ,  ...args : string[]) => 
  {
    const category = args[0]

    if(!category)
      return message.reply({ embeds : [ helpCategories() ] })

    const embed = getCmdDescription(message ,  category)

    return message.reply({ embeds : [ embed ] })
  }
} as ICallback