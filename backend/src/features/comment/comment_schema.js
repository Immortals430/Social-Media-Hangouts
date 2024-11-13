import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
let commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "posts"
    }
});

//Export the model
export const Comment = model('comments', commentSchema);
