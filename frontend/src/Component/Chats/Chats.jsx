import { useEffect, useRef } from "react";
import "./Chats.css"
import { RxCross2 } from "react-icons/rx";
import { socket } from "../../configs/socket";
import { useDispatch, useSelector } from "react-redux";
import { SET_CHAT_UPDATE, chatSelector, fetchChats } from "../../redux/reducers/chat_reducer";
import { userSelector } from "../../redux/reducers/user_reducer";
import { SET_RESET } from "../../redux/reducers/chat_reducer";

export default function Chats() {

  let message = useRef()
  const dispatch = useDispatch()
  const {user, chats} = useSelector(chatSelector)
  const {loggedUser, userAvatar}  = useSelector(userSelector)


  // get chat history of user
  useEffect(() => {
    if(user._id) dispatch(fetchChats(user._id))    
  }, [user])


  // send message
  function sendMsg(e){
    e.preventDefault()
    const msg = message.current.value
    socket.emit('msg', {msg, user: user._id, loggedUser: loggedUser._id})
    message.current.value = ''
    dispatch(SET_CHAT_UPDATE({msg, messenger: loggedUser._id}))
  }

  return (

    <section className="chats-container flex">
        <div className="flex v-center msg-head">
            <div className="userDp msg-head-dp" style={{backgroundImage: `url(${userAvatar[user._id]})`}}></div>
            <h4 className="msg-head-name">{user.username}</h4>
            <RxCross2 onClick={() => dispatch(SET_RESET(user._id))} />
        </div>

        <div className="msg-container flex ">
            {chats.map((obj, i) => (
                obj.messenger == loggedUser._id ? 
                <p className="sent-msg" key={i}>{obj.msg}</p> :
                <p className="rec-msg" key={i}>{obj.msg}</p>
              ))}

        </div>

        <form className="msg-form flex" onSubmit={sendMsg}>
            <textarea ref={message}></textarea>
            <input type="submit" />
        </form>
    </section>

  )
}
