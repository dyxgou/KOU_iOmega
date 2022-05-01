import { Message } from 'discord.js';
import NationSchema from 'schemas/NationSchema';
import { ICallback } from 'utils/Command';
import { getUserInfo } from 'utils/getInformation';

export default {
  callback : async(message : Message , ...args: string[]) => 
  {
    const userInfo = getUserInfo(message)

    const nation = await NationSchema.findOne(userInfo)    
  }
} as ICallback