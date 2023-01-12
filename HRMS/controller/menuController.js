import Menu from '../models/menuModel.js'

export const createMenu=async(req,res)=>{
    try {
        const data =await new Menu({
            menuName:req.body.menuName,
            menuCode:req.body.menuCode 
        })
        await data.save()
        res.status(201).json({message:"Menu Created"})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export  const getmenu=async(req,res)=>{
    try {
        const menu= await Menu.find()
        if(!menu) return res.status(200).json({mesage:"Sorry no menu"})

        res.status(200).json({data:menu})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const deletemenu=async(req,res)=>{
    try {
        const menuName = req.body.menuName;
        let xmenu= await Menu.findOneAndDelete({menuName:menuName})
        if(!xmenu) return res.status(200).json({message:`sorry, there is no field in ${menuName}`})
        res.status(200).json({message:"Menu removed"})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const updatemenu=async(req,res)=>{
    try {
        const menuName = req.body.menuName
        const menuCode= req.body.menuCode 
        let xmenu = await Menu.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
        if(!xmenu) return res.status(200).json({message:`sorry, there is no field in ${menuName}`})
        res.status(200).json({message:"Menu Updated"})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}



