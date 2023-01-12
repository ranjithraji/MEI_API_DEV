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
        res.status(201).send({message:"Register success"});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
};

export const update = async (req, res) => {
    try {
        await Rolemenu.findByIdAndupdate({_id:req.params.id},{$set:req.body},{new:true});
        res.status(201).send({message:"update success"});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
};

export const deleteRoleMenu = async (req, res) => {
    try {
        await Rolemenu.findByIdAnddelete({_id:req.params.id});
        res.status(201).send({message:"delete success"});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
};

export const getById = async (req, res) => {
    try {
        let user=await Rolemenu.findById({_id:req.params.id});
        res.status(201).send({data:user});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
};

export const getAll = async (req, res) => {
    try {
        let user=await Rolemenu.find();
        res.status(201).send({data:user});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
};