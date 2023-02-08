import express from "express";
import { login, reg,  ownerReg, deleteUser, profile, updateUser, UserFam, updateFam, getFam, deleteFam, createAddress, updateAddress, viewUserAddress, currentCompany, 
    currentCompanyView, currentCompanyUpdate, addDocument, viewDocument, updateDocument, addPreviousCompany, viewPreviousCompany, previousCompanyUpdate, createEducation, 
    updateEducation, getAllEducation, getByIdEducation, getAllUser, viewid, viewexid, getNoOwner, getUserById 
} from "../controller/userController.js";

import auth from "../middleware/auth.js";
import authz from "../middleware/authz.js";

const router = express.Router();

router.post("/login",login)
router.get("/profile",auth,profile)
router.post("/v1/ownerReg",ownerReg)
// router.delete("/v2/currentCompany",[auth,authOwner],currentCompany)

router.post("/v2/userfamily", [auth, authz], UserFam)
router.put("/v2/updatefamily", [auth, authz], updateFam)
router.get("/v2/getbyid", [auth, authz], getFam)
router.delete("/v2/deletefamily", [auth, authz], deleteFam)

router.post("/v2/reg", [auth, authz], reg)
router.put("/v2/update", [auth, authz], updateUser)
router.delete("/v2/deleteUser", [auth, authz], deleteUser)
router.get("/get", [auth], getAllUser)
router.get("/noOwner", [auth], getNoOwner)
router.get("/v2/getbyid/:id", [auth, authz], getUserById)

router.post("/v2/Useraddress", [auth, authz], createAddress)
router.put("/v2/Updateaddress", [auth, authz], updateAddress)
router.get("/v2/getaddress", [auth, authz], viewUserAddress)

// Current Company Details------------
router.post("/v2/addCurrentCompany", [auth, authz], currentCompany)
router.get("/v2/viewCurrentCompany", [auth, authz], currentCompanyView)
router.put("/v2/updateCurrentCompany", [auth, authz], currentCompanyUpdate)

// Documnet Details------------
router.post("/v2/addDocumentDetails", [auth, authz], addDocument)
router.get("/v2/viewDocumentDetailsid",viewid)
router.get("/v2/viewDocumentDetails", [auth, authz], viewDocument)
router.put("/v2/updateDocumentDetails", [auth, authz], updateDocument)

// Experience Details------------
router.post("/v2/addExperienceDetails",[auth, authz], addPreviousCompany)
router.get("/v2/viewExperienceDetailsid",viewexid)
router.get("/v2/viewExperienceDetails", [auth, authz], viewPreviousCompany)
router.put("/v2/updateExperienceDetails", [auth, authz], previousCompanyUpdate)

router.post("/v2/educationCreate",[auth, authz],createEducation)
router.put("/v2/educationUpdate",[auth, authz],updateEducation)
router.get("/v2/educationGetAll",[auth, authz],getAllEducation)
router.get("/v2/educationGetbyid",getByIdEducation)


export default router   