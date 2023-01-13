import express from "express";
import { createEducation,getAll,getById,updateEducation} from "../controller/educationController.js";

 import auth from "../middleware/auth.js";
// import authOwner from "../middleware/owner.js";

const router = express.Router();

router.post("/edu/create/:id",createEducation)
router.put("/edu/update/:id",updateEducation)
router.get("/edu/getAll",getAll)
router.get("/edu/getbyid/:id",getById)

export default router;