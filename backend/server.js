import dotenv from 'dotenv'

import cors from 'cors'

import express from 'express'
import connectDB from './config/db.js'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'


const app = express()

app.use(express.json())

app.use(cors())

dotenv.config()


connectDB()

app.use('/api/products' , productRoute)


app.use('/api/users' ,userRoute)

app.use((req,res) => {
    res.json({messgae:"route not found"})
})


app.listen(process.env.PORT || 5000, () => {

    console.log(`App  is running on ${process.env.PORT} Port`);
     
})