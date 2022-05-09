import { Schema , model , Document } from "mongoose"


export interface INation extends Document
{
  userId : string,
  guildId : string,
  name : string,
  nationPIB : number,
  nationDebit : number,
  nationExtention : number,
  nationPopulation : number,
  nationTaxes : number,
  nationFood : number
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
      trim : true
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
    },
    nationPopulation : {
      type : Number,
      default : 1
    },
    nationTaxes : {
      type : Number,
      default : 2,
      min : 0,
      max : 100
    },
    nationFood : {
      type : Number,
      default : 50
    }
  },
  {
    timestamps : true
  }
)

export default model("nations" , NationShema)