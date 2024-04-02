import express, { Router } from "express"
import { verifyUser } from "../middlewares/auth.middleware"
import { userFileHistory } from "../controllers/fileHistory.controller"
const router: Router = express.Router()

//GET USER FILE HISTORY
router.get("/:id", verifyUser, userFileHistory)


export default router