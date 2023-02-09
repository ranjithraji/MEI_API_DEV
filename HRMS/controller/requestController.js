import Request from "../models/requestModel.js";
import { checkAccessCreate, checkAccessGet } from "../config/checkAccess.js";

export const create=async(req,res)=>{
    let menu=req.body.requestName
    let access=checkAccessCreate(req.user,menu)
    if(!access && !req.user.isOwner) return res.status(401).json({message:"your not right person to do this"});
    try {
        const data =await new Request({
            requestMenu:req.body.requestMenu,
            user:req.body.user 
        })
        await data.save()
        res.status(200).json({message:"request Created"})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const getAll=async(req,res)=>{
    let menu=req.body.requestName
    let access=checkAccessGet(req.user,menu) 
    if(!access && !req.user.isOwner) return res.status(401).json({message:"your not right person to do this"});
    try {
        const data =await Request.find()
        res.status(200).json({data:data})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
export const getOne=async(req,res)=>{
    let menu=req.body.requestMenu
    let access=checkAccessGet(req.user,menu)
    if(access==false && !req.user.isOwner) return res.status(401).json({message:"your not right person to do this"});
    if(access==undefined && !req.user.isOwner) return res.status(400).json({message:"something wrong"});
    try {
        const data =await Request.findOne({requestMenu:menu})
        res.status(200).json({data:data})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}