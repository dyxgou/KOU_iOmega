import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { notAdministratorEmbed } from "../../utils/embeds";
const ms = require("ms")

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    const mentionated = message.mentions.members?.first() 
    args.shift()
    const time = args.shift()
    const reason = args.join(" ") || "No especificada"

    if(!mentionated)
      return message.reply("`z!ban [usuario] [tiempo] [razón]`")
    
    if(!message.member?.permissions.has("BAN_MEMBERS"))
      return message.reply({ embeds : [ notAdministratorEmbed(message) ] })
    
    if(!mentionated.bannable)
    {
      return message.reply(`${mentionated} tiene más permisos que yo. 😭`)
    }
    else
    {
      if(!ms(time))
      {
        mentionated.ban({ reason })

        return message.reply(`El usuario ${mentionated} ha sido baneado correctamente.
        **RAZÓN** : ${reason}`)
      }
      else
      {
        try {
          mentionated.ban({ reason }).then((user) => 
          {
            setTimeout(() => {
              message.guild?.members.unban(user ,  `Se ha termiado el plazo de ${time}`)
            } , ms(time))
          })   
          
          return message.reply(`El usuario ${mentionated} ha sido baneado correctamente.
          **RAZÓN** : ${reason}
          ${time && `**TIEMPO** : ${time}`}`)
        } catch (error) {
          console.error({ error });
          
          return message.reply(`Ha ocurrido un error al intentar banear a este usuario`)
        }
      }
    }
  },
  help : `Podrás banear a alguien que haya incumplido con los reglamentos básicos de tu servidor. 😡`
} as ICallback  