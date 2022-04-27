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