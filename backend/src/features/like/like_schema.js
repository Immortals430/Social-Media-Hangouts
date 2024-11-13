import mongoose from "mongoose";
import { Schema } from "mongoose";

// Declare the Schema of the Mongo model
let likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "posts"
    },
});

//Export the model
export const Like = mongoose.model('likes', likeSchema);
