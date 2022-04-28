import { Message, MessageEmbed } from "discord.js";
import getGif from "./getGif";


export const userNotFoundEmbed = (message : Message) => 
{
  const embed = new MessageEmbed({
    author : {
      name : "ECONOMY", iconURL : message.guild?.iconURL({ dynamic : true }) || ""
    },
    color : "RANDOM",
    timestamp : Date.now(),
    description : `Parece que no estás en la base de datos. o.O
    Para iniciarte en el sistema de Economía, puedes realizar el comando \`z!start\`. <a:Starts:827655358277091369>`
  })

  return embed
}


export const commonEmbed = (message : Message) => 
{
  const embed = new MessageEmbed({
    author : {
      name : message.author.username,
      iconURL : message.guild?.iconURL({ dynamic : true }) || ""
    },
    color :  "RANDOM",
    timestamp : Date.now(),
  })

  return embed
}


export const notAdministratorEmbed = (message : Message) => 
{
  const embed = commonEmbed(message)

  embed.setAuthor({ name : "ERROR" })
  embed.setDescription(`No tienes los permisos de administrador requeridos para ejecutar este comando. <:khe:967976665940635738>`)

  return embed
}


export const serverNotFoundEmbed = (message : Message) => 
{
  const embed = new MessageEmbed({
    author : {
      name : "SERVER NOT FOUND", iconURL : message.guild?.iconURL({ dynamic : true }) || ""
    },
    color : "RANDOM",
    timestamp : Date.now(),
    description : `El servidor no está registrado en la base de datos. D:
    Para registrarlo en el sistema de Economía, puedes realizar el comando \`z!start-server\`, recuerda que debes tener permisos de administrador.  <a:Starts:827655358277091369>`
  })

  return embed
}



export const gifEmbed = (category : string) => 
{
  const gif = getGif(category)

  const embed = new MessageEmbed({
    color :"RANDOM"  ,
    image : {
      url : gif
    }
  })

  return embed
}

export const helpCategories = () => 
{
  const embed = new MessageEmbed({
    author : { name : "Comandos de KOU_zOmega 😳" , iconURL : "https://cdn.discordapp.com/avatars/904777859397206056/205c4da64fb3a7c03004bc8ea8024ad3.webp?size=1024" },
    color : "RANDOM",
    description : `**( <a:Ok1:967855659653685298> )** Actualmente, KOU_zOmega cuenta con 3 categorías de comandos, en las cuales se adjuntan \`44 comandos\`. Los cuales te presento a continuación : 
    
    **( <a:Bum:969254862388858950> )** Comandos de una categoría : \`z!help [Categoría]\`
    **( <a:Pin:969254861608722433> )** Comando especifico : \`z!help [ Comando ]\`
    **( <a:Diamond:969252719577669652> )** Historia del bot : \`z!history\`
    
    ** CATEGORÍAS **
    
    Economía : \`z!help economy\`
    Reacciónes : \`z!help funny\`
    Moderación : \`z!help moderation\``
  })

  return embed
}