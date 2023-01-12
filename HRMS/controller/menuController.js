import Menu from '../models/menuModel.js'

const createMenu=async(req,res)=>{
    try {
        const data =await new Menu({
            menuName:req.body.menuName,
            menuCode:req.body.menuCode 
        })
        await data.save()
        res.status(201).send({message:"Menu Created"})
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

const getmenu=async(req,res)=>{
    try {
        const menu= await Menu.find()
        if(!menu) return res.send({mesage:"Sorry no menu"})

        res.status(200).send({data:menu})
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

const deletemenu=async(req,res)=>{
    try {
        const menuName = req.body.menuName;
        let xmenu= await Menu.findOneAndDelete({menuName:menuName})
        if(!xmenu) return res.send({message:`sorry, there is no field in ${menuName}`})
        res.status(200).send({message:"Menu removed"})
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

const updatemenu=async(req,res)=>{
    try {
        const menuName = req.body.menuName
        const menuCode= req.body.menuCode 
        let xmenu = await Menu.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
        if(!xmenu) return res.send({message:`sorry, there is no field in ${menuName}`})
        res.status(200).send({message:"Menu Updated"})
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}


export default {createMenu, getmenu, deletemenu, updatemenu}
