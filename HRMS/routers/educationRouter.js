import express from "express";
import { createEducation,getAll,getById,updateEducation} from "../controller/educationController.js";
import auth from "../middleware/auth.js";
import authz from "../middleware/authz.js";
const router = express.Router();

router.post("/edu/create",[auth, authz],createEducation)
router.put("/edu/update",[auth, authz],updateEducation)
router.get("/edu/getAll",[auth, authz],getAll)
router.get("/edu/getbyid/:id",[auth, authz],getById)

export default router;