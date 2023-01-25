import Role from '../models/roleModel.js'

export const createRole=async(req,res)=>{
 
    let roleType = req.body.roleType
    let exRole = await Role.findOne({ roleType: roleType })
    const subst=roleType?.substring(0,3).toUpperCase()  
    let text='HRM'
   const math=Buffer.from(Math.random().toString()).toString().substring(10,12);
    if (!exRole) {
            let createrole = new Role({
                roleType:req.body.roleType,
                code:`${text}${subst}${math}`
            })
            try {
                    createrole.save()
                    res.status(201).json({ message: "Register success" })
                } catch (error) {
                    res.status(400).json({ message: error.message });
                }
    }
    else {
      
        return res.status(400).json({ message: "Role already registered" })
    }
}

export const createRole1=async(req,res)=>{

    let roleType = req.body.roleType
    let exRole = await Role.findOne({ roleType: roleType })
    const subst=roleType.substring(0,3)    
    if (!exRole) {
        let result=Role.find().then((role)=>{

            let createrole = new Role({
                roleType:req.body.roleType,
                code:`HRMS${subst}${role.length <= 0 ? 1 : role.length + 1}`
            })
            try {
                    createrole.save()
                    res.status(201).json({ message: "Register success" })
                } catch (error) {
                    res.status(400).json({ message: error.message });
                }
            console.log(role.length);
        })
     
    }
    else {
      
        return res.status(400).json({ message: "Role already registered" })
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



