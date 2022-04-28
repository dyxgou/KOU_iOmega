import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { commonEmbed, userNotFoundEmbed } from "../../utils/embeds";
import { getUserInfo } from "../../utils/getInformation";
import UserSchema from "../../schemas/UserSchema";
import GuildSchema from "../../schemas/GuildSchema";
import randomAmount , { fightResult } from "../../utils/randomAmount";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const userInfo = getUserInfo(message)

    const [ user , server] =  await Promise.all([
      UserSchema.findOne(userInfo),
      GuildSchema.findOne({ guildId : userInfo.guildId } , {
        'minAmount.fight' : true , 'maxAmount.fight' : true , _id :false
      })
    ])

    if(!user)
      return message.reply({ embeds : [ userNotFoundEmbed(message) ] })

    const amount = randomAmount({ min : server?.minAmount.fight , max : server?.maxAmount.fight , work : "fight" })

    const embed = commonEmbed(message)

    const randomUser = message.guild?.members.cache.randomKey() || "852671849145172009"

    try {
      await user?.updateOne({
        $inc : {
          cash : amount
        }
      })

      embed.setDescription(fightResult(amount || 0 , randomUser))
    } catch (error) {
      console.error({ error })

      embed.setDescription(`Ha ocurrido un error cuando planeabas el crimen.`)
    }
    
    return message.reply({ embeds : [ embed ] })
  }, 
  cooldown : 10,
  help : `Podrás darte en la getta con una persona aleatoría, pero si no fuiste tan fuerte como la roca, te van a robar por webón. 😠`
} as ICallback