import commandHandler from "./core/commandHandler";
import { Intents , Client } from "discord.js";
import { config } from "dotenv"
import connectDB from "./core/connectDB";

// Config the bot 

config()

const bot = new Client({
  intents :
  [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
})


bot.on("ready" , async() => 
{
  console.log(`The bot is ready! ${bot.user?.tag}`)
  await connectDB()
  console.log("------- Commmands ----------");
  
  commandHandler(bot , __dirname)
})


bot.login(process.env.BOT_TOKEN)