import { Message } from 'discord.js';
import NationSchema from '../../schemas/NationSchema';
import { ICallback } from 'utils/Command';
import { notNationsFound } from '../../utils/embeds';
import { getUserInfo } from '../../utils/getInformation';

const MIN_POPULATION_TAXES = 1000

export default {
  callback : async(message : Message , ...args: string[]) => 
  {
    const userInfo = getUserInfo(message)

    const nation = await NationSchema.findOne(userInfo , {
      nationPopulation : true , nationTaxes : true , nationPIB : true , 
    })

    if(!nation)
      return message.reply({ embeds : [ notNationsFound(message) ] })

    if(nation.nationPopulation < MIN_POPULATION_TAXES)
      return message.reply(`Tienes que tener una población mayor a \`${MIN_POPULATION_TAXES} Personas\` para poder iniciar a cobrar impuestos. 🤑`)
    
    
  }
} as ICallback