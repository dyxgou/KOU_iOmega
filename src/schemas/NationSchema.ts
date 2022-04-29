import { Schema , model , Document } from "mongoose"


export interface INation extends Document
{
  userId : string,
  guildId : string,
  name : string,
  nationPIB : number,
  nationDebit : number,
  nationExtention : number,
}

const NationShema = new Schema<INation>(
  {
    userId : {
      type : String,
      required : true,
    },
    guildId : {
      type : String,
      required : true,      
    },
    name : {
      type : String,
      required : true,
      unique : true,
      max : 30,
      min : 3,
    },
    nationExtention : {
      type : Number,
      default : 5
    },
    nationDebit : {
      type : Number,
      default : 0
    },
    nationPIB : {
      type : Number,
      default : 10000
    }
  },
  {
    timestamps : true
  }
)

export default model("nations" , NationShema)