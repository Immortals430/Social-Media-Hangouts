import "./Mobile.css"
import { useSelector, useDispatch } from 'react-redux'
import {unfriend} from "../../redux/reducers/user_reducer"
import { userSelector } from "../../redux/reducers/user_reducer"
import { MdLogout } from "react-icons/md";
import { MdPersonOff } from "react-icons/md";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { SET_USER, chatSelector } from "../../redux/reducers/chat_reducer";
import { GiConfirmed } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { respondReq } from "../../redux/reducers/user_reducer";
import { logout } from "../../redux/reducers/user_reducer";
import { useRef } from "react";
import { SET_MOBILE_ASIDE, navigateSelector } from "../../redux/reducers/navigation_reducer";
import { RxCross1 } from "react-icons/rx";

export default function MobileAside() {
    const { loggedUser, loggedUserAvatar } = useSelector(userSelector)
    const { user, unreadMsg, onlineUsers } = useSelector(chatSelector)
    const dispatch = useDispatch()
    const {mobileAside} = useSelector(navigateSelector)
    const mobileAsideBar = useRef()
    

    // respond to frnd req
    function respond(_id, respond){
        dispatch(respondReq({friendId: _id, respond}))
    }
    // start chat
    function startChat(user){    
        dispatch(SET_USER(user))
    }

    //logout
    function callLogout(){
        dispatch(logout())
        dispatch(SET_MOBILE_ASIDE(false))
    }



    return (
        <section className='nav-m ' ref={mobileAsideBar} style={mobileAside ? {width: "100vw", minWidth: "260px"} : {width: "0", minWidth: "0"} }>
            <div><p ><RxCross1 onClick={() => dispatch(SET_MOBILE_ASIDE(false)) }/></p></div>
            <div  className='flex'>
                <div className='flex v-center'>

                <div style={{backgroundImage: `url(${loggedUserAvatar})`}} className="userDp logo-m"></div> 
                <a href={"/profile"} >Profile</a>
                </div>
                <div className='flex v-center '>
                <div className='flex h-center v-center logo-m '><MdLogout size={25} /></div>    
                <a onClick={callLogout}>Logout</a>
                </div>
            </div>
            <hr />
            <div className='flex friend-m'>
                <h4>Friends</h4>
                <div className="friendlist-m">
                    {loggedUser.friends.map(( value, i ) => (
                        <div key={i} className="flex v-center" >
                            <span onClick={() => startChat(value)}>{value.username}</span>
                            <div className="flex v-center">
                                <span><MdPersonOff onClick={() => dispatch(unfriend(value._id))} color="#ce2c53" /></span>
                                { user._id || !unreadMsg.includes(value._id) ? null : <MdOutlineMarkEmailUnread color="blue" onClick={() => startChat(value)} className="delete" /> }
                                { onlineUsers.includes(value._id) ?  <div className="online-logo"></div> : null}
                                
                                
                            </div>
                        </div>
                    ))}
                        
                </div>

            </div>
            <hr />
            <div className="flex friend-m">
                <h4>Friend Request</h4>
                <div className="friendlist-m">
                {loggedUser.friendRequest.map(( value, i ) => (
                
                    <div key={i} className="frnd flex v-center" >
                        <div className="frndreq-m-name">{value.username}</div>
                        <div className="flex v-center"><GiConfirmed onClick={() => respond(value._id, 'accept')} color="green"/></div>
                        <div className="flex v-center"><RxCross2 onClick={() => respond(value._id, 'reject')} color="red"/></div>
                    </div>       
                ))}
                </div>
     
            </div>
 
        </section>
    )
}
