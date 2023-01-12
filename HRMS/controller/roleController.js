import Role from '../models/roleModel.js'

const createRole=async(req,res)=>{
    try {
        const data =await new Role({
            roleType:req.body.roleType,
            code:req.body.code 
        })
        await data.save()
        res.status(201).send({message:"Role Created"})
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

const getRole=async(req,res)=>{
    try {
        const role= await Role.find()
        if(!role) return res.send({message:"Sorry no Data"})

        res.status(200).send({data:role})
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

const deleteRole=async(req,res)=>{
    try {
        const roleType = req.body.roleType;
        let xmenu= await Role.findOneAndDelete({roleType:roleType})
        if(!xmenu) return res.send({message:`sorry, there is no field in ${roleType}`})
        res.status(200).send({message:"Role removed"})
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

const updateRole=async(req,res)=>{
    try {
        const roleType = req.body.roleType
        const code= req.body.code 
        let xrole = await Role.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
        if(!xrole) return res.send({message:`sorry, there is no field`})
        res.status(200).send({message:"Menu Updated"})
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}



export default {createRole, getRole, deleteRole,updateRole}