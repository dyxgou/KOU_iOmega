import { randomInt } from "mathjs"
import { MIN_AMOUNT , MAX_AMOUNT } from "./defaultVariables"

interface RandomAmount
{
  min ?: number | null,
  max ?: number | null,
  work ?: "work" | "crime" | "fight"
}

const randomAmount = ({ min , max , work } : RandomAmount) => 
{
  if(!work)
    return

  const amounts = {
    min : min || MIN_AMOUNT[work],
    max : max || MAX_AMOUNT[work]
  }
  
  let amount = randomInt(amounts.min , amounts.max)
  
  const isRisky = work === "crime" || work === "fight"
  
  if(isRisky)
  {
    const isWonMoney = randomInt(0 , 100) % 2 === 0

    if(!isWonMoney)
      amount = -amount
  }

  return amount
}

export const crimeResult = (amount : number) => 
{
  if(amount <= 0)
    return `Por rater@, la policía te ha atrapado y te ha dado una multa de \`$${amount}\`. 😡`
  else
    return `Te le has escapado a la policia y de paso te has llevado el botín de \`$${amount}\`. 🤑`
}

export const fightResult = (amount : number , randomUser : string) => 
{
  if(amount <= 0)
    return `Por irse de lambón/a, <@!${randomUser}> te partió la getta y de paso te robó \`$${amount}\`. 😡`
  else
    return `Como fuiste más fuerte que la roca, le ganaste el duelo a <@!${randomUser}> y ganaste \`$${amount}\`. 🤑`
}


export default randomAmount