import { Message } from "discord.js";
import GuildSchema from "../../../schemas/GuildSchema";
import { ICallback } from "utils/Command";
import { serverNotFoundEmbed , notAdministratorEmbed, commonEmbed } from "../../../utils/embeds";

export default{
  callback : async(message : Message , ...args : string[]) =>
  {
    const channel = message.mentions.channels.first()

    if(!channel || !channel.isText())
      return message.reply("`z!set-suggestion [Canal]`")
    
    if(!message.member?.permissions.has("MANAGE_GUILD"))
      return message.reply({ embeds : [ notAdministratorEmbed(message) ] })
    
    const { guildId } = message

    const server = await GuildSchema.findOne({ guildId } , {
      channels :  true
    })

    if(!server)
      return message.reply({ embeds : [ serverNotFoundEmbed(message) ] })
    
    const embed = commonEmbed(message)

    try {
      await server?.updateOne({
        $set : {
          'channels.suggestion' : channel.id
        }
      })

      embed.setDescription(`${channel} ha sido establecido correctamente como canal de sugerencias. 😋`)
    } catch (error) {
      console.error({ error });
      
      embed.setDescription(`Ha ocurrido un error al establecer el canal`)
    }

    return message.reply({ embeds : [ embed ] })
  },
  cooldown : 60,
  help : `Podrás establecer un canal para que la gente de tu servidor haga sugerencias a la tu comunidad y tu u otra persona del Staff las acepte. 😋`
} as ICallback  