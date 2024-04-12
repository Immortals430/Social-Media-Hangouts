import "./Home.css"
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/user_reducer";
import { SET_PATH } from "../../redux/reducers/navigation_reducer";


export default function Aside() {
    
    const dispatch = useDispatch()
    const { loggedUserAvatar } = useSelector(userSelector)

    return (

        <section className="leftSec">
            <div className="flex v-center">
                 <div style={{backgroundImage: `url(${loggedUserAvatar})`}} className="userDp logo"></div> 
                <a href={"/profile"} >Profile</a>
            </div>
            <div className="flex v-center">
                <div className="flex v-center h-center">
                    <AiFillHome size={26} color="5ac8fa"/>
                </div>
                <Link to="/" onClick={() => dispatch(SET_PATH("home"))} >Home</Link>
            </div>

            <div className="flex v-center" onClick={() => dispatch(SET_PATH("friends"))} >
                <div className="flex v-center h-center">
                    <FaUserFriends size={28} color="blue"/>
                </div>
                <Link>Find Friend</Link>
            </div>
            <div className="flex v-center" onClick={() => dispatch(SET_PATH("groups"))} >
                <div className="flex v-center h-center">
                    <HiUserGroup size={28} color="4cd964"/>    
                </div>
                <Link>Groups</Link>
            </div> 
                
        </section>

  )
}
