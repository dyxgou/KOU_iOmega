import { MessageActionRow, MessageButton, MessageButtonOptions } from "discord.js"

export const buttonsRow = (buttons : MessageButton[]) => 
{
  const row = new MessageActionRow({
    components : buttons
  })

  return row
}

interface IButtonOptions
{
  id : Capitalize<string>
  style : "DANGER" | "LINK" | "PRIMARY" | "SECONDARY" | "SUCCESS"
  disabled ?: boolean,
  emoji ?: string,
  label ?: string,
}

export const button = ({ style , disabled = false , emoji , label , id , } :  IButtonOptions ) => 
{
  const btn = new MessageButton()
    .setCustomId(id)
    .setEmoji(emoji || "")
    .setLabel(label || "")
    .setDisabled(disabled)
    .setStyle(style)
    

  return btn
}