import { randomInt } from "mathjs"
import { INation } from "schemas/NationSchema"
import { MIN_POPULATION_INCREMENT } from "./defaultServerVars"

interface PopulationIncrement 
{ 
  populationIncrement ?: number,
  nation : INation
}

const randomPopulationIncrement = ({ populationIncrement = MIN_POPULATION_INCREMENT , nation } : PopulationIncrement) => 
{
  const maxPopulation = nation.nationExtention * populationIncrement
  const popIncrement  = nation.nationPopulation + populationIncrement

  if(popIncrement > maxPopulation)
    return 0
  
  const newPopulation = randomInt(1 , populationIncrement)

  return newPopulation
}


export default randomPopulationIncrement