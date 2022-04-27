import * as fs from "fs"

const getFiles = (dir : string , suffix : string) : string[] =>
{
  const filesDir : fs.Dirent[] = fs.readdirSync(dir , {
    withFileTypes : true
  })

  let commandsDir : string[] = []

  for (const file of filesDir) 
  {
    if(file.isDirectory())
    {
      commandsDir = [
        ...commandsDir,
        ...getFiles(`${dir}\\${file.name}` , suffix)
      ]
    }


    if(file.name.endsWith(".d.ts"))
    {
      continue
    }
    else if(file.name.endsWith(suffix))
    {
      commandsDir.push(`${dir}\\${file.name}`)
    }
  }

  return commandsDir
}

export default getFiles