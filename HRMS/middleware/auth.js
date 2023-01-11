import jwt from 'jsonwebtoken'

function auth(req,res,next){
    const token=req.header('hrms-auth-token')
    if(!token)res.status(403).send('forbidden')
    try {
        const decoded=jwt.verify(token,process.env.JWT)
        req.user=decoded
        next();
    } catch (error) {
        res.status(400).send("invalid token")
    }
}

export default auth;