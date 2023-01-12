import User from "../models/userModel.js"
import * as dotenv from 'dotenv';

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds=10;
dotenv.config();

export const reg=async (req,res)=>{
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
                res.status(201).send("register")
            } catch (error) {
                res.status(400).send(error.message);
            }
        })  
    }    
}

//-------- Update the User
export const updateUser= async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id, {$set: req.body})
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error.message);
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
                res.header("hrms-auth-token",token).send("logged successfully")
            }else{
                res.status(400).send("please enter correct password!!!")
            }
        })
        
    }else{
        res.status(400).send("Your are not a authorized person")
    }
}

 export const deleteUser = async (req, res) => {
  
    let email=req.body.email
  const user = await User.findOneAndRemove({ email:email });

  if (!user) return res.status(404).send({message:'The user with the given ID was not found.'});

  res.send(user);
};

//update userEducation details




export const getAll=async(req,res)=>{
    const getUser=await User.find()
    res.send(getUser)
}