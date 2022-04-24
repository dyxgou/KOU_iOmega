import { Message } from "discord.js";
import UserSchema from "../../schemas/UserSchema";
import { ICallback } from "utils/Command";
import { getUserInfo } from "../../utils/getInformation";
import GuildSchema from "../../schemas/GuildSchema";
import { commonEmbed , userNotFoundEmbed } from "../../utils/embeds";
import randomAmount from "../../utils/randomAmount";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const userInfo = getUserInfo(message)

    if(!userInfo)
      return
    
    const [ user , server ] = await Promise.all([
      UserSchema.findOne(userInfo , { cash : true }),
      GuildSchema.findOne({ guildId : userInfo.guildId } , 
        { 'minAmount.work' : true , 'maxAmount.work' : true , _id : false }
      )
    ])

    if(!user)
      return message.reply({ embeds : [ userNotFoundEmbed(message) ] })

    const amount = randomAmount({ min : server?.minAmount.work , max : server?.maxAmount.work , work : "work"})

    const embed = commonEmbed(message)

    const randomUser =  message.guild?.members.cache.randomKey()

    try {
      await user.updateOne({
        $inc : {
          cash : amount
        }
      })

      embed.setDescription(`Le has ganado un pvp a <@!${randomUser}> y de las apuestas has ganado \`$${amount}\`. 🤑🤙`)
    } catch (error) {
      console.error({ error })

      embed.setDescription(`Ha ocurrido un error cuando trabajabas. 😢`)
    }

    return message.reply({ embeds : [ embed ] })
  },
  cooldown : 25
} as ICallback