import express from "express"
import { createRole, deleteRole, getRole, updateRole } from "../controller/roleController.js"
import auth from "../middleware/auth.js";
import authOwner from "../middleware/owner.js";
const router = express.Router();

router.post("/create_role",[auth,authOwner],createRole)
router.get("/view_role",[auth,authOwner],getRole)
router.put("/update_role/:id",[auth,authOwner],updateRole)
router.delete("/delete_role",[auth,authOwner],deleteRole)


export default router