import mongoose from "mongoose";
import { Schema } from "mongoose";

// Declare the Schema of the Mongo model
let chatSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    // ref: "User",
    required: true
 }],
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: "messages" }, // Optional: for quick access to the latest message
});

//Export the model
export const Chat = mongoose.model("chats", chatSchema);
