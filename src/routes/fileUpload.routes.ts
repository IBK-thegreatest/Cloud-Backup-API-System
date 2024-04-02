import express, { Router } from "express"
import { upload } from "../services/fileUpload.services"
import { downloadFile, updateSafeFile, uploadFile } from "../controllers/fileUpload.controller"
import { verifyAdmin, verifyToken, verifyUser } from "../middlewares/auth.middleware"
const router: Router = express.Router()

//UPLOAD A FILE
router.post("/:id/upload", verifyUser, upload.single("image"), uploadFile)

//DOWNLOAD A FILE
router.get("/:id/download/:fileId", verifyUser, downloadFile)

//MARKING A FILE AS UNSAFE AND AUTOMATICALLY DELETING IT
router.put("/:id/:fileId", verifyUser, verifyAdmin, updateSafeFile)


export default router