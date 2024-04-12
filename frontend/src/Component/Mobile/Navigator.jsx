import "./Mobile.css"
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { SET_PATH } from "../../redux/reducers/navigation_reducer";


export default function Navigator() {
    
    const dispatch = useDispatch()

    return (
            <section className="navigator flex">
                <div className="flex v-center">
                    <div className="flex v-center h-center">
                        <Link to="/"  onClick={() => dispatch(SET_PATH("home"))} ><AiFillHome size={26} color="5ac8fa"/></Link>
                    </div>
                </div>

                <div className="flex v-center" onClick={() => dispatch(SET_PATH("friends"))} >
                    <div className="flex v-center h-center">
                        <Link><FaUserFriends size={28} color="blue"/></Link>
                    </div>
                </div>
                <div className="flex v-center" onClick={() => dispatch(SET_PATH("groups"))} >
                    <div className="flex v-center h-center">
                        <Link><HiUserGroup size={28} color="4cd964"/></Link>    
                    </div>
                </div> 
                    
            </section>
    )
}
