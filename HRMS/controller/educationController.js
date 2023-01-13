import Education from "../models/educationModel.js"
import User from "../models/userModel.js"

export const createEducation=async(req,res)=>{
    try {
       let id=req.params.id
    let exUser= await Education.findOne({userId:id});
         //console.log(exUser);
  if
  (exUser) return res.status(200).json({message:"Education details already added"})

  
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
    } 

    catch (error) {
        res.status(400).json({message:error.message})
    } 
}
export const updateEducation=async(req,res)=>{
    try {
        const id = req.params.id;
        let exEducation= await Education.findOne({userId:id})
        console.log(exEducation);
        console.log(req.body);
        let obj={
            sslc:{
                sslcSchoolName:req.body.sslcSchoolName || exEducation.sslc.sslcSchoolName,
                sslcBoard:req.body.sslcBoard || exEducation.sslc.sslcBoard,
                sslcYearOfPassing:req.body.sslcYearOfPassing || exEducation.sslc.sslcYearOfPassing,
                sslcPercentage:req.body.sslcPercentage || exEducation.sslc.sslcPercentage
            },
            hsc:{
                hscSchoolName:req.body.hscSchoolName || exEducation.hsc.hscSchoolName,
                hscBoard:req.body.hscBoard || exEducation.hsc.hscBoard,
                hscYearOfPassing:req.body.hscYearOfPassing || exEducation.hsc.hscYearOfPassing,
                hscPercentage:req.body.hscPercentage || exEducation.hsc.hscPercentage
            },
            ug:{
                ugUniversityName:req.body.ugUniversityName || exEducation.ug.ugUniversityName,
                ugInstituteName:req.body.ugInstituteName  || exEducation.ug.ugInstituteName,
                ugDepartmentCourse:req.body.ugDepartmentCourse || exEducation.ug.ugDepartmentCourse,
                ugYearOfPassing:req.body.ugYearOfPassing || exEducation.ug.ugYearOfPassing,
                ugCgpa:req.body.ugCgpa || exEducation.ug.ugCgpa
            },
            pg:{
                pgUniversityName:req.body.pgUniversityName || exEducation.pg.pgUniversityName,
                pgInstituteName:req.body.pgInstituteName || exEducation.pg.pgInstituteName,
                pgDepartmentCourse:req.body.pgDepartmentCourse || exEducation.pg.pgDepartmentCourse,
                pgYearOfPassing:req.body.pgYearOfPassing || exEducation.pg.pgYearOfPassing,
                pgCgpa:req.body.pgCgpa || exEducation.pg.pgCgpa
            }
          }
        if(!exEducation) return res.status(200).json({message:"No User"})
        await Education.findOneAndUpdate({userId:id},{$set:obj},{new:false})
        console.log(req.params.id);
        res.status(200).json({message:"Education details Updated"})
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