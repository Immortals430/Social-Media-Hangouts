import { TfiLocationPin } from "react-icons/tfi";
import { IoHeart } from "react-icons/io5";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/user_reducer";
import { postSelector } from "../../redux/reducers/post_reducer";
import "./profile.scss"


export default function About({activeComp}) {
  const { profileUser } = useSelector(userSelector)



  return (
    <section className={`about ${activeComp == "about" ? "active" : null}`}>
      <h2>About</h2>
      <ul>
        <li>
          <div className="about-icons">
            <TfiLocationPin size={20}/>
          </div>
          <div>
            <h3>Lives In</h3>
            <p>{profileUser.location}</p>
          </div>
        </li>

        <li>
        <div className="about-icons">
            <IoHeart size={20}/>
          </div>
          <div>
            <h3>Relationship status</h3>
            <p>{profileUser.status}</p>
          </div>
        </li>

        <li>
        <div className="about-icons">
            <MdOutlinePhoneAndroid size={20}/>
          </div>
          <div>
            <h3>Contact no.</h3>
            <p>{profileUser.phone}</p>
          </div>
        </li>

        <li>
        <div className="about-icons">
            <MdEmail size={20}/>
          </div>
          <div>
            <h3>Email</h3>
            <p>{profileUser.email}</p>
          </div>
        </li>

        <li>
        <div className="about-icons">
            <MdEventAvailable size={20}/>
          </div>
          <div>
            <h3>Hobbies</h3>
            <p>{profileUser.hobbies}</p>
          </div>
        </li>
      </ul>

    </section>
  )
}
