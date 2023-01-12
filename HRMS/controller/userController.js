import User from "../models/userModel.js"
import * as dotenv from 'dotenv';

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds=10;
dotenv.config();

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
                res.status(201).send(register)
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

const updateEducation=(req,res)=>{
    var newData={       
    userId:req.body._id,
    sslc:{
       schoolName:req.body.schoolName,
       board:req.body.board,
       yearofpassing:req.body.yearofpassing,
       percentage:req.body.percentage,
    },
    hsc:{
        schoolName:req.body.schoolName,
        board:req.body.board,
        yearofpassing:req.body.yearofpassing,
        percentage:req.body.percentage,
     },

       

        }
     async function UpdateUser(){
                // const g_id=parseInt(req.body.genresid)
                // console.log(g_id)
                let email=req.body.email
                 try {
                     var logUser=await User.findOne({ email: email })
                     
                    //  console.log(existingUser);
                    if(logUser){
                        let u_data=await Education.updateOne({_id:newData.userId},{$set:{paidamount:newData.paidamount}})
                        res.send(u_data)

                    }
                    if(!logcashier){
                        // let result=Genres.updateOne([newData]);
                        res.send("user doesn't exist. So you cant update the data")
                    }                      
    
                    }
                catch (error) {
                     console.log(error.message)
                 }
      }
      UpdateUser();
    }  



export const getAll=async(req,res)=>{
    const getUser=await User.find()
    res.send(getUser)
    
} 