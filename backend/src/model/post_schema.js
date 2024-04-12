import { model, Schema } from "mongoose";

// Declare the Schema of the Mongo model
let postSchema = new Schema({
    caption: String,
    image: String,
    date: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "comments"
    }],
    like: [{
        type: Schema.Types.ObjectId,
        ref: "likes"
    }]
});

//Export the model
export const Post = model('posts', postSchema);
