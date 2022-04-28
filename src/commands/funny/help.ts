import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import getCmdCategory from "../../utils/getCmdCategory";
import { helpCategories } from "../../utils/embeds";

export default {
  callback : (message : Message ,  ...args : string[]) => 
  {
    const category = args[0]

    if(!category)
      return message.reply({ embeds : [ helpCategories() ] })

    const embed = getCmdCategory(message ,  category)

    return message.reply({ embeds : [ embed ] })
  },
  help : `Tendrás una pequeña descripción de cada comando y su categoría.`
} as ICallback