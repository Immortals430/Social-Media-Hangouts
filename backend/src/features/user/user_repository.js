import { User } from "./user_schema.js";
import { Temp } from "../temp/temp_schema.js";
import { ApplicationError } from "../../middlewares/error_handler.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { createToken } from "../../utils/jwt_sign.js";
import { compressImage } from "../../utils/sharp.js";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Friendship } from "../friendship/friendship_schema.js";
import { randomBytes } from "crypto";

export default class UserRepository {
  async signup(userData) {
    let tempUserData = await Temp.findOne({ email: userData.email });
    if (!tempUserData) {
      tempUserData = await Temp.create(userData);
    } else {
      tempUserData.username = userData.username;
      tempUserData.email = userData.email;
      tempUserData.password = userData.password;
      await tempUserData.save();
    }
    return tempUserData.id;
  }

  async confirmsignup(id) {
    const tempUser = await Temp.findById(id).select("+password");
    if (!tempUser) {
      throw new ApplicationError("confirmation link expired", 410);
    }
    await User.create({
      username: tempUser.username,
      email: tempUser.email,
      password: tempUser.password,
    });
    await tempUser.deleteOne();
  }

  async signin({ email, password }) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ApplicationError("user account does not exist", 404);
    }
    await comparePassword(password, user.password);
    const token = createToken({ id: user.id, email: user.email });
    return { user, token };
  }

  async googleLogin(email, username) {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        username,
        email,
        password: randomBytes(20).toString("hex"),
      });
    }
    const token = createToken({ id: user.id, email: user.email });

    return { user, token };
  }

  async getFriendSuggestion(skip, limit, userId) {
    const friends = await Friendship.find({ friend: userId });
    const reqSentList = await Friendship.find({
      user: userId,
      status: "pending",
    });
    let users = await User.find().skip(skip).limit(limit);

    // if user is friend or user itself
    // dont return that suggestion
    users = users.filter((user) => {
      if (user.id == userId) return false;
      if (friends.length > 0) {
        return !friends.some((frnd) => {
          return user.id == frnd.user;
        });
      } else return true;
    });

    // set reqSent
    users = users.map((user) => {
      const req = reqSentList.find((frnd) => {
        return user.id == frnd.friend;
      });
      if (req) {
        user = user.toObject();
        user.reqSent = true;
      }
      return user;
    });

    return users;
  }

  async updateUser({ username, status, phone, location, hobbies }, id, file) {
    const user = await User.findById(id);

    if (username) user.username = username;
    if (status) user.status = status;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (hobbies) user.hobbies = hobbies;
    // upload profile cover or dp
    if (file) {
      const fieldname = file[0].fieldname;
      const currentDate = Date.now();
      const storage = getStorage();
      const imageSize = fieldname == "avatar" ? 150 : 1280;
      // Delete old photo if not the default one
      if (user[fieldname] !== "image-user.svg") {
        const oldImageRef = ref(storage, `${fieldname}/${user[fieldname]}`);
        await deleteObject(oldImageRef);
      }
      // Process and upload new photo
      const uint8Array = await compressImage(file[0].buffer, imageSize);
      const newAvatarRef = ref(
        storage,
        `${fieldname}/${fieldname}-${user._id}-${currentDate}.jpeg`
      );
      await uploadBytes(newAvatarRef, uint8Array, {
        contentType: "image/jpeg",
      });
      const url = await getDownloadURL(newAvatarRef);

      user[fieldname] = `${fieldname}-${user._id}-${currentDate}.jpeg`;
      user[`${fieldname}Url`] = url;
    }
    await user.save();

    return user;
  }

  async updateOtp(email, otp) {
    await Temp.findOneAndUpdate({ email }, { otp }, { upsert: true });
  }

  async changePassword({ email, password, otp }) {
    let userCredentials = await Temp.findOne({ email });

    if (userCredentials && userCredentials.otp == otp) {
      password = await hashPassword(password, 10);
      await User.findOneAndUpdate({ email }, { password });
      await userCredentials.deleteOne();
    } else {
      throw new ApplicationError("otp does not match", 400);
    }
  }

  async getUser(id) {
    let user = await User.findOne({ _id: id });
    const friend = await Friendship.findOne({ friend: id, status: "pending" });
    if (friend) {
      user = user.toObject();
      user.reqSent = true;
    }
    return user;
  }

  async findUser(obj) {
    return await User.findOne(obj);
  }
}
