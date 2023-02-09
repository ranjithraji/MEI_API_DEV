import User from "../models/userModel.js"
import Family from "../models/familyModel.js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { checkAccessCreate, checkAccessDelete, checkAccessGet, checkAccessUpdate } from "../config/checkAccess.js";
import Address from "../models/addressModel.js";
import CurrentCompany from "../models/currentComModel.js";
import Document from "../models/documentModel.js";
import Experience from "../models/experienceModel.js";
import Menu from "../models/menuModel.js";
import Education from "../models/educationModel.js";

const saltRounds = 10;
dotenv.config();

export const reg = async (req, res) => {
    let email = req.body.email
    let menu = req.body.menuId
    let obj =await checkAccessCreate(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let exUser = await User.findOne({ email: email })
    if (exUser) {
        return res.status(400).json({ message: "email already register" })
    }
    else {
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            let register = new User({
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dob: req.body.dob,
                gender: req.body.gender,
                bloodGroup: req.body.bloodGroup,
                marriageStatus: req.body.marriageStatus,
                mobileNo: req.body.mobileNo,
                role: req.body.role,
            })
            try {
                let user=await register.save()
                res.status(201).json({ message: "Register success" ,id:user._id})
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        })
    }
}


export const ownerReg = async (req, res) => {
    let email = req.body.email
    let exUser = await User.findOne({ email: email })
    if (exUser) {
        return res.json({ message: "email exists please login" })
    }
    else {
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            let register = new User({
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dob: req.body.dob,
                gender: req.body.gender,
                bloodGroup: req.body.bloodGroup,
                marriageStatus: req.body.marriageStatus,
                mobileNo: req.body.mobileNo,
                isOwner: true
            })
            try {
                await register.save()
                res.status(201).json({ message: "Owner Register success" })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        })
    }
}

export const login = async (req, res) => {
    let email = req.body.email
    let foundUser = await User.findOne({ email: email })
    if (foundUser) {
        if(foundUser.isOwner==false && foundUser.isActive==false) return res.status(400).json({ message: "your are not active user" })
        if(foundUser.isOwner==false && foundUser.isBlock==true) return res.status(400).json({ message: "your are blocked user" })
        bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ id: foundUser?._id }, process.env.JWT)
                res.header("hrms-auth-token", token).json({ message: "login successfully", token: token })
            } else {
                res.status(400).json({ message: "please enter correct password" })
            }
        })
    }else{
        res.status(404).json({ message: "user not found" })
    }
}

