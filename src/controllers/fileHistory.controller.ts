import { Request, Response, NextFunction } from "express";
import { userFileHistoryService } from "../services/fileHistory.services";

export const userFileHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const fileHistory = await userFileHistoryService(userId)
        res.status(200).json(fileHistory)
    } catch (error) {
        next(error)
    }
}