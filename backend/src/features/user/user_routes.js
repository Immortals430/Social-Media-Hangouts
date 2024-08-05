import express from "express";
const userRouter = express.Router();
import UserController from "./user_controller.js";
import { jwtAuth } from "../../middlewares/jwt_middleware.js";
import multer from "multer";
import verifyToken from "../../middlewares/google_auth_library.js";
const userController = new UserController();
const upload = multer();

userRouter.post("/signup", (req, res, next) =>
  userController.signup(req, res, next)
);
userRouter.get("/confirm-signup/:id", (req, res, next) =>
  userController.confirmSignup(req, res, next)
);
userRouter.post("/signin", (req, res, next) =>
  userController.signin(req, res, next)
);
userRouter.post("/google-login", verifyToken, (req, res, next) =>
  userController.googleLogin(req, res, next)
);

userRouter.get(
  "/get-user/:id",
  /* jwtAuth, */ (req, res, next) => userController.getUser(req, res, next)
);

userRouter.get("/get-login-status/:jwtToken", (req, res, next) =>
  userController.getLoggedInStatus(req, res, next)
);

userRouter.get("/get-friend-suggestion/", jwtAuth, (req, res, next) =>
  userController.getFriendSuggestion(req, res, next)
);
userRouter.put(
  "/update-user/",
  jwtAuth,
  // upload.single("avatar"),
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
  ]),
  (req, res, next) => userController.updateUser(req, res, next)
);
userRouter.post("/send-otp", (req, res, next) =>
  userController.sendOtp(req, res, next)
);
userRouter.post("/change-password", (req, res, next) =>
  userController.changePassword(req, res, next)
);

export default userRouter;
