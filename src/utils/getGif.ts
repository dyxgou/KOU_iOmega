import * as GIFS from "./gifs.json"
import { randomInt } from "mathjs"

type GifGroup = keyof typeof GIFS

const getGif = (category : string) => 
{
  const gifs = GIFS[ category as GifGroup ]
  const randomIndex = randomInt(0 , gifs.length)
  const gif = gifs[ randomIndex ]

  return gif
}


export default getGif