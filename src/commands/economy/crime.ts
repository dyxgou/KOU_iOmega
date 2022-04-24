import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { commonEmbed, userNotFoundEmbed } from "../../utils/embeds";
import { getUserInfo } from "../../utils/getInformation";
import UserSchema from "../../schemas/UserSchema";
import GuildSchema from "../../schemas/GuildSchema";
import randomAmount , { crimeResult } from "../../utils/randomAmount";


export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const userInfo = getUserInfo(message)

    const [ user , server] =  await Promise.all([
      UserSchema.findOne(userInfo),
      GuildSchema.findOne({ guildId : userInfo.guildId } , {
        'minAmount.crime' : true , 'maxAmount.crime' : true , _id :false
      })
    ])

    if(!user)
      return message.reply({ embeds : [ userNotFoundEmbed(message) ] })

    const amount = randomAmount({ min : server?.minAmount.crime , max : server?.maxAmount.crime , work : "crime" })

    const embed = commonEmbed(message)

    try {
      await user?.updateOne({
        $inc : {
          cash : amount
        }
      })

      embed.setDescription(crimeResult(amount || 0))
    } catch (error) {
      console.error({ error })

      embed.setDescription(`Ha ocurrido un error cuando planeabas el crimen.`)
    }
    
    return message.reply({ embeds : [ embed ] })
  },
  cooldown : 15
} as ICallback