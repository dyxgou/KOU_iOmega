import { Message } from "discord.js";

export interface IUserInfo
{
  userId : string | undefined,
  guildId : string | null
}

export const getUserInfo = (message : Message) : IUserInfo => 
{
  return {
    userId : message.author.id,
    guildId : message.guildId
  }
}

export const getMentionInfo = (message : Message , ...args: string[]) : IUserInfo => 
{
  const user = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

  return {
    userId : user?.id,
    guildId : message.guildId
  }
}
