import express from "express";
import { menureg} from "../controller/menuController.js";
// import auth from "../middleware/auth.js";
// import authOwner from "../middleware/owner.js";
const router = express.Router();


router.post("/Reg",menureg)
 

export default router