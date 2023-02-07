import express from "express"
import {createMenu, deletemenu, getmenu, menuName, menuTable, updatemenu,getAll} from "../controller/menuController.js"
const router = express.Router();

router.post("/create_menu",createMenu)
router.get("/view_menu/:id",getmenu)
router.get("/getallMenu",getAll)
router.put("/update_menu/:id",updatemenu)
router.delete("/delete_menu",deletemenu)
router.get("/menutable",menuTable)
router.get("/menuName",menuName)


export default router