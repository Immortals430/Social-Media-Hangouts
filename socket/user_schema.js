import { model, Schema } from "mongoose";

// Declare the Schema of the Mongo model
let userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select: false  // restrict to include when querying this field
    },
    avatar: {
        type: String,
        default: "avatar-user.svg"
    },
    status: String,
    phone: String,
    from: String,
    livesIn: String,
    hobbies: String,
    otp: String,
    friendRequest: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    post: [{

        type: Schema.Types.ObjectId,
        ref: "posts"
     }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    chats: [{
        recepient: String,
        chatId: {
            type: Schema.Types.ObjectId,
            ref: "chats"
        }
    }]
    
});

//Export the model
export const User = model('users', userSchema);
