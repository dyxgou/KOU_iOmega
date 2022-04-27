import { CacheType, Message, MessageButton, MessageComponentInteraction, MessageEmbed } from "discord.js"
import { button, buttonsRow } from "./buttons"

const handsButtons : MessageButton[] = 
[
  button({ style : "PRIMARY" , emoji : "🪨" , label : "Piedra" , id : "STONE" }),
  button({ style : "PRIMARY" , emoji : "📃" , label : "Papel" , id : "PAPER" }),
  button({ style : "PRIMARY" , emoji : "✂️" , label : "Tijera" , id : "CUTTER" }),
]

const row = buttonsRow(handsButtons)

type Hand = {
  [key : string] : string
}


export interface InteractionOptions
{
  embed : MessageEmbed,
  option : string,
  interaction : MessageComponentInteraction<CacheType>,
  challengingId : string,
  challengedId : string
}

const HANDS : Hand = 
{
  "STONE" : "CUTTER",
  "PAPER" : "STONE",
  "CUTTER" : "PAPER"
}

interface IUsers
{
  challenging : {
    hand ?:  string,
    handWinner ?: string
  },
  challenged : {
    hand ?: string,
    handWinner ?: string
  }
}

const usersHands : IUsers = 
{
  challenging : {},
  challenged : {}
}


const CHALLENG_REJECTED = "REJECTED"

const checkWinner = ({ embed , interaction , challengingId , challengedId , option } : InteractionOptions) => 
{
  
}


export default checkWinner