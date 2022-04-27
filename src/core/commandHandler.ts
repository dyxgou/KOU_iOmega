import { Client, Collection } from "discord.js"
import { runAsyncCommand, runSyncCommand } from "../utils/runCommands"
import { CommandsMap, ICommand } from "../utils/Command"
import getFiles from "./getFiles"

const PREFIX = "z!"
const suffix = __filename.substring(__filename.length - 3)

const commandHandler = (bot : Client , dir : string) => 
{
  const commandsDirs = getFiles(`${dir}\\commands` , suffix)

  const commandsMap : CommandsMap = new Map()
  const cooldowns : Map < string , Map< any , any >> = new Map()

  for (const commandDir of commandsDirs) 
  {
    const commandImport : ICommand = require(commandDir)


    if(!commandImport?.default)
      continue

    const cmdNameIndex = commandDir.lastIndexOf("\\") + 1
    const cmdName = commandDir.substring(cmdNameIndex).replace(suffix , "")

    commandsMap.set(cmdName , commandImport.default)

    console.log(`| ✅ | ${cmdName}`);

    if(commandImport?.default?.cooldown)
    {
      cooldowns.set(cmdName ,new Collection())
    }
  }
  

  bot.on("messageCreate" , async(message) => 
  {
    const args = message.content.substring(PREFIX.length).trim().split(/ +/g)
    const commandPrefix = args.shift()?.toLowerCase()
    console.log({ msg : message.content });

    if(message.author.bot) return
    if(!message.content.startsWith(PREFIX)) return
    if(!commandPrefix) return
    if(!commandsMap.has(commandPrefix)) return
    

    const command = commandsMap.get(commandPrefix)
    const timestamps = cooldowns.get(commandPrefix)
    const currentTime = Date.now()

    if(!command?.cooldown)
    {
      runSyncCommand({ args , command , message })
    }
    else
    {
      const cooldownAmount = command?.cooldown * 1000

      if(timestamps?.has(message.author.id))
      {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount

        if(currentTime < expirationTime)
        {
          const timeLeft = (expirationTime - currentTime) / 1000

          message.reply(`Por favor espera ${timeLeft.toFixed(0)} segundo/s para volver a ejecutar \`z!${commandPrefix}\` otra vez.`)
        }
        else
        {
          runSyncCommand({ args , command , message })
        }
      }
      else
      {
        runAsyncCommand({ args , command , cooldownAmount ,currentTime , message , timestamps })
      }
    }
    

  })
}


export default commandHandler