import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { notAdministratorEmbed } from "../../utils/embeds";

export default {
  callback : (message : Message,  ...args : string[]) =>
  { 
    const mentionated = message.mentions.members?.first()
    args.shift()
    const reason = args.join(" ")

    if(!mentionated)
      return message.reply("`z!kick [usuario]`")

    if(!message.member?.permissions.has("KICK_MEMBERS"))
      return message.reply({ embeds : [ notAdministratorEmbed(message) ] })
    
    if(!mentionated.kickable)
    {
      return message.reply(`${mentionated} tiene más permisos que yo. 😭`)
    }
    else
    { 
      mentionated.kick(reason)

      return message.reply(`${mentionated}  ha sido kickeado correctamente.
      **RAZÓN** : ${reason}`)
    }
  },
  help : `Podrás explusar a un usuario que haya incumplido las reglas de tu servidor. 😡`
} as ICallback