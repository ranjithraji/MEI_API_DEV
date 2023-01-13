import express from "express";
import { create, getAll, getOne, } from "../controller/requestController.js";
import auth from "../middleware/auth.js";
import authOwner from "../middleware/owner.js";

const router = express.Router();

router.post("/create",[auth,authOwner],create)
router.get("/getAll",[auth,authOwner],getAll)
router.get("/getOne",[auth,authOwner],getOne)

export default router