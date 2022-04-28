import { Message, MessageButton } from "discord.js";
import { button, buttonsRow } from "../../utils/buttons";
import { ICallback } from "utils/Command";
import { commonEmbed } from "../../utils/embeds";
import GuildSchema from "../../schemas/GuildSchema";
import checkSuggestion from "../../utils/checkSuggestion";


export default {
  callback : async(message : Message , ...args : string[])=>
  {
    const suggestion = args.join(" ")

    const buttons : MessageButton[] = [
      button({
        id : "ACCEPTED", style : "SUCCESS", emoji : "✅", label : "Aceptar sugerencia",
      }),
      button({
        id : "PENDING" , style : "PRIMARY" , emoji : "⏱️" , label : "Posponer sugerencia"
      }),
      button({
        id : "REJECTED" , style : "DANGER" , emoji : "❌" , label : "Rechazar sugerencia"
      }),
    ]

    const row = buttonsRow(buttons)

    if(!suggestion || suggestion.length <= 10)
      return message.reply("`z!suggestion [Sugerencia -> Más de 10 carácteres]`")

    const { guildId }  = message

    const server = await GuildSchema.findOne({ guildId } , {
      'channels.suggestion' : true 
    })

    if(!server?.channels.suggestion) 
      return message.reply("No hemos podido encontrar el canal de sugerencias, para colocar un canal se sugerencias, usa `z!set-suggestion [Canal]. 😋`")

    const channel = message.guild?.channels.cache.find(sgsChannel => sgsChannel.id === server.channels.suggestion)

    
    const embed = commonEmbed(message).setAuthor({
      name : `${message.author.username}'s suggestion`
    }).setDescription(`**( <a:Ok1:967855659653685298> )** ${suggestion} 
    **ESTADO** : \`PENDIENTE\`.`)
    
    
    if(!channel?.isText())
    return message.reply("El canal de sugerencias debe ser un canal de texto.")
    
    const collector = channel.createMessageComponentCollector({
      filter : ((user) => (
        user.memberPermissions.has("MANAGE_GUILD") && user.id !== message.author.id
      )),
      max : 1,
      time : 60 * 60 * 24 * 7,
    })

    channel.send({ embeds : [ embed ] , components : [ row ] })

    collector.on("end" , (buttonInt) => 
    {
      const interaction = buttonInt?.first()
      const suggestionStatus = interaction?.customId
      
      if(!interaction || !interaction.isButton() || !suggestionStatus)
        return
      
      return checkSuggestion({ embed , interaction , suggestion , suggestionStatus , author : message.author })
    })
  },
  cooldown : 60,
  help : `Ya establecido un canal de sugerencias, puedes mandar las sugerencias que tengas hacía tu servidor y esperar una respuesta del Staff. 😎`
} as ICallback