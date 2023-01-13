import User from "../models/userModel.js"
import Family from "../models/familyModel.js";
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
        const user = await User.findByIdAndUpdate(req.body.id, {$set: req.body})
        res.status(200).json({message:"update success"})
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
                res.status(201).json({message:"Owner Register success"})
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

export const profile=async(req, res) => {
    try {
        const view= await User.find({_id:req.user.id})
        res.status(200).json({data:view})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
    
}

export const getAll=async(req,res)=>{
    try {
        const getUser=await User.find()
        res.status(200).json({data:getUser})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}


// user Family Details CRU

export const UserFam=async(req,res)=>{
    try {
        let id= req.query.id;
    let Xuser= await User.findById({_id:id});
    if(!Xuser) return res.status(200).json({message:"No user found"})

    let userFamily=  new Family({
        userId:id,
        name:req.body.name,
        relationship:req.body.relationship,
        occupation:req.body.occupation,
        dob:req.body.dob,
        adhaarNo:req.body.adhaarNo,
        emergencyContact:req.body.emergencyContact        
    })

    await userFamily.save();
    res.status(200).json({message:"Family member added"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    
}

export const updateFam= async (req, res) => {
    try {
        await Family.findByIdAndUpdate({_id:req.body.id},{$set:req.body});
        res.status(201).json({message:"update success"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const getFam=async(req,res)=>{
    try {
        let id= req.query.id;
        let Xuser= await User.findById({_id:id});
        if(!Xuser) return res.status(200).json({message:"No user found"})
        const getFam=await Family.find()
        res.status(200).json({data:getFam})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}


export const deleteFam = async (req, res) => {
    let id= req.query.id;
    try {
        const user = await Family.findOneAndRemove({_id:id });
        if (!user) return res.status(404).json({message:'User not found'});
        res.status(200).json({data:user});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};