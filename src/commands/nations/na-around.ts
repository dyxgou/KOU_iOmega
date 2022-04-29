import { EmbedFieldData, Message } from 'discord.js';
import NationSchema from '../../schemas/NationSchema';
import { ICallback } from 'utils/Command';
import { notNationsFound, serverNotFoundEmbed, commonEmbed } from '../../utils/embeds';

interface Nation 
{
  userId : string,
  name : string,
  nationExtention : number
}

export default {
  callback : async(message : Message , ...args: string[]) => 
  {
    const { guildId } = message

    const nations = await NationSchema.find({ guildId } , {
      userId : true , nationExtention :  true , name : true , _id : false
    }).limit(10)

    if(!nations)
      return message.reply({ embeds : [ notNationsFound(message) ] })

    const embed = commonEmbed(message)
      .setDescription(`${message.author}, éstas son las naciones que están a tu alrededor y puedes aliarte o declarar la guerra. 😎
      
      Si estás solo, aprovecha lo antes posible para poder expandirte. 🤩`)

    const nationsAround : EmbedFieldData[] = nations.map(nation => {      
      return {
        name : `**( <a:Bling:967855659477524560> )** ${nation.name}`,
        value : `**Líder** : <@!${nation.userId}> || **Extención :** \`${nation.nationExtention} Km^2\``
      }
    })

    embed.setFields(nationsAround)

    return message.reply({ embeds : [ embed ] })
  },
  cooldown : 10,
  
} as ICallback