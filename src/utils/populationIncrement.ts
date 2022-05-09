import { randomInt } from "mathjs"
import { INation } from "schemas/NationSchema"

interface PopulationIncrement 
{ 
  nation : INation
}

const MAX_PEOPLE_IN_KM = 40
const FOOD_PER_PERSON = 3

export const NOT_ENOUGHT_EXTENTION = 0
export const NOT_ENOUGHT_FOOD = -1

const randomPopulationIncrement = ({ nation } : PopulationIncrement) => 
{
  const { nationPopulation , nationExtention , nationFood } = nation

  const maxPopulationIncrement = nationPopulation / 2

  const minPopulationIncrement = nationPopulation / 8

  const populatioIncrement = Math.floor(
    randomInt( minPopulationIncrement , maxPopulationIncrement )
  )

  const currentPopulation = nationPopulation + populatioIncrement
  const maxPeopleInKm = MAX_PEOPLE_IN_KM * nationExtention
  const foodPerPopulation = currentPopulation / FOOD_PER_PERSON

  // If in the nation will be so much people
  if(currentPopulation > maxPeopleInKm)
    return NOT_ENOUGHT_EXTENTION
  
  // If there are not enogth food to everyone
  if(foodPerPopulation > nationFood)
    return NOT_ENOUGHT_FOOD

  return populatioIncrement
}


export default randomPopulationIncrement