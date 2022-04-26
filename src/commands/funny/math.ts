import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import * as mathJS from "mathjs"
import { commonEmbed } from "../../utils/embeds";

export default {
  callback : (message : Message ,  ...args :string[]) =>
  {
    const operation = args.join(" ")
    const embed = commonEmbed(message)
      .setAuthor({ name : "MATH" , iconURL : message.guild?.iconURL({ dynamic :  true })  || "" })
      .setFooter({ text : "PROVIDED BY MATHJS" })

    if(!operation)
    {
      embed.setDescription(`Bienvenid@ al sistema de Matemáticas de KOU.
      
      Para usarlo, puedes usar el comando \`z!math [Operación]\`, con la cual puedes hacer operaciones algebraícas y trigonometricas.`)

      return message.reply({ embeds : [ embed ] })
    }

    try {
      const result = mathJS.evaluate(operation)

      embed.setDescription(`> **OPERACIÓN** : \`${operation}\`
      > **RESULTADO** : \`${result}\``)
    } catch (error) {
      try {
        const result = mathJS.simplify(operation)

        embed.setDescription(`> **OPERACIÓN** : \`${operation}\`
        > **RESULTADO** : \`${result}\``)
      } catch (error) {
        embed.setDescription(`Ha ocurrido un error al operar.`)
      }
    }

    return message.reply({ embeds : [ embed ] })    

  }
} as ICallback