import express from "express"
import Menu from "../controller/menuController.js"
import auth from "../middleware/auth.js";
import authOwner from "../middleware/owner.js";
const router = express.Router();

router.post("/create_menu",[auth,authOwner],Menu.createMenu)
router.get("/view_menu",[auth,authOwner],Menu.getmenu)
router.put("/update_menu/:id",[auth,authOwner],Menu.updatemenu)
router.delete("/delete_menu",[auth,authOwner],Menu.deletemenu)


export default router