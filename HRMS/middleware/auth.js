import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

async function auth(req,res,next){
    // console.log(name);
    const token=req.header('hrms-auth-token')
    if(!token)res.status(403).send('forbidden')
    try {
        const decoded=jwt.verify(token,process.env.JWT)
        // console.log(decoded);
        req.user=decoded
        let getOwner=await User.findById({_id:req.user.id}).select("isOwner")
        if(getOwner?.isOwner){ 
            req.user={...req.user,isOwner:getOwner?.isOwner}
            return next()
        }
        let user=await User.findById({_id:req.user.id}).populate("role")
        req.user={...req.user,...{roleId:user.role._id,roleName:user.role.roleType,isOwner:user.isOwner}}
        console.log(req.user)
        next(); 
    } catch (error) { 
        res.status(400).send("invalid token")
    } 
}

export default auth;