import { Message } from "discord.js";
import GuildSchema from "../../../schemas/GuildSchema";
import { ICallback } from "utils/Command";
import { notAdministratorEmbed , serverNotFoundEmbed , commonEmbed } from "../../../utils/embeds";

export default  {
  callback : async(message : Message , ...args : string[]) => 
  {
    const channel = message.mentions.channels?.first()
    const { guildId } = message

    if(!channel || !channel.isText())
      return message.reply("`z!set-confession [canal]`")
    
    if(!message.member?.permissions.has("MANAGE_CHANNELS"))
      return message.reply({ embeds : [ notAdministratorEmbed(message) ] })
    
    const server = await GuildSchema.findOne({ guildId })

    if(!server)
      return message.reply({ embeds : [ serverNotFoundEmbed(message) ] })
  
    const embed = commonEmbed(message)

    try {
      await server?.updateOne({
        $set : {
          'channels.confession' : channel.id
        }
      })

      embed.setDescription(`${channel} ahora es el canal de confesiones. 😋`)
    } catch (error) {
      console.error({ error });
      
      embed.setDescription(`Ha habido un error al actulizar el canal.`)
    }

    return message.reply({ embeds : [ embed ] })
  },
  cooldown : 60
} as ICallback