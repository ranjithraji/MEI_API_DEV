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

const saltRounds = 10;
dotenv.config();

export const reg = async (req, res) => {
    let email = req.body.email
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessCreate(req.user, menu)
    console.log(obj);
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
                mobileNo: req.body.mobileNo,
                role: req.body.role,

            })
            try {
                await register.save()
                res.status(201).json({ message: "Register success" })
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
        bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ id: foundUser?._id }, process.env.JWT)
                res.header("hrms-auth-token", token).json({ message: "login successfully", token: token })
            } else {
                res.status(400).json({ message: "please enter correct password" })
            }
        })
    }
}

// Update the User
export const updateUser = async (req, res) => {
    try {
        let menu = req.body.menuId
        if (!menu) return res.status(400).json({ message: "menu id is required"});
        let found = await Menu.findById({_id:menu})
        if (!found) return res.status(400).json({ message: "menu id is not found"});
        let obj = checkAccessUpdate(req.user, menu)
        console.log(obj);
        if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
        const user = await User.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true })
        res.status(200).json({ meesage: "Updated successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



export const deleteUser = async (req, res) => {
    let email = req.body.email
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessDelete(req.user, menu)
    console.log(obj);
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
        const view = await User.find({ _id: req.user.id }).select("-password")
        res.status(200).json({ data: view })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

export const getAll = async (req, res) => {
    try {
        const getUser = await User.find()
        res.status(200).json({ data: getUser })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Adding User's Current Company Details 

export const currentCompany = async (req, res) => {
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessCreate(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        const existUser = await CurrentCompany.findById({ userId: req.params.userId })
        if (existUser) {
            return res.status(400).json({ message: "This user details already exists" })
        }

        const company = new CurrentCompany({
            userId: id,
            detaprment: req.body.detaprment,
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
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessGet(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        const company = await CurrentCompany.find({ userId: req.query.userId })//.populate('role').populate('userId')
        if (!company) {
            return res.status(400).json({ message: "No company details found" })
        }
        res.status(200).json(company)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    res.status(200).json(company);
  }

// Update user's current company details

export const currentCompanyUpdate = async (req, res) => {
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessUpdate(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        const company = await CurrentCompany.findByIdAndUpdate(req.query.id, { $set: req.body })
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
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessCreate(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        const user = await Document.findOne({
            userId: req.query.userId
        })
        if (user) {
            return res.status(400).json({ message: "Document details already exists" })
        }

    const document = new Document({
      userId: req.body.userId,
      bankDetails: {
        accountNo: req.body.accountNo,
        ifsc: req.body.ifsc,
        branch: req.body.branch,
        bankName: req.body.bankName,
        name: req.body.name,
      },
      identificationDetails: {
        adhaarNo: req.body.adharNo,
        panNo: req.body.panNo,
        passportNo: req.body.passportNo,
        uanNo: req.body.uanNo,
        pfNo: req.body.pfNo,
        esicNo: req.body.esicNo,
      },
      medicalDetails: {
        vaccination1Date: req.body.vaccination1Date,
        vaccination2Date: req.body.vaccination2Date,
      },
    });
    await document.save();
    res.status(201).json({ message: "Document details added" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// View Document Details

export const viewDocument = async (req, res) => {
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessGet(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        const document = await Document.findOne({ userId: req.query.userId })//.populate('userId')
        if (!document) {
            return res.status(400).json({ message: "No document details found" })
        } else {
            return res.status(200).json({data:document})
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  } 
// Update Document Details

export const updateDocument = async (req, res) => {
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessUpdate(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        const document = await Document.findByIdAndUpdate(req.query .id, {
            $set: {
                bankDetails: {
                    accountNo: req.body.accountNo,
                    ifsc: req.body.ifsc,
                    branch: req.body.branch,
                    bankName: req.body.bankName,
                    name: req.body.name,
                },
                identificationDetails: {
                    adhaarNo: req.body.adharNo,
                    panNo: req.body.panNo,
                    passportNo: req.body.passportNo,
                    uanNo: req.body.uanNo,
                    pfNo: req.body.pfNo,
                    esicNo: req.body.esicNo,
                },
                medicalDetails: {
                    vaccination1Date: req.body.vaccination1Date,
                    vaccination2Date: req.body.vaccination2Date,
                }

            }
        })
        if (!document) {
            return res.status(400).json({ message: "No document details found" })
        }
        res.status(200).json({ message: "Document Details Updated successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Add user's previous company details

export const addPreviousCompany = async (req, res) => {
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessCreate(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        const company = {
            companyName: req.body.companyName,
            designation: req.body.designation,
            description: req.body.description,
            salary: req.body.salary,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            experience: req.body.experience,
        }
        const newExperience = new Experience({
            userId: req.body.userId,
            previewsCompanies: []
        })
        const user = await Experience.findOne({
            userId: req.body.userId
        })
        if (user) {
            user.previewsCompanies.push(company)
            await user.save()
            return res.status(201).json({ message: "Experience details added" })
        } else {
            newExperience.previewsCompanies.push(company)
            await newExperience.save()
            return res.status(201).json({ message: "Experience details added" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
  } 

// View user's previous company details

export const viewPreviousCompany = async (req, res) => {
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessGet(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        const company = await Experience.find({ userId: req.body.userId })//.populate('userId')
        if (!company) {
            return res.status(400).json({ message: "No company details found" })
        } else {
            return res.status(200).json(company) //.map((item) => item.previewsCompanies)
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  }

// Update user's previous company details

export const previousCompanyUpdate = async (req, res) => {
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessUpdate(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        const user = await Experience.findOne({ userId: req.body.userId })
        if (!user) {
            return res.status(400).json({ message: "No company details found in this user" })
        } else {
            const company = user.previewsCompanies.id(req.body.id)
            if (!company) {
                return res.status(400).json({ message: "No company details found" })
            } else {
                company.companyName = req.body.companyName
                company.designation = req.body.designation
                company.description = req.body.description
                company.salary = req.body.salary
                company.startDate = req.body.startDate
                company.endDate = req.body.endDate
                company.experience = req.body.experience
                await user.save()
                return res.status(200).json({ message: "Company details updated" })
            }

        }
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
} 

// user Family Details CRU

export const UserFam = async (req, res) => {
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessCreate(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        let id = req.query.id;
        let Xuser = await User.findById({ _id: id });
        if (!Xuser) return res.status(200).json({ message: "No user found" })

        let userFamily = new Family({
            userId: id,
            name: req.body.name,
            relationship: req.body.relationship,
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
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessUpdate(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        await Family.findByIdAndUpdate({ _id: req.body.id }, { $set: req.body });
        res.status(201).json({ message: "update success" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getFam = async (req, res) => {
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessGet(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        let id = req.query.id;
        let Xuser = await User.findById({ _id: id });
        if (!Xuser) return res.status(200).json({ message: "No user found" })
        const getFam = await Family.find()
        res.status(200).json({ data: getFam })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const deleteFam = async (req, res) => {
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessDelete(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    let id = req.query.id;
    try {
        const user = await Family.findOneAndRemove({ _id: id });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//Address CRU
export const createAddress = async (req, res) => {
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessCreate(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        const id = req.query.id;
        let Xuser = await User.findById({ _id: id });
        if (!Xuser) return res.status(200).json({ message: "No user" })
        // let user_Id= id;
        let User_add = await Address.findOne({userId:id});
        if(User_add) return res.status(200).json({ message: "Address Already Added" })
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
        res.status(200).json({ message: "Address Added" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateAddress = async (req, res) => {
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessUpdate(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        const id = req.query.id;
        let Xuser = await Address.findOne({ userId: id })
        if (!Xuser) return res.status(200).json({ message: "No User" })
        await Address.updateOne({ $set: req.body })
        res.status(200).json({ message: "Address Updated" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const viewUserAddress = async (req, res) => {
    let menu = req.body.menuId
    if (!menu) return res.status(400).json({ message: "menu id is required"});
    let found = await Menu.findById({_id:menu})
    if (!found) return res.status(400).json({ message: "menu id is not found"});
    let obj = checkAccessGet(req.user, menu)
    console.log(obj);
    if (obj.access == false && obj.message !== null) return res.status(obj.status).json({ message: obj.message});
    try {
        const id = req.query.id;
        let Xuser = await Address.findOne({ userId: id })
        if (!Xuser) return res.status(200).json({ message: "No User" })
        res.status(200).json({ data: Xuser })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
