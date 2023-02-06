import express from "express"
import {createMenu, deletemenu, getmenu, menuName, menuTable, updatemenu} from "../controller/menuController.js"
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/create_menu",createMenu)
router.get("/view_menu/:id",getmenu)
router.put("/update_menu/:id",updatemenu)
router.delete("/delete_menu",deletemenu)
router.get("/menutable",menuTable)
router.get("/menuName",menuName)


export default router