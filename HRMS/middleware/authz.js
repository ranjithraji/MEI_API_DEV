import RolemenuAccess from "../models/rolemenuModel.js";

const authZ=async(req,res,next)=>{
    if(req.user.isOwner) return next()
    let user=await RolemenuAccess.find({role:req.user.roleId})
    .populate({ path: 'role', model: 'Role' })
    .populate({ path: 'menu', model: 'Menu' });
    // console.log(user);
    let access=user
    req.user={...req.user ,access}
    next() 
}
 
export default authZ;