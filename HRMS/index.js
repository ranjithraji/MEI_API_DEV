import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import user from "./routers/userRouter.js"
import menu from "./routers/menuRouter.js"
import dotenv from "dotenv"
    
dotenv.config()
const app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.PORT || 2023

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1/hrms')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));
  
app.use("/api/user",user)
app.use("/api/role",role)
app.use("/api/menu",menu)

app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.listen(port,()=>{
    console.log("Server connected to "+ port);
})