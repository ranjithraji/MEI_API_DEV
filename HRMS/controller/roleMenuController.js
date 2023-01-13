import Rolemenu from "../models/rolemenuModel.js";

export const create = async (req, res) => {
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
        res.status(201).json({message:"Register success"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

export const update = async (req, res) => {
    try {
        await Rolemenu.findByIdAndUpdate({_id:req.query.id},{$set:req.body},{new:true});
        res.status(201).json({message:"update success"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

export const deleteRoleMenu = async (req, res) => {
    try {
        await Rolemenu.findByIdAndDelete({_id:req.query.id});
        res.status(201).json({message:"delete success"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

export const getById = async (req, res) => {
    try {
        let user=await Rolemenu.findOne({role:req.user.roleId});
        res.status(201).json({data:user});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

export const getAll = async (req, res) => {
    try {
        let user=await Rolemenu.find().populate("role");
        res.status(201).json({data:user});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

