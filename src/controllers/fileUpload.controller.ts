import HttpException from "../exceptions/Httpexception"
import { Response, NextFunction } from "express"
import { RequestWithId } from "interfaces/auth.interface"
import { createFileService, fileDownloadService } from "../services/fileUpload.services"

export const uploadFile = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        if(req.file === undefined) throw new HttpException(400, "No file was uploaded, Please upload a file")
        const userId = req.user.id
        const fileMetadata = {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileSize: req.file.size,
            isSafe: true
        }
        const imageData = await createFileService(userId, fileMetadata)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "File has been Uploaded Successfully and the metadata has been saved",
            data: imageData
        })
    } catch (error) {
        next(error)
    }
}

export const downloadFile = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const fileId = req.params.fileId
        const filePath = await fileDownloadService(fileId)
        res.status(200).download(filePath)
    } catch (error) {
        next(error)
    }
}