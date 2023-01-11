import express from "express";
import { login, reg ,getAll, ownerReg} from "../controller/userController.js";
import auth from "../middleware/auth.js";
import authOwner from "../middleware/owner.js";
const router = express.Router();

router.post("/login",login)
router.post("/v1/ownerReg",ownerReg)
router.post("/v2/reg",[auth,authOwner],reg)
router.get("/get",[auth,authOwner],getAll)  

export default router