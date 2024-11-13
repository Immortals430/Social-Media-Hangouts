import { model, Schema } from "mongoose";

// Declare the Schema of the Mongo model
let messageSchema = new Schema({
  // message: "String"
  chatId: {
    type: Schema.Types.ObjectId,
    ref: "chats",
    // required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    // ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  seenBy: [{
    type: Schema.Types.ObjectId,
    // ref: "User"
  }],

  timestamp: { type: Date, default: Date.now },
});

//Export the model
export const Message = model("messages", messageSchema);
