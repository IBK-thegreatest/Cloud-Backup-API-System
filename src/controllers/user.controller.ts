import { Response, NextFunction } from "express"
import { RequestWithId } from "../interfaces/auth.interface"
import { deleteUserService, getAllUserService, getUserService, updateUserService } from "../services/user.services"

//GET ALL USERS
export const getAllUsers = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await getAllUserService()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

//GET A PARTICULAR USER
export const getUser = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const user = await getUserService(userId)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

//UPDATE A PARTICULAR USER
export const updateUser = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const userData = req.body
        const updatedData = await updateUserService(userId, userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "User Information has been updated successfully",
            data: updatedData
        })
    } catch (error) {
        next(error)
    }
}

//DELETE A PARTICULAR USER
export const deleteUser = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        await deleteUserService(userId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "User Information has been successfully deleted"
                })
            })
    } catch (error) {
        next(error)
    }
}