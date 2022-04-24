import { Message, MessageButton, MessageActionRow } from "discord.js";
import UserSchema from "../../../schemas/UserSchema";
import { bet } from "../../../utils/bet";
import { ICallback } from "utils/Command";
import { getUserInfo } from "../../../utils/getInformation";
import { commonEmbed, userNotFoundEmbed } from "../../../utils/embeds";

const BUTTONS_IDS = ["RED", "BLACK"]
const ALL_MONEY = "all"

export default {
  callback: async (message: Message, ...args: string[]) => {
    const row = new MessageActionRow({
      components: [
        new MessageButton()
          .setCustomId("RED")
          .setLabel("Red")
          .setStyle("DANGER")
          .setEmoji("🪙"),
        new MessageButton()
          .setCustomId("BLACK")
          .setLabel("Black")
          .setStyle("SECONDARY")
          .setEmoji("🪙")
      ]
    })

    const userInfo = getUserInfo(message)
    const stalkedAmount = args[0]
    const user = await UserSchema.findOne(userInfo, {
      cash: true
    })

    let amount : number

    if (!user)
      return message.reply({ embeds: [userNotFoundEmbed(message)] })
    
    console.log({ stalkedAmount });
    

    if(parseInt(stalkedAmount))  
      amount = parseInt(stalkedAmount)
    else if(stalkedAmount === ALL_MONEY)
      amount = user?.cash
    else
      return message.reply("`z!roulette [Cantidad a apostar | all]`")
    

    const embed = commonEmbed(message)
      .setAuthor(
        { name: `${message.author.username}'s roulette`, iconURL: message.guild?.iconURL({ dynamic: true }) || "" }
      )
      .setDescription("Para jugar a la **Ruleta**, tienes que elegir un color, :coin: `Rojo` o :coin: `Negro`, tienes un **50% de probabilidad** de **ganar el doble de lo que has apostado** o **perderlo todo**. ¡Suerte cámarada!")


    const collector = message.channel.createMessageComponentCollector({
      filter: (interaction) => interaction.user.id === message.author.id,
      max: 1
    })

    message.reply({ embeds: [embed], components: [row] })


    collector.on("end", async (buttonInteraction) => {

      const interaction = buttonInteraction.first()
      const colorID = interaction?.customId

      if (!interaction?.isButton() || !colorID)
        return

      if (!BUTTONS_IDS.some((id) => id === colorID))
        return

      const finalAmount = bet(amount)

      if (finalAmount <= 0)
        embed.setDescription(`¡El :coin: \`${colorID.toLowerCase()}\` no era!
        **Has perdido : \`$${finalAmount * -1}\`**`)
      else
        embed.setDescription(`**¡EN HORA BUENA!**
        Has acertado con :coin: \`${colorID.toLowerCase()}\` y has ganado \`$${finalAmount}\`.`)


      try {
        await user.updateOne({
          $inc: {
            cash: finalAmount
          }
        })
      }
      catch (err) {
        console.error({ err })

        embed.setDescription("Ops... Saliste del casino y un ladrón te robó lo que ganaste.")
      }

      return interaction.reply({ embeds: [embed] })
    })
  },
  cooldown : 30
} as ICallback