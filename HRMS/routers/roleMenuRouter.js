import express from "express";
import { create, update,getById, deleteRoleMenu, getAll} from "../controller/roleMenuController.js";

const router = express.Router();

router.post("/v2/create",create)
router.put("/v2/update/:id",update)
router.get("/v2/getById/:id",getById)
router.delete("/v2/remove/:id",deleteRoleMenu)
router.get("/v2/getAll",getAll)

export default router