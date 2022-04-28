import { Message } from "discord.js";
import GuildSchema from "../../../schemas/GuildSchema";
import { ICallback } from "utils/Command";
import { commonEmbed, notAdministratorEmbed, serverNotFoundEmbed } from "../../../utils/embeds";

const WORKS = [ "work" , "crime" , "fight" ]
const RANGES = [ "min" , "max" ]


export default {
  callback : async(message : Message , ...args : string[]) =>
  {
    const workToChange = args[0]
    let range : "minAmount" | "maxAmount"
    const newAmount = args[1]
    const amountRange = args[2]
    const { guildId } = message

    const isInvalidArgs = !workToChange || !newAmount || !amountRange || +newAmount <= 0

    if(isInvalidArgs)
      return message.reply("<a:x2:852705604010770472> `z!set-money [work | crime | fight] {nueva_cantidad} (min || max)`")

    if(!message.member?.permissions.has("ADMINISTRATOR"))    
      return message.reply({ embeds : [ notAdministratorEmbed(message) ] })

    if(!WORKS.some((work) => work === workToChange))
    {
      return message.reply("El trabajo que especificaste no está definido.")
    }

    amountRange === "min" ? range = "minAmount" : range = "maxAmount"

    if(!RANGES.some((range) => range === amountRange))
      return message.reply(`${amountRange} no está especificado en nuestra lista de trabajos.`)
    
    const server = await GuildSchema.findOne({ guildId })

    if(!server)
      return message.reply({ embeds : [ serverNotFoundEmbed(message) ] })

    const embed = commonEmbed(message).setAuthor({ name : "ECONOMY - VALUES" })

    const amountPayload = {}

    Object.defineProperty(amountPayload , `${range}.${workToChange}` , {
      value : parseInt(newAmount),
      configurable : true,
      enumerable :  true,
      writable :  true
    })
    
    const amount = amountRange === "min" ? "mínima" : "máxima"

    try {
      await server.updateOne({
        $set : amountPayload
      })

      embed.setDescription(`La ganancia **${amount}** de \`${workToChange}\` ahora es : \`$${newAmount}\`. 🤩`)

    } catch (error) {
      console.error({ error });
      
      embed.setDescription(`Ha ocurrido un error al intentar actualizar las ganancias de ${workToChange}.`)
    }

    return message.reply({ embeds : [ embed ] })
  },
  cooldown : 30 ,
  help : `Podrás establecer los valores mínimos y máximos que puedes ganar con una de las apuestas básica, como Work, Crime, Fight. 💶`
} as ICallback