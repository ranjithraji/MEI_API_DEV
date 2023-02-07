import express from "express"
import { createRole, deleteRole, getRole, getRoleById, roleTable, roleTable2, updateRole } from "../controller/roleController.js"
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/create_role",createRole)
router.get("/view_role",getRole)
router.get("/view_byid/:id",getRoleById)
router.put("/update_role/:id",updateRole)
router.delete("/delete_role",deleteRole)
router.get("/roletable",roleTable)
router.get("/roledelete",roleTable2)

export default router