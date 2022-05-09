import { Message } from 'discord.js';
import NationSchema from '../../schemas/NationSchema';
import UserSchema from '../../schemas/UserSchema';
import { ICallback } from 'utils/Command';
import { commonEmbed, notNationsFound, userNotFoundEmbed } from '../../utils/embeds';
import { getUserInfo } from '../../utils/getInformation';

const ALL_MONEY = "all"
const FOOD_PRICE = 75

export default {
  callback : async(message : Message , ...args: string[]) => 
  {
    const userInfo = getUserInfo(message)
    const amount = args[0]
    
    const [ nation , user ] = await Promise.all([
      NationSchema.findOne(userInfo , {
        nationFood :  true
      }),
      UserSchema.findOne(userInfo , {
        cash : true , _id : false
      })
    ])

    if(!user)
      return message.reply({ embeds : [ userNotFoundEmbed(message) ] })

    if(!nation)
      return message.reply({ embeds : [ notNationsFound(message) ] })    

      let recolectAmount : number

    if(amount === ALL_MONEY)
      recolectAmount = user?.cash
    else 
      recolectAmount = parseInt(amount)

    if(recolectAmount < 1000)
      return message.reply(`Tienes que invertir una cantidad mayor a $1000`)
    
    const foodRecolected = recolectAmount / FOOD_PRICE
    const embed = commonEmbed(message)    

    try {
      await nation.updateOne({
        $inc : {
          nationFood :  foodRecolected
        }
      })

      embed.setDescription(`Has recolectado \`${foodRecolected}Kg\` de comida con una inversión de \`$${recolectAmount}\`. 😋`)
    } catch (error) {
      console.error({ error });
      
      embed.setDescription(`Ha ocurrido un error cuando sembrabas tu comida. 😭`)
    }

    return message.reply({ embeds : [ embed ] })
  }
} as ICallback