import { Message } from 'discord.js';
import NationSchema from '../../schemas/NationSchema';
import { ICallback } from 'utils/Command';
import { commonEmbed, notNationsFound } from '../../utils/embeds';
import { getUserInfo } from '../../utils/getInformation';
import randomPopulationIncrement , { NOT_ENOUGHT_EXTENTION , NOT_ENOUGHT_FOOD } from '../../utils/populationIncrement';

export default {
  callback : async(message : Message , ...args: string[]) => 
  {
    const userInfo = getUserInfo(message)

    const nation =  await NationSchema.findOne(userInfo , { nationPopulation : true , nationExtention : true })

    if(!nation)
      return message.reply({ embeds : [ notNationsFound(message) ] })

    const newPopulation = randomPopulationIncrement({ nation })
    const embed = commonEmbed(message)

    if(newPopulation === NOT_ENOUGHT_EXTENTION)
      return message.reply(`En tu territorio actual de \`${nation.nationExtention}Km^2\` ya no caben tantas personas, inicia a crear expediciones para encontrar más territorio. <:what:967630589509386300>`)
    
    if(newPopulation === NOT_ENOUGHT_FOOD)
      return message.reply(`No hay suficiente comida para todas las \`${nation.nationPopulation} personas\` de tu nación, inicia a sembrar con \`z!na-recolect [Dinero]\`. 😋`)

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