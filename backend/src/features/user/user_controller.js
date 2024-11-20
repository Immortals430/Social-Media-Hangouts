import UserRepository from "./user_repository.js";
import { hashPassword } from "../../utils/bcrypt.js";
import { ApplicationError } from "../../middlewares/error_handler.js";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;
const projectName = process.env.PROJECT_NAME;
import axios from "axios";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(req, res, next) {
    let { email, password, confirmPassword } = req.body;
    try {
      if (password != confirmPassword) {
        throw new ApplicationError("Password must match confirm password", 405);
      }

      let user = await this.userRepository.findUser({ email });
      if (user) {
        throw new ApplicationError(
          "User account already exist with this email address",
          409
        );
      }
      password = await hashPassword(password, next);
      const userid = await this.userRepository.signup({
        ...req.body,
        password,
      });

      await axios.post(`http://${process.env.MAIL_URL}/send-account-creation-link`, {
        email,
        userid,
        domain: process.env.SERVERURL,
      }, { headers: {
        'mail-secret': process.env.MAIL_SECRET,
        'Content-Type': 'application/json'
      }});


      return res.status(201).json({
        success: true,
        message: "A confirmation link will be sent to your email.",
      });
    } catch (err) {
      next(err);
    }
  }

  async confirmSignup(req, res, next) {
    const { id } = req.params;
    try {
      await this.userRepository.confirmsignup(id);

      return res.status(201).json({
        success: true,
        message: "User account created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async signin(req, res, next) {
    try {
      let { user, token } = await this.userRepository.signin(req.body);
      user = user.toObject();
      delete user.password;

      res
        .status(200)
        .cookie(projectName, token, {
          sameSite: "None",
          secure: true,
          expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from current date
        })
        .json({
          success: true,
          message: "Signed in successfully",
          user,
          token: res.getHeaders()["set-cookie"],
        });
    } catch (err) {
      next(err);
    }
  }

  async googleLogin(req, res, next) {
    const email = req.user.emailAddresses[0].value;
    const username = req.user.names[0].displayName;
    try {
      let { user, token } = await this.userRepository.googleLogin(
        email,
        username
      );
      user = user.toObject();
      delete user.password;

      res
        .status(200)
        .cookie(projectName, token, {
          sameSite: "None",
          secure: true,
          expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from current date
        })
        .json({
          success: true,
          message: "Signed in successfully",
          user,
          token: res.getHeaders()["set-cookie"],
        });
    } catch (err) {
      next(err);
    }
  }

  async getFriendSuggestion(req, res, next) {
    try {
      // const { page } = req.query;
      let page = 1;
      const limit = 10;
      const skip = (page - 1) * limit;
      const users = await this.userRepository.getFriendSuggestion(
        skip,
        limit,
        req.user.id
      );
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res, next) {
    try {
      let user = await this.userRepository.getUser(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    const file = req.files.avatar || req.files.cover;
    try {
      const user = await this.userRepository.updateUser(
        req.body,
        req.user.id,
        file
      );
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(next);
    }
  }

  async sendOtp(req, res, next) {
    try {
      const { email } = req.body;
      const user = await this.userRepository.findUser({ email });
      const otp = Math.floor(1000 + Math.random() * 9999);
      if (!user) {
        throw new ApplicationError("User not found", 404);
      }
      await this.userRepository.updateOtp(email, otp);

      await axios.post(`https://${process.env.MAIL_URL}/send-reset-link`, {
        email,
        otp,
      }, { headers: {
        'mail-secret': process.env.MAIL_SECRET,
        'Content-Type': 'application/json'
      }});

      res.status(200).json({
        success: true,
        message: "Otp sent to email",
      });
    } catch (err) {
      next(err);
    }
  }

  async changePassword(req, res, next) {
    try {
      await this.userRepository.changePassword(req.body);

      res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async getLoggedInStatus(req, res, next) {
    const { jwtToken } = req.params;
    try {
      const { id } = jwt.verify(jwtToken, jwtSecret);
      const userData = await this.userRepository.findUser({ _id: id });
      res.status(200).json(userData);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        console.log("Token expired error");
      }
      next(err);
    }
  }
}
