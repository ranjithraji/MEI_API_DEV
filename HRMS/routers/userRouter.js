import express from "express";
import { login, reg ,getAll, ownerReg,deleteUser,profile, updateUser, UserFam, updateFam, getFam, deleteFam} from "../controller/userController.js";
import auth from "../middleware/auth.js";
import authz from "../middleware/authz.js";

const router = express.Router();

router.post("/login",login)
router.get("/profile",auth,profile)
router.post("/v1/ownerReg",ownerReg)
router.post("/v2/userfamily",UserFam)
router.post("/v2/updatefamily",updateFam)
router.get("/v2/getbyid",getFam)
router.delete("/v2/deletefam",deleteFam)

router.post("/v2/reg",[auth,authz],reg)
router.put("/v2/update", [auth, authz], updateUser)
router.delete("/v2/deleteUser",[auth,authz],deleteUser)
router.get("/get",[auth,authz],getAll)  

export default router   