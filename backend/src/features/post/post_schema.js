import { model, Schema } from "mongoose";

let postSchema = new Schema({
  caption: String,
  image: String,
  // date: String,
  url: String,
  uploader: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

//Export the model
export const Post = model("posts", postSchema);
