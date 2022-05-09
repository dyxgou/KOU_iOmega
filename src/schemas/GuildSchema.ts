import { Schema , Document , model } from "mongoose"
import { Amount ,  MIN_AMOUNT , MAX_AMOUNT } from "../utils/defaultServerVars"
import { INation } from "./NationSchema"

interface IChannel
{
  confession : string,
  suggestion : string,
}

interface IGuild extends Document
{
  guildId : string,
  minAmount : Amount,
  maxAmount : Amount,
  channels : IChannel,
  nations : Schema.Types.ObjectId[] & INation[],
}


const GuildSchema = new Schema<IGuild>(
  {
    guildId : {
      type : String,
      required : true,
      unique :  true
    },
    minAmount : {
      work : {
        type : Number,
        default : MIN_AMOUNT.work
      },
      crime : {
        type : Number,
        default : MIN_AMOUNT.crime,
      },
      fight : {
        type : Number,
        default : MIN_AMOUNT.fight
      }
    },

    maxAmount : {
      work : {
        type : Number,
        default : MAX_AMOUNT.work,
      },
      crime : {
        type : Number,
        default : MAX_AMOUNT.crime
      },
      fight : {
        type : Number, 
        default : MAX_AMOUNT.fight
      }
    },

    channels : {
      confession : {
        type : String,
      },
      suggestion : {
        type : String
      },
    },

    nations : {
      type : Schema.Types.ObjectId,
      ref : "nations"
    },
  }
)


export default model("guilds" , GuildSchema)