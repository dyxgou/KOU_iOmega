import { Message } from "discord.js";
import UserSchema from "../../../schemas/UserSchema";
import { ICallback } from "utils/Command";
import { getMentionInfo, getUserInfo } from "../../../utils/getInformation";
import { commonEmbed } from "../../../utils/embeds";
import challengAccepted, { optionsRow } from "../../../utils/challengAccepted";
import ms = require("ms");


export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const mentionatedInfo = getMentionInfo(message)
    const userInfo = getUserInfo(message)
    const bet = args[1]

    const notValidArgs = !userInfo || !mentionatedInfo || !bet || +bet < 1000

    if(notValidArgs)
      return message.reply("`z!paperrocks [Contrincante] [ Apuesta mayor o igual a 1000 ]`")
    
    const [ challenging , challenged ] = await Promise.all([
      UserSchema.findOne(userInfo , {
        cash : true
      }),
      UserSchema.findOne(mentionatedInfo , {
        cash : true
      })
    ])

    if(!challenging || !challenged)
      return message.reply("Alguno de los dos usuarios no está registrado en nuestra base de datos.")

    if(challenging.cash < 1000 || challenged.cash < 1000)
      return message.reply("Alguno de los dos usuarios no tiene el suficiente dinero.")

    const embed = commonEmbed(message)
      .setAuthor({ name : `PIEDRA PAPEL O TIJERAS` })
      .setDescription(`<@!${mentionatedInfo.userId}>, ${message.author} te ha desafiado a un juego de **  PIEDRA, PAPEL O TIJERAS **, con una apuesta de \`$${bet}\`... 
      Tienes ** 2 minutos ** para aceptar, así que piensalo bien... ¡ SUERTE !
      
      \`NOTA\` : **¡ Recuerda no perder el mensaje o demorar más de 2 minutos pensando qué opción elegir !**`)
    

    const collector = message.createMessageComponentCollector({
      time : ms("2m"),
      filter : (interaction => {
        const { id } = interaction.user
        return id === userInfo.userId || id === mentionatedInfo.userId
      }),
    })

    message.reply({ embeds : [ embed ] , components : [ optionsRow ] })
    
    collector.on("end" , (buttonInt) => 
    {
      const interaction = buttonInt.first()
      
      if(!interaction || !interaction.isButton())
        return    

      const option = interaction.customId

      const userId = interaction.user.id
      console.log({ userId });
      
      const challengedId = challenged.userId
      const challengingId = challenging.userId 
    
      const isRejected = userId === challengedId && option === "REJECTED"
    
      const { description } = embed
    
      if(userId === challengingId)
      {
        embed.setDescription(`${description}
    
        ${interaction.user}, deja de responder por los demás. 😡`)
    
        return interaction.reply({
          embeds : [ embed ] , components : [ optionsRow ]
        })
      }
    
      if(isRejected)
      {
        embed.setDescription(`${interaction.user}  ha rechazado el reto. 😭`)    
    
        return interaction.reply({
          embeds : [ embed ]
        })
      }
    
      embed.setDescription(`<@!${challengedId}> ha aceptado el reto. 😈🤙`)
    
      return interaction.reply({
        embeds : [ embed ]
      })
    })


  }
} as ICallback