import mongoose from "mongoose"
const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
              serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4
        });
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb