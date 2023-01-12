import Menu from "../models/menuModel.js"
import * as dotenv from 'dotenv';

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds=10;
dotenv.config();

export const menureg=async (req,res)=>{
    // if (error) return res.status(400).send(error.details[0].message);

    
        bcrypt.hash(req.body.password,saltRounds,async(err,hash)=>{
            let register=new Menu({
                menuName:req.body.menuName,
                menuCode:req.body.menuCode,
                isActive:req.body.isActive,
                isBlock:req.body.isBlock
               
            })
            try {
                await register.save()
                res.status(201).send("Register success")
            } catch (error) {
                res.status(400).send(error.message);
            }
        })  
        
}