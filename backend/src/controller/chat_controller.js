import { Chat } from "../model/chat_Schema.js"
import { User } from "../model/user_schema.js"

export const getAllChat = async (req, res) => {

    const user = await User.findById(req.user.id)
    const chatId = user.chats.find(value => value.recepient == req.params.friendId)
    if(chatId){
        const {chats} = await Chat.findById(chatId.chatId)
        res.status(200).json({
            data: chats,
        })
    }
    else{
        res.status(200).json({
            data: [],
        })
    }


}