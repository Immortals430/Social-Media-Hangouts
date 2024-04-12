import { useDispatch, useSelector } from "react-redux"
import "./Home.css"
import {unfriend, userSelector} from "../../redux/reducers/user_reducer"
import { GiConfirmed } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { respondReq } from "../../redux/reducers/user_reducer";
import { MdPersonOff } from "react-icons/md";
import { SET_USER, chatSelector } from "../../redux/reducers/chat_reducer";
import { MdOutlineMarkEmailUnread } from "react-icons/md";


export default function Contacts() {

    const { loggedUser } = useSelector(userSelector)
    const { user, unreadMsg, onlineUsers } = useSelector(chatSelector)
    const dispatch = useDispatch()

    // respond to frnd req
    function respond(_id, respond){
        dispatch(respondReq({friendId: _id, respond}))
    }
    // start chat
    function startChat(user){    
        dispatch(SET_USER(user))
    }

    return (
        <section className="contact-container">
            <div >
                <h4>Friends</h4>
                <div className="frnd-containe">
                {loggedUser.friends.map(( value, i ) => (
                    <div key={i} className="flex v-center frnd" >
                        <div><span onClick={() => startChat(value)}>{value.username}</span></div>
                        <div className="flex v-center">
                            <span><MdPersonOff onClick={() => dispatch(unfriend(value._id))} color="#ce2c53" /></span>
                            { user._id || !unreadMsg.includes(value._id) ? null 
                            : <span><MdOutlineMarkEmailUnread color="blue" onClick={() => startChat(value)} className="delete" /></span>}
                            { onlineUsers.includes(value._id) ?  <div className="online-logo"></div> : null}
                            
                            
                        </div>
                    </div>
                ))}
                </div>
     
            </div>
            <hr />
            <br />
            <div >
                <h4>Friend Request</h4>
                <div className="frnd-container">
                {loggedUser.friendRequest.map(( value, i ) => (
                
                    <div key={i} className="frnd flex v-center" >
                        <div>{value.username}</div>
                        <div className="flex v-center"><GiConfirmed onClick={() => respond(value._id, 'accept')} /></div>
                        <div className="flex v-center"><RxCross2 onClick={() => respond(value._id, 'reject')} /></div>
                    </div>       
                ))}
                </div>
     
            </div>

        </section>
    )
}
