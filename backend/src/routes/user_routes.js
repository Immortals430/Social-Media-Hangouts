import express from "express"
export const userRouter = express.Router()
import { signup, signin, getUser, updateUser, sendOtp, googleLogin, changePassword } from "../controller/user_controller.js"
import {jwtAuth} from "../../config/jwt_middleware.js"
import multer from "multer"
const upload = multer()


userRouter.post('/signup', signup)
userRouter.post('/signin', signin)
userRouter.post('/google-login', googleLogin)
userRouter.get('/get-user/', jwtAuth, getUser)
userRouter.put('/update-user/', jwtAuth, upload.single('avatar'), updateUser)
userRouter.post('/send-otp', sendOtp)
userRouter.post('/change-password', changePassword)

