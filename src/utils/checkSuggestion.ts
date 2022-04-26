import { CacheType, User , MessageComponentInteraction, MessageEmbed } from "discord.js";

enum SgsStatus 
{
  "ACCEPTED" = "ACCEPTED",
  "REJECTED" = "REJECTED",
  "PENDING" = "PENDING"
}

type Interaction = MessageComponentInteraction<CacheType> | undefined

interface CheckSgsOptions
{
  suggestionStatus : string,
  interaction : Interaction,
  embed : MessageEmbed,
  suggestion : string,
  author :  User
}

const checkSuggestion = ({ embed , interaction , suggestion , suggestionStatus , author } : CheckSgsOptions) => 
{  

  if(suggestionStatus === SgsStatus.ACCEPTED)
  {
    embed.setDescription(`**( <a:Ok1:967855659653685298> )** ${suggestion} 
    **ESTADO** : \`ACEPTADA\`.
    **By** : <@!${interaction?.user.id}>`)

    return interaction?.reply({
      content : `${author}, tu propuesta ha sido aceptada.`,
      embeds : [ embed ],
    })
  }
  else if(suggestionStatus === SgsStatus.REJECTED)
  {
    embed.setDescription(`**( <a:Ok1:967855659653685298> )** ${suggestion} 
    > **ESTADO** : \`RECHAZADA\`.
    > **By** : <@!${interaction?.user.id}>`)

    return interaction?.reply({
      content : `${author}, tu propuesta ha sido rechazada.`,
      embeds : [ embed ],
    })    
  }
  else if(suggestionStatus === SgsStatus.PENDING)
  {
    embed.setDescription(`**( <a:Ok1:967855659653685298> )** ${suggestion} 

    > **ESTADO** : \`POSPUESTA\`.

    > **By** : <@!${interaction?.user.id}>`)

    interaction?.user.send({
      embeds : [ embed ]
    })

    return interaction?.reply({
      content : `${author}, tu propuesta ha sido pospuesta.`,
      embeds : [ embed ],
    })

  }

  return interaction?.reply(`La sugerencia ha sido eliminada o ha ocurrido un error con ella.`)
}

export default checkSuggestion