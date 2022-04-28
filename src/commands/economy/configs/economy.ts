import { Message } from "discord.js";
import { ICallback } from "utils/Command";
import { commonEmbed } from "../../../utils/embeds";

export default {
  callback : (message : Message , ...args : string[]) => 
  {
    const embed = commonEmbed(message)
    
    embed.setAuthor({ name : "ECONOMY - INTRODUCTION" })
    embed.setDescription(`Bienvenido ${message.author} a la introducción del sistema de Economía de KOU. <a:SIIII:852931061096120320>
    
    **( <a:Ok1:967855659653685298> )** Para iniciarte en este sistema, puedes usar \`z!start\`, que te va a registar en este servidor.

    **( <a:Ok1:967855659653685298> )** Puedes ganar dinero con \`[ z!work , z!crime , z!fight , z!roulette , z!rob , z!ppr ]\`, cada comando tiene un riego de perdida como de ganancia más alto, así que ten cuídado cuando vayas a usar alguno de ellos.

    **( <a:Ok1:967855659653685298> )** Si quieres ajustar la cantidad de dinero que puedes ganar con estos comandos, puedes usar **\`z!set-money\`** , pero **¡TEN CUÍDADO!**, entre mayor sea la ganancia, mayor será la perdida, así que estás bajo tu propio riesgo.

    **( <a:Ok1:967855659653685298> )** Antes de hacer cualquier cambio en las ganancias, tienes que registrar tu servidor, para esto, puedes usar \`z!start-server\`, y ya podrás proceder a cambiar todo lo que gustes.`)

    
    return message.reply({ embeds : [ embed ] })
  },
  cooldown : 60,
  help : `Una pequeña introducción al sistema de Economía del KOU_zOmega. 💶`
} as ICallback