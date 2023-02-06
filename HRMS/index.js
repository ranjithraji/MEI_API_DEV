import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import user from "./routers/userRouter.js"
import menu from "./routers/menuRouter.js"
import role from "./routers/roleRouter.js"
import rolemenu from "./routers/roleMenuRouter.js";
import request from "./routers/requestRouter.js";
import dotenv from "dotenv"
import cors from "cors"
    
dotenv.config()

const app= express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.PORT || 2023
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/hrms')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB... '+err.message));
  
app.use("/api/user",user)
app.use("/api/rolemenu",rolemenu)
app.use("/api/role",role)
app.use("/api/menu",menu)
app.use("/api/request",request)

app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.listen(port,()=>{
    console.log("Server connected to "+ port);

})