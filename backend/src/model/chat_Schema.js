import mongoose from "mongoose";
import { Schema } from "mongoose";

// Declare the Schema of the Mongo model
let chatSchema = new Schema({
    chats:[Object]
});

//Export the model
export const Chat = mongoose.model('chats', chatSchema);
