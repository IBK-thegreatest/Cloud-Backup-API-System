import { Request } from "express"
export interface DataStoredInToken {
    id: any
    isAdmin: boolean
}

export interface RequestWithId extends Request {
    user: any
}