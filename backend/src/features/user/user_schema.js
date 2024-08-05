import { model, Schema } from "mongoose";

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
      default: "image-user.svg",
    },
    avatarUrl: {
      type: String,
      default: "https://firebasestorage.googleapis.com/v0/b/hangouts-41e52.appspot.com/o/avatar%2Favatar-user.svg?alt=media&token=d2342dff-a86b-4b3b-9f79-d1a3b7888e31"
    },
    status: {
      type: String,
      enum: ['single', 'married', 'divorced', 'dating']
    },
    cover:{
      type: String,
      default: "image-user.svg",
    },
    coverUrl:{
      type: String
    },

    phone: String,
    location: String,
    hobbies: String,
    createdAt: {
      type: Date,
      select: false,
    },
    updatedAt: {
      type: Date,
      select: false,
    },

    //   chats: [
    //     {
    //       recepient: String,
    //       chatId: {
    //         type: Schema.Types.ObjectId,
    //         ref: "chats",
    //       },
    //     },
    //   ],
  },
  { timestamps: true }
);

export const User = model("users", userSchema);
