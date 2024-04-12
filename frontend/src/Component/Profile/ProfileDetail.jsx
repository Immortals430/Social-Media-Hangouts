import "./Profile.css"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile, userSelector } from "../../redux/reducers/user_reducer"
import { FaEdit } from "react-icons/fa";
import { SET_PATH } from "../../redux/reducers/navigation_reducer";


export default function ProfileDetail() {
    
    const { loggedUser, loggedUserAvatar } = useSelector(userSelector)
    const dispatch = useDispatch()

    async function upload(event){
        const file = event.target.files[0];
        const form =  new FormData()
        form.append('avatar', file)
        dispatch(updateProfile(form))    
    }


    return (
        <section className="userDetail">
            <div className="edit"><FaEdit onClick={() => dispatch(SET_PATH('setting'))}/></div>
            
            <div>
                <div className="dp userDp" style={{backgroundImage: `url(${loggedUserAvatar})`}}>
                <form >
                    <input type="file" onChange={upload} title="Click to Upload" />
                </form>   
                </div>
                <h3 className="profile-username">{loggedUser.username}</h3>
            </div>

            <div className="about flex">
                <div>Lives in: <b>{loggedUser.livesIn}</b></div>
                <div>From: <b>{loggedUser.from}</b></div>
                <div>Status: <b>{loggedUser.status}</b></div>
                <div>Phone No.: <b>{loggedUser.phone}</b></div>
                <div>Email: <b>{loggedUser.email}</b></div>
                <div>Hobbies: <b>{loggedUser.hobbies}</b></div>
            </div>
 
        </section>
        
    )
}
