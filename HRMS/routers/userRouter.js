import express from "express";
<<<<<<< HEAD
import { login, reg ,getAll, ownerReg,deleteUser, updateUser, currentCompany, currentCompanyView, currentCompanyUpdate, addDocument, viewDocument, updateDocument, addPreviousCompany, viewPreviousCompany, previousCompanyUpdate} from "../controller/userController.js";
=======
import { login, reg ,getAll, ownerReg,deleteUser,profile} from "../controller/userController.js";
>>>>>>> a791dc0bf2880fda7316d0f4a8f28e2135b43ffa
import auth from "../middleware/auth.js";
import authOwner from "../middleware/owner.js";

const router = express.Router();

router.post("/login",login)
router.get("/profile",auth,profile)
router.post("/v1/ownerReg",ownerReg)
router.post("/v2/reg",[auth,authOwner],reg)
router.put("/v2/update", [auth, authOwner], updateUser)
router.delete("/v2/deleteUser",[auth,authOwner],deleteUser)
router.get("/get",[auth,authOwner],getAll)  

// Current Company Details------------
router.post("/v2/addCurrentCompany",auth,currentCompany)
router.get("/v2/viewCurrentCompany",auth,currentCompanyView)
router.put("/v2/updateCurrentCompany",auth,currentCompanyUpdate)

// Documnet Details------------
router.post("/v2/addDocumentDetails",auth,addDocument)
router.get("/v2/viewDocumentDetails",auth,viewDocument)
router.put("/v2/updateDocumentDetails",auth,updateDocument)

// Experience Details------------
router.post("/v2/addExperienceDetails",auth,addPreviousCompany)
router.get("/v2/viewExperienceDetails",auth,viewPreviousCompany)
router.put("/v2/updateExperienceDetails",auth,previousCompanyUpdate)


export default router