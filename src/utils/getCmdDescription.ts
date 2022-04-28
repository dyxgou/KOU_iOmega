import { Message } from "discord.js"
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
}

const EMOJIS = { economy : "💵" , funny : "😊" , moderation : "👮‍♀️" }

const getCmdDescription = (msg : Message , category : string) => 
{
  const categoryIntro = CATEGORY_INTRO[ category as CategoryIntro ]

  const embed = helpCategories()

  if(!categoryIntro)
    return embed.setDescription("La categoría que acabas de mencionar no existe. 😭")
  
  const commandsDir = __dirname.replace("\\utils" , "").concat(`\\commands\\${category}`)
  const commandsCategory = getFiles(commandsDir , suffix)
  const commandsNames = commandsCategory.map(file => {
    const fileNameIndex = file.lastIndexOf("\\") + 1
    const fileName = file.substring(fileNameIndex).replace(suffix , "")

    return `** ( ${EMOJIS[ category as CategoryIntro ]} )** \`z!${fileName}\``
  }).join("\n")

  embed.setDescription(`**( <a:Diamond2:969254860639834132> ) ${category.toUpperCase()}**
  ${categoryIntro(msg)}
  
  ${commandsNames}
  `)

  return embed
}

export default getCmdDescription