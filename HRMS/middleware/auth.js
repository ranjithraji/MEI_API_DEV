import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

async function auth(req,res,next){
    // console.log(name);
    const token=req.header('hrms-auth-token')
    if(!token)res.status(403).send('forbidden')
    try {
        const decoded=jwt.verify(token,process.env.JWT)
        req.user=decoded
        let user=await User.findById({_id:req.user.id}).populate("role")
        console.log(user);
        next();
    } catch (error) {
        res.status(400).send("invalid token")
    }
}

export default auth;