import { Schema , Document , model } from "mongoose"
import { INation } from "./NationSchema"

export interface IUser extends Document
{
  userId : string,
  guildId : string,
  cash : number, 
  bank : number,
  nation : Schema.Types.ObjectId & INation
}


const UserSchema = new Schema<IUser>(
  {
    userId : {
      type : String,
      required : true,
    },
    guildId : {
      type : String,
      required : true,
    },
    cash : {
      type : Number ,
      default : 1000
    },
    bank : {
      type : Number,
      default : 0
    },
    nation : {
      type : Schema.Types.ObjectId,
      ref : "nations"
    }
  }
)

export default model("users" , UserSchema)