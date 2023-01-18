import { currentCompany, currentCompanyUpdate, currentCompanyView } from "../controller/currentComController.js"

router.post("/v2/addCurrentCompany", [auth, authz], currentCompany)
router.get("/v2/viewCurrentCompany", [auth, authz], currentCompanyView)
router.put("/v2/updateCurrentCompany", [auth, authz], currentCompanyUpdate)

export default router   