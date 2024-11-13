import ChatRepository from "./chat_repository.js";
import { Chat } from "./chat_schema.js";
import { Message } from "./message_schema.js";

export default class ChatController {
  constructor() {
    this.chatRepository = new ChatRepository();
  }

  async getAllChat(req, res, next) {

    const { friendId, page } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
      const chats = await this.chatRepository.getAllChat(
        friendId,
        req.user.id,
        skip,
        limit
      );
      res.status(200).json(chats);
    } catch (err) {
      next(err)
      console.log(err);
    }
  }

  async updateRead(req, res, next) {
    try {
      await this.chatRepository.updateRead(req.user.id, req.params.friendId);
      res.status(200).json("message seen successfuly");
    } catch (err) {
      next(err);
    }
  }

  async getChatList(req, res, next){
    try{
      const chatList = await this.chatRepository.updateRead(req.user.id);
      res.status(200).json(chatList)
    }
    catch(err){
      next(err)
    }
  } 
}
