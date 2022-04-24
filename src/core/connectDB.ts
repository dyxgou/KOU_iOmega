import * as mongoose from "mongoose"

const connectDB = async() => 
{
  const URI = process.env.MONGO_URI

  if(!URI)
  {
    console.error("| ❌ | We cannot found the MONGO URI ")
    process.exit(1)
  }

  await mongoose.connect(URI)
    .then(() => console.log("| ✅ | Mongoose connected"))
    .catch(console.error)

  process.on("uncaughtException" , (err) => {
    console.error({ err })
    mongoose.disconnect()
  })
  
}

export default connectDB