import mongoose from "mongoose"

const DB_NAME = 'fullstack'

const connectDB = async (params) => {
  
     try {

         const conn =   await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

         console.log(`MongoDB connected || Host ${conn.connection.host}`);
         
      
     } catch (error) {
      
      console.error(error)
      process.exit(1)
     }
}


export default connectDB;