import Role from '../models/roleModel.js'

export const createRole=async(req,res)=>{
 
    let roleType = req.body.roleType?.toLowerCase()
    roleType=roleType?.charAt(0).toUpperCase() + roleType.slice(1)
    let exRole = await Role.findOne({ roleType: roleType })
    const subst=roleType?.substring(0,3).toUpperCase()  
    let text='HRM'
   const math=Bu0ffer.from(Math.random().toString()).toString().substring(10,12);
    if (!exRole) {
        let createrole = new Role({
            roleType:roleType,
            code:`${text}${subst}${math}`
        })
        try {
            createrole.save()
            res.status(201).json({ message: "Role added success" })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    else {
        return res.status(400).json({ message: "Role already registered" })
    }
}



export const getRole=async(req,res)=>{
    try {
        let obj=[]
        const menu= await Role.find()
        menu.map((item)=>{
            if(item.isBlock===false && item.isActive===true){
                obj.push(item);
            }
        })
        res.status(200).json({data:obj})
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
        let id=req.params.id
        const menu= await Role.findById({_id:id})
        if(menu.length==0) return res.status(200).json({mesage:"Sorry no menu has right now"})

        res.status(200).json({data:menu})
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

export const roleTable=async(req,res)=>{
    try {
        let obj=[]
        const menu= await Role.find()
        menu.map((item)=>{
            if(item.isBlock===false){
                obj.push(item);
            }
        })
        if(!menu) return res.status(200).json({message:"Sorry no Data"})
        res.status(200).json({data:obj}) 
    } catch (error) {
    res.status(400).json({message:error.message});
    }
}
export const roleTable2=async(req,res)=>{
    try {
        let obj=[]
        const menu= await Role.find()
        menu.map((item)=>{
            if(item.isBlock===true){
                obj.push(item);
            }
        })
        if(!menu) return res.status(200).json({message:"Sorry no Data"})
        res.status(200).json({data:obj}) 
    } catch (error) {
    res.status(400).json({message:error.message});
    }
}