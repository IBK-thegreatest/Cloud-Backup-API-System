import UserModel from "../models/User";
import { FileData } from "../interfaces/file.interface";
import HttpException from "../exceptions/Httpexception";
import FileModel from "../models/File";

export const userFileHistoryService = async (userId: string): Promise<FileData[]> => {
    const user = await UserModel.findById(userId)
    if(!user) throw new HttpException(404, "This user does not exist")

    const files = await FileModel.find({ userId: userId })
    if(files.length === 0) throw new HttpException(404, "This user doesn't have any files yet")
    return files
}