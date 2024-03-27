import multer from "multer"
import path from "path"
import { RequestWithId } from "../interfaces/auth.interface"
import { FileData } from "../interfaces/file.interface"
import FileModel from "../models/File"
import HttpException from "../exceptions/Httpexception"

const storage = multer.diskStorage({   //Outlining the file specifications
    destination: (req: RequestWithId, file, cb) => {
        cb(null, "images")
    },
    filename: (req: RequestWithId, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})
export const upload = multer({         //Initializing the upload of the file
    storage: storage,
    limits: { fileSize: 200 * 1024 * 1024 }
})

export const createFileService = async (userId: string, fileMetadata: FileData): Promise<FileData> => {
    const fileData = {
        userId: userId,
        fileName: fileMetadata.fileName,
        filePath: fileMetadata.filePath,
        fileSize: fileMetadata.fileSize,
        isSafe: fileMetadata.isSafe
    }
    const newFile = new FileModel(fileData)
    const createNewFile = await newFile.save();
    return createNewFile
}

export const fileDownloadService = async (fileId: string): Promise<string> => {
    const file = await FileModel.findById(fileId)
    if(!file) throw new HttpException(404, "This file does not exist")

    return file.filePath
}