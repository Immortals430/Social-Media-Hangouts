import { IoIosClose } from "react-icons/io";
import { SET_PATH } from "../../redux/reducers/navigation_reducer";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/reducers/user_reducer";

export default function Settings() {
    const dispatch = useDispatch();

    function upload(event){
        event.preventDefault()

        const data = {
            username: event.target.username.value,
            livesIn: event.target.livesIn.value,
            from: event.target.from.value,
            status: event.target.status.value,
            phone: event.target.phone.value,
            hobbies: event.target.hobbies.value,  
        }
        dispatch(updateProfile(data))   
        dispatch(SET_PATH(''))
       
    }

    return (
        <section className='mask flex v-center h-center'>
            <div className="upload-container">
            <form className="upload-post flex" onSubmit={upload}>
                <h2>Update Profile</h2>
                <div className="flex update-container" >
                    <div className="flex">
                        <span><b>Username</b></span>
                        <input name="username" />
                    </div>
                    <div className="flex">
                        <span><b>Lives In</b></span>
                        <input name="livesIn" />
                    </div>
                    <div className="flex">
                        <span><b>From</b></span>
                        <input name="from" />
                    </div>
                    <div className="flex">
                        <span><b>Status</b></span>
                        <select name="status">
                            <option value="Single">Single</option>
                            <option value="In Relationship">In Relationship</option>
                            <option value="Married">Married</option>
                        </select>
                    </div>
                    <div className="flex">
                        <span><b>Phone No.</b></span>
                        <input name="phone" />
                    </div>
                    <div className="flex">
                        <span><b>Hobbies</b></span>
                        <input name="hobbies" />
                    </div>

                </div>
   
                <input type="submit" value="Update" /> 
            </form> 
            <div className="close"><IoIosClose size={32} onClick={() => dispatch(SET_PATH(''))} /></div>
            </div>
        </section>
    )
}
