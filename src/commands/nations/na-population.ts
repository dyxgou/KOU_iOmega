import { Message } from 'discord.js';
import NationSchema from '../../schemas/NationSchema';
import { ICallback } from 'utils/Command';
import { commonEmbed, notNationsFound } from '../../utils/embeds';
import { getUserInfo } from '../../utils/getInformation';

export default {
  callback : async(message : Message , ...args: string[]) => 
  {
    const userInfo = getUserInfo(message)

    const nation = await NationSchema.findOne(userInfo,  {
      nationExtention :  true , guildId : true
    }).populate("guildId" , {
      populationIncrement  : true
    })

    if(!nation)
      return message.reply({ embeds : [ notNationsFound(message) ] })

    

  }
} as ICallback