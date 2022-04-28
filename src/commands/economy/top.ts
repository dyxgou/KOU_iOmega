import { EmbedFieldData, Message } from "discord.js";
import { ICallback } from "utils/Command";
import { commonEmbed } from "../../utils/embeds";
import UserSchema from "../../schemas/UserSchema";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const { guildId } = message

    const users = await UserSchema.find({ guildId } ,{
      cash: true, bank : true , userId :  true , _id : false
    }).sort({ cash : -1 , bank : -1 }).limit(10)

    if(!users || users.length === 0)
      return message.reply("No hay usuarios registrados en este servidor.")

    const embed = commonEmbed(message)
      .setAuthor({ name : `${message.guild?.name}' top` , iconURL : message.guild?.iconURL({ dynamic :  true }) || "" })
    

    const topFields : EmbedFieldData[] = users.sort((userOne , userTwo) => {
      const totalUserOne = userOne?.cash + userOne?.bank
      const totalUserTwo = userTwo?.cash + userTwo?.bank

      return totalUserTwo - totalUserOne
    }).map((user , index) => {
      const total = (user?.cash + user?.bank).toFixed(0)

      return {
        name : `**( <a:Bling:967855659477524560> )** Top ${index + 1}°`,
        value : `<@!${user?.userId}> = \`$${total}\``,
      }
    })

    embed.setFields(topFields)

    return message.reply({ embeds : [ embed ] })
  },
  help : `Podrás ver el top 10° de gente con más dinero en el servidor. 🤫`
}  as ICallback