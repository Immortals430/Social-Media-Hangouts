import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
let groupsSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "image-user.jpg",
  },
  avatarUrl: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/hangouts-41e52.appspot.com/o/avatar%2Fimage-user.jpg?alt=media&token=a27415bd-57f2-4522-a100-676301952c90",
  },
  totalMembers: {
    type: Number,
    default: 1,
  },
  members: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      }],
    validate: {
      validator: val => val.length <= 20,
      message: "Group reached max limit",
    },
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

//Export the model
export const Groups = model("groups", groupsSchema);
