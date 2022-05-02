import { Message } from 'discord.js';
import NationSchema from '../../schemas/NationSchema';
import { ICallback } from 'utils/Command';
import { commonEmbed, notNationsFound, serverNotFoundEmbed } from '../../utils/embeds';
import { getUserInfo } from '../../utils/getInformation';
import randomPopulationIncrement from '../../utils/populationIncrement';
import GuildSchema from '../../schemas/GuildSchema';

export default {
  callback : async(message : Message , ...args: string[]) => 
  {
    const userInfo = getUserInfo(message)

    const [ nation , server ] = await Promise.all([
      NationSchema.findOne(userInfo , { nationPopulation : true , nationExtention : true }),
      GuildSchema.findOne({ guildId : userInfo.guildId } , { populationIncrement  : true ,  _id : false })
    ])

    if(!nation)
      return message.reply({ embeds : [ notNationsFound(message) ] })
    if(!server)
      return message.reply({ embeds : [ serverNotFoundEmbed(message) ] })

    const { populationIncrement } = server

    const newPopulation = randomPopulationIncrement({ populationIncrement , nation })
    const embed = commonEmbed(message)

    try {
      await nation.updateOne({
        $inc : {
          nationPopulation : newPopulation
        }
      })

      embed.setDescription(`Ahora hay \`${newPopulation}\` nuevas personas en tu creciente imperio. 😊`)
    } catch (error) {
      console.error({ error })

      embed.setDescription(`Estaba pasado un dinosaurio que por error se comió a todos tus nuevos habitantes. 😭`)
    }

    return message.reply({ embeds : [ embed ] })
  }
} as ICallback