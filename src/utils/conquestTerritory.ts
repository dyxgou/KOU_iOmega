import { randomInt } from "mathjs"
import { button, buttonsRow } from "./buttons"

const buttons = [
  button({ style : "PRIMARY" , id : "NORT" , emoji : "⬆️", label : "Norte" }),
  button({ style : "PRIMARY" , id : "EAST" , emoji : "➡️", label : "Este" }),
  button({ style : "PRIMARY" , id : "WEST" , emoji : "⬅️", label : "Oeste" }),
  button({ style : "PRIMARY" , id : "SOUTH" , emoji : "⬇️", label : "Sur" }),
]

interface FinalStats 
{
  cash ?: number,
  "nation.nationExtention" ?: number
}

export const directionRow = buttonsRow(buttons)

const conquestTerritory = (amountInvested : number) => 
{
  const isFoundTerritory = randomInt(0 , 100) % 2 === 0

  if(!isFoundTerritory)
    return 0
  
  const territoryFound = Math.floor(amountInvested / 1000)
  
  return territoryFound
}

export default conquestTerritory