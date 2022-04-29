import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { commonEmbed, notAdministratorEmbed } from "../../../utils/embeds";
import GuildSchema from "../../../schemas/GuildSchema";


export default {
  callback : async(message : Message ,  ...args : string[]) => 
  {
    const { guildId }  = message

    if(!guildId)
      return

    if(!message.member?.permissions.has("ADMINISTRATOR"))
      return message.reply({ embeds : [ notAdministratorEmbed(message) ] })
    
    const server = await GuildSchema.findOne({ guildId })

    if(server)
      return message.reply("El servidor ya está registrado.")
    
    const embed = commonEmbed(message)
    
    try {
      await GuildSchema.create({ guildId })      
      
      embed.setDescription(`**( <a:Ok1:967855659653685298> )** El servido ha sido registrado con éxito. 😋`)
    } catch (error) {
      console.error({ error })

      embed.setDescription(`Ha ocurrido un error al intentar registrar el servidor.`)
    }

    return message.reply({ embeds : [ embed ] })
  },
  cooldown : 120,
  help : `Con este comando puedes registrar tu servidor en la base de datos, para poder editar sus valores por defec`
} as ICallback