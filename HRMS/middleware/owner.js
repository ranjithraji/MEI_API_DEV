const authOwner=(req,res,next)=>{
    if(!req.user.isOwner) return res.status(403).send('Access Denied ')
    next()
}

export default authOwner;