import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';   
import cookieParser from 'cookie-parser';  
dotenv.config()
import { UserRouter } from './routes/user.js'; 


const app = express();
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"] ,
    credentials: true
}))
app.use(cookieParser())
app.use('/auth',UserRouter)


mongoose.connect('mongodb+srv://harshkeshari768:DvqdJIggzeHjHDuO@cluster0.zcfar.mongodb.net/')

app.listen(process.env.PORT,() =>{
    console.log("Server is Running")
})