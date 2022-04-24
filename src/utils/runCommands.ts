import { AsyncCommand, RunCommand } from "./Command";


export const runSyncCommand = ({ args , command  , message } : RunCommand) => 
{
  if(!command) 
    return

  try {
    command.callback(message , ...args)
  } catch (error) {
    console.error({ error })
  }
}


export const runAsyncCommand = (
  { args , command , cooldownAmount , currentTime , message , timestamps } : RunCommand & AsyncCommand
) => {
  if(!command || !timestamps)
    return
  
  try {
    command.callback(message , ...args)
    timestamps.set(message.author.id , currentTime)
    setTimeout(() => timestamps.delete(message.author.id) , cooldownAmount)
  } catch (error) {
    console.error({ error })

    return
  }
}