// Update the User
export const updateUser = async (req, res) => {
    try {
        let menu = req.body.menuId
        let obj =await checkAccessUpdate(req.user, menu)
        if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
        const user = await User.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true })
        res.status(200).json({ meesage: "Updated successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export const upRoleUser = async (req, res) => {
    try {
        let menu = req.body.menuId
        let obj =await checkAccessUpdate(req.user, menu)
        if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
        const user = await User.findByIdAndUpdate(req.params.id, { $set: {role:req.body.role}}, { new: true })
        res.status(200).json({ meesage: "Updated successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    let email = req.body.email
    let menu = req.body.menuId
    let obj =await checkAccessDelete(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        const user = await User.findOneAndRemove({ email: email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: "User deleted success" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const profile = async (req, res) => {
    try {
        const view = await User.findById({ _id: req.user.id }).select("-password")
        res.status(200).json({ data: view })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

export const getAllUser = async (req, res) => {
    try {
        const getUser = await User.find().select("-password")
        res.status(200).json({ data: getUser })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export const getNoOwner = async (req, res) => {
    try {
        let data=[]
        const getUser = await User.find().select("-password")
        getUser.map((item,index)=>{
            if(item.isOwner == true){
                getUser.splice(index,1)
            }
        })
        data.push(getUser)
        res.status(200).json({ data: data })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const getUser = await User.findById({ _id: req.params.id }).select("-password")
        res.status(200).json({ data: getUser })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Adding User's Current Company Details 
export const currentCompany = async (req, res) => {
    let menu = req.body.menuId
    let obj =await checkAccessCreate(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id= req.query.userId
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found ' });
        const existUser = await CurrentCompany.findOne({ userId: id })
        if (existUser) {
            return res.status(400).json({ message: "Current company details already added for this user" })
        }
        const company = new CurrentCompany({
            userId: id,
            department: req.body.department,
            designation: req.body.designation,
            role: req.body.role,
            salary: req.body.salary,
            joiningDate: req.body.joiningDate,
            reportedTo: req.body.reportedTo,
            isFreasher: req.body.isFreasher
        })
        await company.save()
        res.status(201).json({ message: "Company details added" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// View user's current company details

export const currentCompanyView = async (req, res) => {
    let menu = req.body.menuId
    let obj =await checkAccessGet(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id =req.query.userId 
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found ' });
        const company = await CurrentCompany.findOne({ userId: id})//.populate('role').populate('userId')
        if (!company) {
            return res.status(400).json({ message: "No company details found for this user" })
        }
        res.status(200).json(company)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update user's current company details

export const currentCompanyUpdate = async (req, res) => {
    let menu = req.body.menuId
    let obj =await checkAccessUpdate(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id =req.query.userId 
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found=await CurrentCompany.findOne({userId:id})
        if (!found) return res.status(404).json({ message: 'current company details not found for this user' });
        const company = await CurrentCompany.findOneAndUpdate({userId:id}, { $set: req.body })
        if (!company) {
            return res.status(400).json({ message: "No company details found" })
        }
        res.status(200).json({ message: "Company Details Updated successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Add Document Details

export const addDocument = async (req, res) => {
    // let menu = req.body.menuId
    // let obj =await checkAccessCreate(req.user, menu)
    // if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id =req.query.userId
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found ' });
        const user = await Document.findOne({userId: id})
        if (user) return res.status(400).json({ message: "Document details already added for this user" })
        const document = new Document({
            userId: id,
            bankDetails: {
                accountNo: req.body.accountNo,
                ifsc: req.body.ifsc,
                branch: req.body.branch,
                bankName: req.body.bankName,
                accountHolderName: req.body.accountHolderName,
            },
            identificationDetails: {
                aadhaarNo: req.body.aadhaarNo,
                panNo: req.body.panNo,
                passportNo: req.body.passportNo,
                uanNo: req.body.uanNo,
                pfNo: req.body.pfNo,
                esiNo: req.body.esiNo,
            },
            medicalDetails: {
                vaccination1Date: req.body.vaccination1Date,
                vaccination2Date: req.body.vaccination2Date,
            }

        })
        await document.save()
        res.status(201).json({ message: "Document details added" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// View Document Details
export const viewid = async (req, res) => {
    let id =req.query.userId
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found' });
        const document = await Document.findOne({ userId: id })//.populate('userId')
        if (!document) {
            return res.status(400).json({ message: "No document details found for this user" })
        } else {
            return res.status(200).json({data:document})
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



export const viewDocument = async (req, res) => {
    // let menu = req.body.menuId
    // let obj =await checkAccessGet(req.user, menu)
    // if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id =req.query.userId
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found' });
        const document = await Document.findOne({ userId: id })//.populate('userId')
        if (!document) {
            return res.status(400).json({ message: "No document details found for this user" })
        } else {
            return res.status(200).json({data:document})
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update Document Details

export const updateDocument = async (req,res) => {
    let menu = req.body.menuId
    let obj =await checkAccessUpdate(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id =req.query.userId
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found' });
        const userData=await Document.findOne({userId:id})
        if(!userData) return res.status(404).json({ message: 'Document details not found for this user' })
        await Document.findOneAndUpdate(id, {
            $set: {
                bankDetails: {
                    accountNo: req.body.accountNo || userData.bankDetails.accountNo,
                    ifsc: req.body.ifsc || userData.bankDetails.ifsc,
                    branch: req.body.branch || userData.bankDetails.branch,
                    bankName: req.body.bankName  || userData.bankDetails.bankName,
                    name: req.body.name || userData.bankDetails.name,
                },
                identificationDetails: {
                    aadhaarNo: req.body.aadhaarNo || userData.identificationDetails.aadhaarNo,
                    panNo: req.body.panNo || userData.identificationDetails.panNo,
                    passportNo: req.body.passportNo || userData.identificationDetails.passportNo,
                    uanNo: req.body.uanNo || userData.identificationDetails.uanNo,
                    pfNo: req.body.pfNo || userData.identificationDetails.pfNo,
                    esiNo: req.body.esiNo || userData.identificationDetails.esiNo,
                },
                medicalDetails: {
                    vaccination1Date: req.body.vaccination1Date || userData.medicalDetails.vaccination1Date,
                    vaccination2Date: req.body.vaccination2Date || userData.medicalDetails.vaccination2Date,
                }

            }
        })
        
        res.status(200).json({ message: "Document Details Updated successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Add user's previous company details

export const addPreviousCompany = async (req, res) => {
    // let menu = req.body.menuId
    // let obj =await checkAccessCreate(req.user, menu)
    // if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id =req.query.userId
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found' });
        let userFound=await Experience.findOne({userId:id, companyName:req.body.companyName, designation:req.body.designation, 
            description:req.body.description,startDate:req.body.startDate, endDate:req.body.endDate
        })
        if (userFound) return res.status(400).json({ 
            message: "Company name:"+userFound?.companyName+", designation:"+userFound?.designation+", description:"+userFound?.description+
            ", starting date:"+userFound?.startDate+", and ending date:"+userFound?.endDate+ " experience details are already added for this user" 
            }
        );
        const user = new Experience({
            userId: id,
            companyName: req.body.companyName,
            designation: req.body.designation,
            description: req.body.description,
            salary: req.body.salary,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            experience: req.body.experience,
        })
        await user.save()
        return res.status(201).json({ message: "Experience details added" })
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}

// View user's previous company details
export const viewexid = async (req, res) => {  
    let id =req.query.userId
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found' });
        const company = await Experience.find({ userId: id })//.populate('userId')
        if (!company) return res.status(400).json({ message: "No company details found" })
        res.status(200).json({data:company}) //.map((item) => item.previewsCompanies)
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

export const viewPreviousCompany = async (req, res) => {
    // let menu = req.body.menuId
    // let obj =await checkAccessGet(req.user, menu)
    // if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id =req.query.userId
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found' });
        const company = await Experience.find({ userId: id })//.populate('userId')
        if (!company) return res.status(400).json({ message: "No company details found" })
        res.status(200).json({data:company}) //.map((item) => item.previewsCompanies)
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

// Update user's previous company details

export const previousCompanyUpdate = async (req, res) => {
    let menu = req.body.menuId
    let obj =await checkAccessUpdate(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id =req.query.id
    if(!id) return res.status(400).json({ message: "Please provide id in query" });
    try {
        const user = await Experience.findByIdAndUpdate({ _id:id },{$set:req.body})
        if (!user) return res.status(400).json({ message: "No company details found in this user" })
        res.status(200).json({ message: "company details updated success" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// user Family Details CRU

export const UserFam = async (req, res) => {
    let menu = req.body.menuId
    let obj =await checkAccessCreate(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id = req.query.userId;
    if(!id) return res.status(400).json({ message: "Please provide id in query" });
    try {
        let Xuser = await User.findById({ _id: id });
        if (!Xuser) return res.status(200).json({ message: "user not found" })
        let XuserFam = await Family.findOne({ userId: id ,relationship: req.body.relationship?.toLowerCase()});
        if(XuserFam) return res.status(400).json({ message: `Already added ${XuserFam?.relationship} details for this user`  })
        let userFamily = new Family({
            userId: id,
            name: req.body.name,
            relationship: req.body.relationship?.toLowerCase(),
            occupation: req.body.occupation,
            dob: req.body.dob,
            adhaarNo: req.body.adhaarNo,
            emergencyContact: req.body.emergencyContact
        })

        await userFamily.save();
        res.status(200).json({ message: "Family member added" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const updateFam = async (req, res) => {
    let menu = req.body.menuId
    let obj =await checkAccessUpdate(req.user,menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id = req.query.id;
    if(!id) return res.status(400).json({ message: "Please provide id in query" });
    try {
        let up=await Family.findByIdAndUpdate({ _id: id }, { $set: req.body });
        if(!up) return res.status(400).json({ message: "No family details found" })
        res.status(201).json({ message: "update success" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getFam = async (req, res) => {
    let menu = req.body.menuId
    let obj =await checkAccessGet(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id = req.query.id;
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let Xuser = await User.findById({ _id: id });
        if (!Xuser) return res.status(404).json({ message: "user not found" })
        const getFam = await Family.find({userId:id})
        if(!getFam) return res.status(400).json({ message: "No family details found for this user" })
        res.status(200).json({ data: getFam })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const deleteFam = async (req, res) => {
    let menu = req.body.menuId
    let obj =await checkAccessDelete(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id = req.query.userId;
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let Xuser = await User.findById({ _id: id });
        if (!Xuser) return res.status(404).json({ message: "user not found" })
        const user = await Family.find({ userId: id });
        if(user.length==0) return res.status(404).json({ message: 'family not found for this user' });
        user.map(async(item) => {
            await Family.findByIdAndDelete({ _id: item._id })
        })
        res.status(200).json({ data: "Deleted success" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//Address CRU
export const createAddress = async (req, res) => {
    let menu = req.body.menuId
    let obj =await checkAccessCreate(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    const id = req.query.userId;
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let user = await User.findById({ _id: id });
        if (!user) return res.status(404).json({ message: "User not found" })
        let Xuser = await Address.findOne({ userId: id });
        if(Xuser) return res.status(400).json({ message: "Already added address for this user"  })
        let newAddress = await new Address({
            userId: id,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            postalCode: req.body.postalCode
        })
        await newAddress.save()
        res.status(200).json({ message: "Address add success" ,userId:newAddress.userId})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateAddress = async (req, res) => {
    let menu = req.body.menuId
    let obj =await checkAccessUpdate(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    const id = req.query.userId;
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found ' });
        let Xuser = await Address.findOne({ userId: id })
        if (!Xuser) return res.status(404).json({ message: "address not found for this user" })
        await Address.findOneAndUpdate({userId: id},{ $set: req.body })
        res.status(200).json({ message: "Address Updated" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const viewUserAddress = async (req, res) => {
    let menu = req.body.menuId
    let obj =await checkAccessGet(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    const id = req.query.userId;
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found' });
        let Xuser = await Address.findOne({ userId: id })
        if (!Xuser) return res.status(200).json({ message: "address not found for this user" })
        res.status(200).json({ data: Xuser })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


export const createEducation=async(req,res)=>{
    // let menu = req.body.menuId
    // let obj =await checkAccessCreate(req.user, menu)
    // if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    const id = req.query.userId;
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found' });
        let exUser= await Education.findOne({userId:id});
        if(exUser) return res.status(200).json({message:"Education details already added for this user"})
        let userEducation =  new Education({
            userId:id,
            sslc:{
                sslcSchoolName:req.body.sslcSchoolName || null,
                sslcBoard:req.body.sslcBoard || null,
                sslcYearOfPassing:req.body.sslcYearOfPassing || null,
                sslcPercentage:req.body.sslcPercentage || null 
            },
            hsc:{
                hscSchoolName:req.body.hscSchoolName || null,
                hscBoard:req.body.hscBoard || null,
                hscYearOfPassing:req.body.hscYearOfPassing || null,
                hscPercentage:req.body.hscPercentage || null
            },
            ug:{
                ugUniversityName:req.body.ugUniversityName || null,
                ugInstituteName:req.body.ugInstituteName || null,
                ugDepartmentCourse:req.body.ugDepartmentCourse || null,
                ugYearOfPassing:req.body.ugYearOfPassing || null,
                ugCgpa:req.body.ugCgpa || null
            },
            pg:{
                pgUniversityName:req.body.pgUniversityName || null,
                pgInstituteName:req.body.pgInstituteNamev || null,
                pgDepartmentCourse:req.body.pgDepartmentCourse || null,
                pgYearOfPassing:req.body.pgYearOfPassing || null,
                pgCgpa:req.body.pgCgpa || null
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
    let menu = req.body.menuId
    let obj =await checkAccessCreate(req.user, menu)
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    const id = req.query.userId;
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found' });
        let exEducation= await Education.findOne({userId:id})
        if(!exEducation) return res.status(200).json({message:"No education details found for this user"})
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
        await Education.findOneAndUpdate({userId:id},{$set:obj},{new:true})
        res.status(200).json({message:"Education details Updated"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }  
}
export const getAllEducation = async (req, res) => {
    try {
        let education=await Education.find();
        if(!education) return res.status(404).json({ message: 'Education details not found' });
        res.status(201).json({data:education});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};
export const getByIdEducation = async (req, res) => {
    // let menu = req.body.menuId
    // let obj =await checkAccessCreate(req.user, menu)
    // if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    const id = req.query.userId;
    if(!id) return res.status(400).json({ message: "Please provide user id in query" });
    try {
        let found= await User.findById({_id:id})
        if (!found) return res.status(404).json({ message: 'User not found' });
        let singleuser=await Education.findOne({userId:id});
        if(!singleuser) return res.status(200).json({message:"No education details found for this user"})
        res.status(201).json({data:singleuser});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};