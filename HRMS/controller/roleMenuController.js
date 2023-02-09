import Rolemenu from "../models/rolemenuModel.js";

export const create = async (req, res) => {
    let foundRoleMenu=await Rolemenu.findOne({role:req.body.role,menu:req.body.menu})
    if(foundRoleMenu) return res.status(400).json({message:"This menu already mapped with this role"});
    let register = new Rolemenu({
        role: req.body.role,
        menu: req.body.menu,
        create: req.body.create,
        get: req.body.get,
        update: req.body.update,
        delete: req.body.delete,
    });
    try {
        await register.save();
        res.status(201).json({message:"Mapping success"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

export const update = async (req, res) => {
    try {
        await Rolemenu.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
        res.status(200).json({message:"update success"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

export const deleteRoleMenu = async (req, res) => {
    try {
        await Rolemenu.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({message:"delete success"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

export const getById = async (req, res) => {
    try {
        let user=await Rolemenu.find({role:req.params.id})
        .populate({ path: 'role', model: 'Role' })
        .populate({ path: 'menu', model: 'Menu' });
        res.status(200).json({data:user});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};
export const getByIdForAccess = async (req, res) => {
    let obj=[]
    try {
        let user=await Rolemenu.find({role:req.params.id}).populate("menu");
        user.map((i)=>{
            let menu = i.menu.menuName
            obj.push({menu,id:i.menu._id})
        })
        res.status(200).json({data:obj});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

export const getAll = async (req, res) => {
    try {
        let user=await Rolemenu.find()
        .populate({ path: 'role', model: 'Role' })
        .populate({ path: 'menu', model: 'Menu' });;
        res.status(200).json({data:user});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};