import express from "express"
import {createMenu, deletemenu, getmenu, updatemenu} from "../controller/menuController.js"
import auth from "../middleware/auth.js";
import authOwner from "../middleware/owner.js";
const router = express.Router();

router.post("/create_menu",[auth,authOwner],createMenu)
router.get("/view_menu",[auth,authOwner],getmenu)
router.put("/update_menu/:id",[auth,authOwner],updatemenu)
router.delete("/delete_menu",[auth,authOwner],deletemenu)


export default router