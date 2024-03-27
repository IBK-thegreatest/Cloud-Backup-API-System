import express, { Router } from "express"
import { upload } from "../services/fileUpload.services"
import { downloadFile, uploadFile } from "../controllers/fileUpload.controller"
import { verifyToken, verifyUser } from "../middlewares/auth.middleware"
const router: Router = express.Router()

//UPLOAD A FILE
router.post("/:id/upload", verifyUser, upload.single("image"), uploadFile)

//DOWNLOAD A FILE
router.get("/:id/download/:fileId", verifyUser, downloadFile)


export default router