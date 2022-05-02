import { Message } from 'discord.js';
import NationSchema from '../../schemas/NationSchema';
import { ICallback } from 'utils/Command';
import { commonEmbed, notNationsFound } from '../../utils/embeds';
import { getUserInfo } from '../../utils/getInformation';

export default {
  callback : async(message : Message , ...args: string[]) => 
  {
    const userInfo = getUserInfo(message) 

    const nation = await NationSchema.findOne(userInfo)

    if(!nation)
      return message.reply({ embeds : [ notNationsFound(message) ] })

    const embed = commonEmbed(message) 
      .setDescription(`A continuación te mostramos las estadisticas de tu nación 😎 : `)
      .setAuthor({ name : `${message.author.username}'s nation` })
      .setFields([
        {
          name : "**( <a:Bling:967855659477524560> ) Nombre**",
          value : `\`${nation.name}\``,
        },
        {
          name : "**( 👶 )  Población**",
          value : `\`${nation.nationPopulation} Personas\``
        },
        {
          name : "**( <a:Diamond2:969254860639834132> ) PIB Nacional**",
          value : `\`$${nation.nationPIB} PerYear\``
        },
        {
          name : "**( <a:Ok4:969254863361962034> ) Deficit Nacional**",
          value : `\`${nation.nationDebit}Km^2\``
        }, 
        {
          name : "**( 🗺️ ) Extención territorial**",
          value : `\`${nation.nationExtention}Km^2\``
        },
      ])

    return message.reply({ embeds : [ embed ] })
  }
} as ICallback