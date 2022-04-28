import { Message } from "discord.js";
import ms = require("ms");
import checkWinner , { filter, optionsRow } from "../../../utils/checkWinner";
import UserSchema from "../../../schemas/UserSchema";
import { ICallback } from "../../../utils/Command";
import { commonEmbed } from "../../../utils/embeds";
import { getMentionInfo, getUserInfo } from "../../../utils/getInformation";

const ALL_MONEY = "all"

export default {
  callback : async (message : Message,   ...args : string[]) => 
  {
    const userInfo = getUserInfo(message)
    const mentionatedInfo = getMentionInfo(message , ...args)
    const amount = args[1]

    if(!mentionatedInfo.userId || !userInfo.userId || !amount)
      return message.reply("`z!ppr [Contrincante]  [ Apuesta ]`")

    if(userInfo.userId === mentionatedInfo.userId)
      return message.reply("No puedes mencionarte a ti mismo.")
    
    const [ userChallenging , userChallenged ]  = await Promise.all([
      UserSchema.findOne(userInfo , { cash : true , userId : true }),
      UserSchema.findOne(mentionatedInfo , { cash : true , userId : true })
    ])

    if(!userChallenging || !userChallenged)
      return message.reply("Alguno de los dos usuarios no está registrado en nuestra base de datos.")
    
    let bet : number
    
    if(amount === ALL_MONEY)
      bet = userChallenging.cash
    else
      bet = parseInt(amount)
    
    
    if(userChallenging.cash < bet || userChallenged.cash < bet)
      return message.reply("Alguno de los dos usuarios no tiene suficiente dinero. 😢")

    
    const embed = commonEmbed(message)
      .setAuthor({ name : `PIEDRA - PAPEL - TIJERAS` })
      .setDescription(`<@!${mentionatedInfo.userId}> **vs** <@!${userInfo.userId}>
      
      <a:Bling:967855659477524560> ¡Bienvenidos a este reto! <a:Bling:967855659477524560>
      Se está disputando una apuesta de \`$${bet}\`, recuerda que solo tienes un tiempo límite de ** 2 minutos para elegir tu mano **.
      
      ** RECUERDEN ** : Aceptar la apuesta puede dejarlos en ceros o menos. 😟
      `)
    
  
    const collector = await message.reply({
      embeds : [ embed ] , components : [ optionsRow ]
    }).then(msg => msg.createMessageComponentCollector({
      filter : (int => filter(int , userInfo.userId , mentionatedInfo.userId)),
      time :  ms("2m")
    }))


    collector.on("collect" , async(int) => await checkWinner({
      userChallenging,
      userChallenged,
      embed ,
      int,
      bet
    }))
    
  }
} as ICallback  