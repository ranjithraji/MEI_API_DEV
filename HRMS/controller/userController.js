import User from "../models/userModel.js"

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds=10

export const reg=async (req,res)=>{
    // if (error) return res.status(400).send(error.details[0].message);

    let email=req.body.email
    let exUser=await User.findOne({email:email})
    if(exUser){
        return res.send("email exists please login")
    }
    else{
        bcrypt.hash(req.body.password,saltRounds,async(err,hash)=>{
            let register=new User({
                email:req.body.email,
                password:hash,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                dob:req.body.dob,
                gender:req.body.gender,
                bloodGroup:req.body.bloodGroup,
                mobileNo:req.body.mobileNo
            })
            try {
                await register.save()
                res.status(201).send("Register success")
            } catch (error) {
                res.status(400).send(error.message);
            }
        })  
    }    
}

export const ownerReg=async (req,res)=>{
    let email=req.body.email
    let exUser=await User.findOne({email:email})
    if(exUser){
        return res.send("email exists please login")
    }
    else{
        bcrypt.hash(req.body.password,saltRounds,async(err,hash)=>{
            let register=new User({
                email:req.body.email,
                password:hash,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                dob:req.body.dob,
                gender:req.body.gender,
                bloodGroup:req.body.bloodGroup,
                mobileNo:req.body.mobileNo,
                isOwner:true
            })
            try {
                await register.save()
                res.status(201).send("Owner Register success")
            } catch (error) {
                res.status(400).send(error.message);
            }
        })  
    }    
}

export const login=async(req,res)=>{
    let email=req.body.email
    let foundUser=await User.findOne({email:email})
    console.log(foundUser?.password);
    if(foundUser){
        bcrypt.compare(req.body.password,foundUser.password,(err,result)=>{
            // console.log(err);
            if(result){
                const token=jwt.sign({id:foundUser?._id,isOwner:foundUser?.isOwner},process.env.JWT)
                res.header("hrms-auth-token",token).send("login success")
            }else{
                res.status(400).send("password wrong")
            }
        })
        
    }else{
        res.status(400).send("email is not please register")
    }
}

export const getAll=async(req,res)=>{
    const getUser=await User.find()
    res.send(getUser)
}