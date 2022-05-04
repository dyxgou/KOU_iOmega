import { EmbedFieldData, Message } from "discord.js"
import { helpCategories } from "./embeds"
import { commandsHelp }  from "../core/commandHandler"
import getFiles from "../core/getFiles"

type CategoryIntro = keyof typeof CATEGORY_INTRO
const suffix = __filename.substring(__filename.length - 3)
const CATEGORY_INTRO = 
{
  "economy" : (msg : Message) => `¡Bienvenido ${msg.author}, este es el sistema de **Economía**! \n A continuación te mostramos los diferentes comandos 🤑 : `,
  "funny" : (msg : Message) => `¡Bienvenido ${msg.author}, este es el sistema de **Reacción**! \n A continuación te mostramos los diferentes comandos 😍 : `,
  "moderation" : (msg : Message) => `¡Bienvenido ${msg.author}, este es el sistema de **Moderación**! \n A continuación te mostramos los diferentes comandos 😎 : `,
  "nations" : (msg : Message) => `Bienvenido ${msg.author}, este es el sistema de **Naciones**! \n A continuación te mostramos los diferentes comandos.`
}

const EMOJIS = { economy : "💵" , funny : "😊" , moderation : "👮‍♀️" , nations :  "🗺️" }

const getCmdCategory = (msg : Message , argument : string) => 
{
  const categoryIntro = CATEGORY_INTRO[ argument as CategoryIntro ]
  const embed = helpCategories()
  const commandHelp = commandsHelp.get(argument)
  
  if(categoryIntro === undefined && !commandHelp)
    return embed.setDescription("La categoría o comando que acabas de mencionar no existe. 😭")
  
  const emoji = EMOJIS[ argument as CategoryIntro ]

  if(!commandHelp && categoryIntro)
  {
    const commandsDir = __dirname.replace("\\utils" , "").concat(`\\commands\\${argument}`)
    const commandsCategory = getFiles(commandsDir , suffix).map(command => {
      const commandNameIndex = command.lastIndexOf("\\") + 1
      const commandName = command.substring(commandNameIndex).replace(suffix , "")

      return `**( ${emoji} )** \`z!${commandName}\` `
    }).join("\n")
    
    embed.setDescription(`${categoryIntro(msg)}
    
    ${commandsCategory}`)
      .setFooter({ text : "Para averiguar una descripción de cada comando, puedes usar z!help [Nombre del comando]" })
  
    return embed
  }

  embed.setDescription(`**( <a:Diamond2:969254860639834132> )** \`z!${argument}\`
  
  ${commandHelp}`)

  return embed
}

export default getCmdCategory 