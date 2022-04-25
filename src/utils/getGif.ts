import axios from "axios"

const getGif = async(category : string) => 
{
  const data = await axios.get(`https://api.satou-chan.xyz/api/endpoint/${category}`)
  
  if(data.status !== 200)
    return

  return data.data?.url
}


export default getGif