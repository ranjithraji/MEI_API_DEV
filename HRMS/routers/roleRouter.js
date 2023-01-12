import express from "express"
import Role from "../controller/roleController.js"
import auth from "../middleware/auth.js";
import authOwner from "../middleware/owner.js";
const router = express.Router();

router.post("/create_role",[auth,authOwner],Role.createRole)
router.get("/view_role",[auth,authOwner],Role.getRole)
router.put("/update_role/:id",[auth,authOwner],Role.updateRole)
router.delete("/delete_role",[auth,authOwner],Role.deleteRole)


export default router