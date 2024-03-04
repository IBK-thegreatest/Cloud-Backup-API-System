import UserModel from "../models/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Login, Register, User } from "../interfaces/user.interface";
import HttpException from "../exceptions/Httpexception";
import { emailValidator, schema } from "../middlewares/validation.middleware";
import { DataStoredInToken } from "../interfaces/auth.interface";

//REGISTER A USER
export const registerService = async (userData: Register): Promise<Register> => {
    const ifAlreadyExists = await UserModel.findOne({ email: userData.email })
    if(ifAlreadyExists) throw new HttpException(409, "This User Already Exists")

    const salt = await bcrypt.genSalt(10)
    const hashedPasssword = await bcrypt.hash(userData.password, salt)
    const data = {
        username: userData.username,
        email: userData.email,
        password: hashedPasssword,
        isAdmin: userData.isAdmin
    }
    if(userData.username.length < 6) {
        throw new HttpException(403, "Username must be at least 6 characters long")
    } else if (!emailValidator.validate(userData.email)) {
        throw new HttpException(403, "Invalid Email Address, email address has to be in the format foo@bar.com")
    } else if (!schema.validate(userData.password)) {
        throw new HttpException(403, "Invalid Password, Password must contain an uppercase letter, lowercase letter, no whitespaces and at least 2 digits")
    } else {
        const newUser = new UserModel(data)
        const savedUser = await newUser.save()
        return savedUser
    }
}

//LOGIN AN EXISTING USER
export const loginService = async (userData: Login): Promise<User> => {
    const user = await UserModel.findOne({ email: userData.email })
    if(!user) throw new HttpException(404, "User Not Found!!!")

    const isPasswordCorrect =  await bcrypt.compare(userData.password, user.password)
    if(!isPasswordCorrect) throw new HttpException(403, "Username and password don't match")

    const dataStoredInToken: DataStoredInToken = {
        id: user._id,
        isAdmin: user.isAdmin
    }
    const accessToken = jwt.sign(dataStoredInToken, process.env.JWT_SEC, { expiresIn: "24h" })
    const loginData: User = {
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        token: accessToken
    }
    return loginData
}