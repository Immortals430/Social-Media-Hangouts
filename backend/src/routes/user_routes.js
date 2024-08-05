import express from "express";
export const userRouter = express.Router();
import {
  signup,
  signin,
  getUser,
  updateUser,
  sendOtp,
  googleLogin,
  changePassword,
  confirmAccount,
} from "../../controller/user_controller.js";
import { jwtAuth } from "../../middlewares/jwt_middleware.js";
import multer from "multer";
const upload = multer();

userRouter.post("/signup", (req, res) => signup(req, res));
userRouter.get("/confirm-account", (req, res) => confirmAccount(req, res));
userRouter.post("/signin", (req, res) => signin(req, res));
userRouter.post("/google-login", (req, res) => googleLogin(req, res));
userRouter.get("/get-user/", jwtAuth, (req, res) => getUser(req, res));
userRouter.put("/update-user/", jwtAuth, upload.single("avatar"), (req, res) =>
  updateUser(req, res)
);
userRouter.post("/send-otp", (req, res) => sendOtp(req, res));
userRouter.post("/change-password", (req, res) => changePassword(req, res));
