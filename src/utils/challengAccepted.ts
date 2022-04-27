import { MessageButton } from "discord.js"
import { button, buttonsRow } from "./buttons"
import { InteractionOptions } from "./checkWinner"

const acceptButtons : MessageButton[] = 
[
  button({ style : "PRIMARY" , emoji : "✅" , label : "Aceptar" , id : "ACCEPTED" }),  
  button({ style : "DANGER" , emoji : "❌" , label : "Rechazar" , id : "REJECTED" })
]

export const optionsRow = buttonsRow(acceptButtons)

const CHALLENG_REJECTED = "REJECTED"

const challengAccepted = ({challengingId , challengedId , embed , interaction , option } : InteractionOptions) => 
{
  
}

export default challengAccepted