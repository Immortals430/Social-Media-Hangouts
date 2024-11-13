import { Chat } from "./chat_schema.js";
import { Message } from "./message_schema.js";

export default class ChatRepository {
  async getAllChat(friendId, userId, skip, limit) {
    const room = await Chat.findOne({ users: { $all: [userId, friendId] } });
    if (room && room.id) {
      const chats = await Message.find({ chatId: room.id })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .select("-seenBy -chatId");

      return chats;
    } else return [];
  }

  async updateRead(userId, friendId) {
    const room = await Chat.findOne({ users: { $all: [userId, friendId] } });
    if (room) {
      await Message.findByIdAndUpdate(
        { _id: room.lastMessage },
        { $addToSet: { seenBy: userId } },
        { returnDocument: "after" }
      );
    }
  }

  async updateRead(userId) {
    const chatList = await Chat.find({ users: { $in: userId } }).populate([
      { path: "users", select: "username avatarUrl" },
      { path: "lastMessage", select: "content" },
    ]);

    return chatList
  }
}
