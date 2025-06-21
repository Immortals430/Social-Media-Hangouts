import { FiHome, FiUsers } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userSelector } from "../../redux/reducers/user_reducer";
import { IoLogOutSharp } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { removeSkeleton } from "../../utility/removeSkeleton";
import "./aside.scss"

export default function AsideLeft({ mobileAside, setMobileAside }) {
  const { loggedUser } = useSelector(userSelector);
  const dispatch = useDispatch();


  return (
    <aside className={`left-aside ${mobileAside && "active"}`}>
      <section className="aside-main-sec">
        <Link
          to={`/profile/${loggedUser._id}`}
          className="profile-wrapper"
          onClick={() => setMobileAside(false)}
        >
          <span className="profile loading">
            <img src={loggedUser.avatarUrl} onLoad={removeSkeleton} alt="logo" />
          </span>
          <span>{loggedUser.name}</span>
        </Link>


        <Link to="/" onClick={() => setMobileAside(false)}>
          <span className="home">
            <FiHome size={20} />
          </span>
          <span>Newsfeed</span>
        </Link>

        <Link to="/find-friend" onClick={() => setMobileAside(false)}>
          <span className="users">
            <FiUsers size={20} />
          </span>
          <span>Find Friends</span>
        </Link>

        <Link to="/groups" onClick={() => setMobileAside(false)}>
          <span className="groups-btn">
            <HiOutlineUserGroup size={20} />
          </span>
          <span>Groups</span>
        </Link>
        <Link to="/store" onClick={() => setMobileAside(false)}>
          <span className="store-btn">
            <MdOutlineLocalGroceryStore size={20} />
          </span>
          <span>Nearby Store</span>
        </Link>
      </section>
      <section className="aside-author-sec">
        <div className="aside-sec-header">Founder Profiles</div>
        <div>
          <span className="linkedin">
            <FaLinkedinIn size={28} />
          </span>
          <span>
            <a
              href="https://www.linkedin.com/in/vishal-kumar-788326273/"
              target="_blank"
            >
              Linked In
            </a>
          </span>
        </div>
        <div>
          <span className="github">
            <FaGithub size={28} />
          </span>
          <span>
            <a href="https://github.com/Immortals430" target="_blank">
              Github
            </a>
          </span>
        </div>
      </section>
      <section className="aside-extra-sec">
        <Link to="/settings" onClick={() => setMobileAside(false)}>
          <span className="setting">
            <FiSettings size={28} />
          </span>
          <span>
            <b>Settings</b>
          </span>
        </Link>
        <a href="/" onClick={() => dispatch(logout())}>
          <span className="logout">
            <IoLogOutSharp size={28} />
          </span>
          <span>
            <b>Logout</b>
          </span>
        </a>
      </section>
    </aside>
  );
}
