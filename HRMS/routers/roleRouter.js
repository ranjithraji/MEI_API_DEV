import express from "express"
import { createRole, deleteRole, getRole, getRoleById, getRoleTable, updateRole } from "../controller/roleController.js"
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/create_role",createRole)
router.get("/getRoleForTable",getRoleTable)
router.get("/view_role",getRole)
router.get("/view_rolebyid/:id",getRoleById)
router.put("/update_role/:id",updateRole)
router.delete("/delete_role",deleteRole)
router.get("/getRoleForTable",getRoleTable)


export default router