import Role from '../models/roleModel.js'

export const createRole=async(req,res)=>{
    try {
        const data =await new Role({
            roleType:req.body.roleType,
            code:req.body.code 
        })
        await data.save()
        res.status(200).json({message:"Role Created",roleId:data._id})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const getRole=async(req,res)=>{
    try {
        const role= await Role.find()
        if(!role) return res.status(200).json({message:"Sorry no Data"})

        res.status(200).json({data:role})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const getRoleById=async(req,res)=>{
    try {
        const role= await Role.findById(req.params.id)
        if(!role) return res.status(200).json({message:"Sorry no Data"})
        res.status(200).json({data:role})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}


export const getRoleTable=async(req,res)=>{
    try {
        const role= await Role.find()
        if(!role) return res.status(200).json({message:"Sorry no Data"})
        res.status(200).json({data:role})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const deleteRole=async(req,res)=>{
    try {
        const roleType = req.body.roleType;
        let xmenu= await Role.findOneAndDelete({roleType:roleType})
        if(!xmenu) return res.status(200).json({message:`sorry, there is no field in ${roleType}`})
        res.status(200).json({message:"Role removed"})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const updateRole=async(req,res)=>{
    try {
        const roleType = req.body.roleType
        const code= req.body.code 
        let xrole = await Role.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
        if(!xrole) return res.status(200).json({message:`sorry, there is no field`})
        res.status(200).json({message:"Menu Updated"})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}



