import { Message } from "discord.js";
import GuildSchema from "../../schemas/GuildSchema";
import { ICallback } from "utils/Command";
import { commonEmbed , serverNotFoundEmbed } from "../../utils/embeds";

export default {
  callback : async(message : Message ,  ...args : string[]) =>
  {
    const msg = args.join(" ")

    if(!msg)
      return message.reply("`z!confession [ Confesión ]`") 
  
    const embed = commonEmbed(message).setAuthor({
      name : `Secretico en ${message.guild?.name}`,
      iconURL : message.guild?.iconURL({ dynamic :  true }) || ""
    }).setDescription(`> *${msg}* **( 👀 )**`)

    const { guildId } = message

    const server = await GuildSchema.findOne({ guildId } , {
      'channels.confession' : true , _id : false
    })

    if(!server?.channels.confession)
      return message.reply("No hemos encontrado un canal de confesiones, para colocar uno, usa el comando `z!set-confession [ Canal]`").then(() => message.delete())

    const channel = message.guild?.channels.cache.find(cfsChannel => cfsChannel.id === server.channels.confession)
    
    if(!channel?.isText())
      return
    
    return channel.send({ embeds : [ embed ] }).then((msg) => {
      message.delete()
      msg.react("🙀")
    })
  },
  help : `Después de establecer un canal para confesarte, podrás enviar un mensaje anónimo contando tus más profundos secretos. 🙀`
} as ICallback