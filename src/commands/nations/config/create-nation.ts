import { Message } from 'discord.js';
import NationSchema from '../../../schemas/NationSchema';
import { ICallback } from 'utils/Command';
import { getUserInfo } from '../../../utils/getInformation';
import GuildSchema from '../../../schemas/GuildSchema';
import UserSchema from '../../../schemas/UserSchema';
import { commonEmbed, serverNotFoundEmbed, userNotFoundEmbed } from '../../../utils/embeds';

const MAX_NAME_LENGTH = 30
const MIN_NAME_LENGTH = 3

export default {
  callback : async(message : Message , ...args: string[]) => 
  {
    const userInfo = getUserInfo(message)
    const nationName = args.join(" ")
    
    if(!nationName || nationName.length < MIN_NAME_LENGTH || nationName.length > MAX_NAME_LENGTH)
      return message.reply("`z!create-nation [Nombre de la nación < 30 Carácteres ]`")
    
    const [ nation , server , user ] = await Promise.all([
      NationSchema.findOne(userInfo),
      GuildSchema.findOne({ guildId : userInfo.guildId }),
      UserSchema.findOne(userInfo)
    ])

    if(nation)
      return message.reply(`Ya has creado ésta nación previamente. 😳`)
    if(!server)
    {
      return message.reply({ 
        content : `${message.author}, registralo lo antes posible con \`z!start-server\`, créeme, vale mucho la pena.`,
        embeds : [ serverNotFoundEmbed(message) ] 
      })
    }
    if(!user)
      return message.reply({ embeds : [ userNotFoundEmbed(message) ] })
    
    const embed = commonEmbed(message)
      .setAuthor({ name : `¡ UNA NUEVA NACIÓN VE HOY UNAS FRONTERAS SIN LÍMITES !` })

    try
    {
      const country = await NationSchema.create({ ...userInfo , name : nationName })
      await user.updateOne({ $set : { nation : country._id } })
      await server.updateOne({ $push : { nations : country._id } })

      embed.setDescription(`**( <a:Bum:969254862388858950> )** ¡ SE HA ALZADO **${country.name.toUpperCase()}** !
      
      Has iniciado con una extención territorial de : \`${country.nationExtention} Km^2\`

      **( <a:Bling:967855659477524560> )** ${message.author}, te esperan grandes retos y conquistas, **¡Esperemos que el poder de <@!852671849145172009> y <@!775179688691105802> te acompañen en tu travesía!** <a:Diamond3:969254861839413268>`)
    }
    catch(err)
    {
      console.error({ err })

      embed.setDescription(`Ha ocurrido un error mientras creabas tu gran nación. 😭`)
    }

    return message.reply({ embeds : [ embed ] })
  },
  cooldown : 240,
  help : `Con este comando puedes iniciar tu imperio, conquistar a otros... Etc, ¡ Mucha Suerte ! 🤩`
} as ICallback