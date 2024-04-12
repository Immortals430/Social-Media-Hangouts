import "./Profile.css"
import { useRef } from "react"
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/user_reducer";
import { uploadPost } from "../../redux/reducers/post_reducer";
import { SET_PATH } from "../../redux/reducers/navigation_reducer";
import { useNavigate } from "react-router-dom";

export default function Upload() {
    const { loggedUser } = useSelector(userSelector)
    const fileRef = useRef()
    const captionRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function upload(event){
        event.preventDefault()
        const form = {
          caption: event.target.caption.value,
          image: fileRef.current.files[0],
          date: new Date().toLocaleDateString('en-GB'),
          id: loggedUser.id
        }
    
        dispatch(uploadPost(form))
        dispatch(SET_PATH(''))
        window.alert("Your photo will be uploaded soon")
        navigate("/")
    }

    return (
        <section className='mask flex v-center h-center'>
            <div className="upload-container">
            <form className="upload-post flex" onSubmit={upload}>
                <h2>Create your Post</h2>
                <p>*Max 3mb*</p>
                <input type="file" name="file" ref={fileRef} id="photo"/>
                <textarea name="caption" ref={captionRef} ></textarea>
                <input type="submit" /> 
            </form> 
            <div className="close"><IoIosClose size={32} onClick={() => dispatch(SET_PATH(''))} /></div>
            </div>
        </section>
    )
}
