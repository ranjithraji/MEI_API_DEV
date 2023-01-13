import express from "express";
import { create, getAll, getOne, } from "../controller/requestController.js";
import auth from "../middleware/auth.js";
import authz from "../middleware/authz.js";

const router = express.Router();

router.post("/create",[auth,authz],create)
router.get("/getAll",[auth,authz],getAll)
router.get("/getOne",[auth,authz],getOne)

export default router