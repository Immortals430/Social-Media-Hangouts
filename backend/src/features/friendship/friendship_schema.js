import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
let friendshipSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    friend: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    status: {
        type: String,
        enum: ['accepted', 'blocked', 'pending']
    }

});

//Export the model
export const Friendship = model('friendships', friendshipSchema);
