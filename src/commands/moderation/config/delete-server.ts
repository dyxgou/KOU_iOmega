import { Message } from "discord.js";
import GuildSchema from "../../../schemas/GuildSchema";
import { button, buttonsRow } from "../../../utils/buttons";
import { ICallback } from "utils/Command";
import { commonEmbed, notAdministratorEmbed } from "../../../utils/embeds";
import ms = require("ms");

const buttons = [
  button({ style : "SUCCESS" , emoji : "✅" , label : "MANTENER" , id : "KEEP" }), 
  button({ style : "DANGER" , emoji : "❌" , label : "ELIMINAR" , id : "DELETE" }),
]

const SERVER_DELETED = "DELETE"

const optionsRow = buttonsRow(buttons)

export default {
  callback : async(message : Message , ...args : string[]) =>
  {
    const { guildId } = message

    if(!message.member?.permissions.has("ADMINISTRATOR"))
      return message.reply({ embeds : [ notAdministratorEmbed(message) ] })

    const server = await GuildSchema.findOne({ guildId })

    if(!server)
      return message.reply("No puedes eliminar este servidor, puesto que este no está registrado en la base de datos.")

    const embed = commonEmbed(message)
      .setDescription(`${message.author} ¿ Estás seguro que quieres eliminar el servidor ?, recuerda que una vez eliminado, **NO SE PUEDRE** rescatar la información previamente eliminada.`)

    const collector = await message.reply({ 
      embeds : [ embed ] , components : [ optionsRow ] 
    }).then(msg => msg.createMessageComponentCollector({
      filter : (int => int.user.id === message.author.id),
      time : ms("30s"),
    }))

    collector.on("end" , async(int) => 
    {
      const interaction = int.first()

      if(!interaction?.isButton())
        return
      
      const option = interaction.customId

      if(option === SERVER_DELETED)
      {
        try {
          await server.deleteOne()
          embed.setDescription(`El servidor ha sido eliminado correctamente de la base de datos.`)
          return interaction.reply({ embeds : [ embed ] })
        } catch (error) {
          embed.setDescription(`Ha ocurrido un error cuando se intentó eliminar el servidor.`)

          return interaction.reply({ embeds : [ embed ] })
        }
      }

      embed.setDescription(`El servidor seguirá vigente. 😍`)

      return interaction.reply({ embeds : [ embed ] })
    })
  },
  cooldown : 60,
  help : `Con este comando, un administrador puede eliminar el servidor de la base de datos, ya realizada ésta opción, no hay paso atrás. Ten cuídado. 😍`
} as ICallback