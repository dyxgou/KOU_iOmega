import { Message } from 'discord.js';
import ms = require('ms');
import { ICallback } from 'utils/Command';
import { commonEmbed, notUserNation, userNotFoundEmbed } from '../../utils/embeds';
import { getUserInfo } from '../../utils/getInformation';
import UserSchema from '../../schemas/UserSchema';
import conquestTerritory, { directionRow } from '../../utils/conquestTerritory';
import NationSchema from '../../schemas/NationSchema';

const ALL_MONEY = "all"

export default {
  callback : async(message : Message , ...args: string[]) => 
  {
    const userInfo = getUserInfo(message)
    const amount = args[0]
    
    if(!amount)
      return message.reply("`z!na-conquest [ Dinero para la exploración ]`")

    const user = await UserSchema.findOne(userInfo , {
      cash : true
    })

    const nation = await NationSchema.findOne(userInfo , {
      nationExtention : true
    })

    if(!user)
      return message.reply({ embeds : [ userNotFoundEmbed(message) ] })
    if(!nation)
      return message.reply({ embeds : [ notUserNation(message) ] })
    
    let amountInvested : number

    if(amount  === ALL_MONEY)
      amountInvested = user?.cash
    else if(parseInt(amount))
      amountInvested = parseInt(amount)
    
    
    const embed = commonEmbed(message)
      .setDescription(`Estás a punto de **aventurarte** a explorar éste planeta, recuerda elegir la dirección correcta, o vas a perder tu dinero invertido en la expedición.`)

    const collector = await message.reply({
      embeds : [ embed ] , components : [ directionRow ]
    }).then(msg => msg.createMessageComponentCollector({
      filter : (int) => int.user.id === message.author.id,
      time : ms("1m"),
    }))

    collector.on("collect" , async(int) => 
    {
      if(!int.isButton())
        return
      
      const finalTerritory = conquestTerritory(amountInvested)

      if(finalTerritory <= 1)
        embed.setDescription(`En la dirección del ${int.component.label} no había nada, por lo tanto, tu inversión de \`$${amountInvested}\` se ha perdido.`)
      else
        embed.setDescription(`Cuando ibas hacía el ${int.component.label}, encontraste una extención de \`${finalTerritory} Km^2\`.`)

      try {
        await user.updateOne({ $inc : { cash : -amountInvested } })
        await nation?.updateOne({ $inc : { nationExtention : finalTerritory } })
      } catch (error) {
        console.error({ error });
        
        embed.setDescription(`Ha habído una ventisca y no has podido salir a explorar. 😢`)
      }

      return int.reply({ embeds : [ embed ] })
    })  
  },
} as ICallback