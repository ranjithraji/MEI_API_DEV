import express from "express"
import {createMenu, deletemenu, getAll, getmenu, menuTable, updatemenu} from "../controller/menuController.js"
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/create_menu",createMenu)
router.get("/view_menu/:id",getmenu)
router.get("/getallMenu",getAll)
router.put("/update_menu/:id",updatemenu)
router.delete("/delete_menu",deletemenu)
router.get("/menutable",menuTable)


export default router