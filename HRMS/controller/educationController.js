import Education from "../models/educationModel.js"
import User from "../models/userModel.js"

export const createEducation=async(req,res)=>{
    try {
        let id= req.params.id;
    let eXuser= await User.findById({_id:id});
    if(!eXuser) return res.status(200).json({message:"No user found"})
    let userEducation =  new Education({
        userId:id,
        sslc:{
            sslcSchoolName:req.body.sslcSchoolName,
            sslcBoard:req.body.sslcBoard,
            sslcYearOfPassing:req.body.sslcYearOfPassing,
            sslcPercentage:req.body.sslcPercentage
        },
        hsc:{
            hscSchoolName:req.body.hscSchoolName,
            hscBoard:req.body.hscBoard,
            hscYearOfPassing:req.body.hscYearOfPassing,
            hscPercentage:req.body.hscPercentage
        },
        ug:{
            ugUniversityName:req.body.ugUniversityName,
            ugInstituteName:req.body.ugInstituteName,
            ugDepartmentCourse:req.body.ugDepartmentCourse,
            ugYearOfPassing:req.body.ugYearOfPassing,
            ugCgpa:req.body.ugCgpa
        },
        pg:{
            pgUniversityName:req.body.pgUniversityName,
            pgInstituteName:req.body.pgInstituteName,
            pgDepartmentCourse:req.body.pgDepartmentCourse,
            pgYearOfPassing:req.body.pgYearOfPassing,
            pgCgpa:req.body.pgCgpa
        }
    })
    await userEducation.save();
    res.status(200).json({message:"Education added"})
    } catch (error) {
        res.status(400).json({message:error.message})
    } 
}
export const updateEducation=async(req,res)=>{
    try {
        const id = req.params.id;
        let exEducation= await Education.findOne({userId:id})
        if(!exEducation) return res.status(200).json({message:"No User"})
        await Education.findOneAndUpdate({userId:req.params.id},{$set:req.body},{new:true})
        // console.log(req.body);
        res.status(200).json({message:"Education Updated"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }  
}
export const getAll = async (req, res) => {
    try {
        let education=await Education.find();
        res.status(201).json({data:education});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};
export const getById = async (req, res) => {
    try {
        let singleuser=await Education.findById({_id:req.params.id});
        res.status(201).json({data:singleuser});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};