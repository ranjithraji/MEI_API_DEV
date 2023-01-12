import User from "../models/userModel.js"
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds=10;
dotenv.config();

export const reg=async (req,res)=>{
    let email=req.body.email
    let exUser=await User.findOne({email:email})
    if(exUser){
        return res.status(400).json({message:"email exists please login"})
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
                res.status(201).json({message:"Register success"})
            } catch (error) {
                res.status(400).json({message:error.message});
            }
        })  
    }    
}

//-------- Update the User
export const updateUser= async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id, {$set: req.body},{new:true})
        res.status(200).json({meesage:"update success"})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const ownerReg=async (req,res)=>{
    let email=req.body.email
    let exUser=await User.findOne({email:email})
    if(exUser){
        return res.json({message:"email exists please login"})
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
                res.status(201).json({meesage:"Owner Register success"})
            } catch (error) {
                res.status(400).json({message:error.message});
            }
        })  
    }    
}

export const login=async(req,res)=>{
    let email=req.body.email
    let foundUser=await User.findOne({email:email})
    if(foundUser){
        bcrypt.compare(req.body.password,foundUser.password,(err,result)=>{
            if(result){
                const token=jwt.sign({id:foundUser?._id,isOwner:foundUser?.isOwner},process.env.JWT)
                res.header("hrms-auth-token",token).json({message:"login successfully",token:token})
            }else{
                res.status(400).json({message:"please enter correct password"})
            }
        })
    }else{
        res.status(400).json({message:error.message})
    }
}

export const deleteUser = async (req, res) => {
    let email=req.body.email
    try {
        const user = await User.findOneAndRemove({ email:email });
        if (!user) return res.status(404).json({message:'User not found'});
        res.status(200).json({data:user});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

export const getAll=async(req,res)=>{
    try {
        const getUser=await User.find()
        res.status(200).json({data:getUser})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}