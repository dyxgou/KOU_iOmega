import { Message } from "discord.js";
import UserSchema from "../../../schemas/UserSchema";
import { ICallback } from "utils/Command";
import { getMentionInfo, getUserInfo } from "../../../utils/getInformation";
import { rob } from "../../../utils/bet";
import { commonEmbed } from "../../../utils/embeds";

export default {
  callback : async(message : Message , ...args : string[]) =>
  {
    const userInfo = getUserInfo(message)
    const mentionatedInfo = getMentionInfo(message)

    if(!userInfo || !mentionatedInfo || !args[0])
      return message.reply("<:pepewtf:967630589488418886> `z!rob [Usuario al que le vas a robar]`")

    if(userInfo.userId === mentionatedInfo.userId)
      return message.reply("No puedes mencionarte a ti mismo.")

    const [ userStealing , userToSteal ] = await Promise.all([
      UserSchema.findOne(userInfo),
      UserSchema.findOne(mentionatedInfo)
    ])


    if(!userStealing || !userToSteal)
      return message.reply("Alguno de los dos usuarios no están registrados en la base de datos.")

    const amountStealed = rob(userToSteal?.cash)    

    const embed =  commonEmbed(message)

    try {
      if(amountStealed <= 0)
      {
        await userStealing.updateOne({ $inc : { cash : amountStealed } })

        await userToSteal.updateOne({ $inc : { cash : amountStealed * -1 } })

        embed.setDescription(`Por ratero, la policia te ha atrapado y le has tenido que pagar una indemnización a <@!${mentionatedInfo.userId}> de \`$${amountStealed * -1}\`. 😡`)
      }        
      else
      {
        await userStealing.updateOne({ $inc : { cash : amountStealed } })

        await userToSteal.updateOne({ $inc : { cash : amountStealed * -1 } }) 

        embed.setDescription(`Te has salido con la tuya pequeño travieso y de paso con un botín de \`$${amountStealed}\`. 🤑 `)
      }
    } catch(err) {
      console.error({ err });
      
      embed.setDescription(`Ha llovido por lo que no has podido ir a robar a <@!${mentionatedInfo.userId}>.`)
    }

    return message.reply({ embeds : [ embed ] })    
  },
  help : `Podrás demostrar la rata que eres robandole la mitad del dinero que otra persona tenga en el bolcillo, pero OJO, puedes salir perdiendo. 😈🙏`
} as ICallback