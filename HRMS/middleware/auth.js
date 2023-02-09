import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import Role from '../models/roleModel.js'

async function auth(req,res,next){
    // console.log(name);
    const token=req.header('hrms-auth-token')
    if(!token) return res.status(403).json({message:'forbidden - token is unavailable'}) 
    
    try {
        const decoded=jwt.verify(token,process.env.JWT)
        req.user=decoded
        let getOwner=await User.findById({_id:req.user.id}).select("isOwner")
        if(getOwner?.isOwner){ 
            req.user={...req.user,isOwner:getOwner?.isOwner}    
            return next()
        }
        let userFound=await User.findById({_id:req.user.id})
        if(!userFound.role) return res.status(404).json({message:"Not mapping any role for this user"})
        let validRole=await Role.findById({_id:userFound.role})
        if(!validRole) return res.status(404).json({message:"role is not found it may be not active or blocked "})
        let user=await User.findById({_id:req.user.id}).populate("role")
        req.user={...req.user,...{roleId:user.role._id,roleName:user.role.roleType,isOwner:user.isOwner}}
        next(); 
    } catch (error) { 
        res.status(400).json({message:"invalid token"})
    } 
}

export default auth;