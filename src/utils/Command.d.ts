import { Message } from "discord.js";

interface ICallback 
{
  callback : (message : Message , ...args : string[]) => {},
  cooldown ?: number,
  help ?: string
}

interface ICommand
{
  default ?: ICallback
}

type CommandsMap = Map< string , ICallback >

interface RunCommand 
{
  message : Message,
  args : string[],
  command : ICallback | undefined
}

interface AsyncCommand 
{
  timestamps : Map< any , any > | undefined , 
  currentTime : number, 
  cooldownAmount : number
}