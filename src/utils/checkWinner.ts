import { CacheType , MessageComponentInteraction, MessageEmbed } from "discord.js";
import { button, buttonsRow } from "./buttons";
import { IUser } from "../schemas/UserSchema"

const HANDS_WINNERS = 
{
  "STONE" : "SCISSORS",
  "PAPER" : "STONE",
  "SCISSORS" : "PAPER"
}

type User = IUser & {
  _id: any;
}

type Options = keyof typeof HANDS_WINNERS

interface Users 
{
  challenging ?: string
  challenged ?: string
}

const handsButtons = 
[
  button({ style : "PRIMARY" , emoji : "🪨" , label : "Piedra" , id : "STONE" }),
  button({ style : "PRIMARY" , emoji : "📃" , label : "Papel" , id : "PAPER" }),
  button({ style : "PRIMARY" , emoji : "✂️" , label : "Tijera" , id : "SCISSORS" }),
]

export const optionsRow = buttonsRow(handsButtons)

type Interaction = MessageComponentInteraction<CacheType>
interface CheckerOptions
{
  int : MessageComponentInteraction<CacheType>,
  embed : MessageEmbed,
  userChallenging : User,
  userChallenged : User,
  bet : number | string
}

let users : Users = {}

const checkWinner = async({ userChallenged , userChallenging , embed , int , bet } : CheckerOptions) => 
{ 
  const intUserId = int.user.id
  const handOption = int.customId
  
  if(intUserId === userChallenging.userId)
  {
    users.challenging = handOption
    int.channel?.send(`<@!${userChallenging.userId}> ya ha elegido. 🤩`)
  }
  else
  {
    users.challenged = handOption    
    int.channel?.send(`<@!${userChallenged.userId}> ya ha elegido. 🤩`) 
  }

  const { challenged , challenging } =  users

  if(challenged && challenging)
  {
    

    try {
      if(challenged === challenging)
      {
        embed.setDescription(`Ha sido empate. 🤑`)
      }
      else if(HANDS_WINNERS[ challenging as Options ] === challenged)
      {
        embed.setDescription(`<@!${userChallenging.userId}> ha ganado. 🥳
        Y con ésta vicotoria, también gana \`$${bet}\`. 🤑🤙`)
        await userChallenging.updateOne({ $inc : { cash : bet } })
        await userChallenged.updateOne({ $inc : { cash : -bet } })
      }
      else
      {
        embed.setDescription(`<@!${userChallenged.userId}> ha ganado. 🥳
        Y con ésta victoria, también gana \`$${bet}\`. 🤑🤙`)
        await userChallenging.updateOne({ $inc : { cash : -bet } })
        await userChallenged.updateOne({ $inc : { cash : bet } })
      }
    } catch (err) {
      console.error({ err })

      embed.setDescription(`Ha llegado un Uracán y hizo que ustedes no pudieran terminar la partida. 😫`)
    }
    
    users = {}
    return int.reply({ embeds : [ embed ] })
  }
}


export const filter = (int : Interaction , challengingId : string | undefined , challengedId : string | undefined) => 
{
  if(!challengedId || !challengingId)
    return false 
  
  const userId =  int.user.id
  
  const isCorrectUser = userId === challengedId || userId === challengingId
  
  return isCorrectUser
}


export default checkWinner