import express from "express"
import { createRole, deleteRole, getRole, updateRole } from "../controller/roleController.js"
import auth from "../middleware/auth.js";
import authOwner from "../middleware/owner.js";
const router = express.Router();

router.post("/create_role",createRole)
router.get("/view_role",getRole)
router.put("/update_role/:id",updateRole)
router.delete("/delete_role",deleteRole)


export default router