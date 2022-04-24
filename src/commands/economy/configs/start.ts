import { Message, MessageEmbed } from "discord.js";
import UserSchema from "../../../schemas/UserSchema";
import { ICallback } from "../../../utils/Command";
import { getUserInfo } from "../../../utils/getInformation";

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    const userInfo = getUserInfo(message)

    const embed = new MessageEmbed({
      author : {
        name : "ECONOMY - START", iconURL : message.guild?.iconURL() || ""
      },
      color : "RANDOM",
      timestamp : Date.now()
    })

    const user = await UserSchema.findOne(userInfo)

    if(user)
    {
      return message.reply(`Ya tienes un usuario creado en este servidor. 😳`)
    }

    try {
      await UserSchema.create(userInfo)

      embed.setDescription(`**( <a:Ok1:967855659653685298> )** Has sido registrado correctamente en este servidor. 🤑
      Por cortesia de la casa, te hemos regalado **\`$1000\` KOINS**. <:tabn:910548967291514920>`)
    } catch (error) {
      console.error({ error });
      
      embed.setDescription(`Ha ocurrido un error al registrarte.`)
    }

    return message.reply({ embeds : [ embed ] })
  },
  cooldown : 60 
} as ICallback