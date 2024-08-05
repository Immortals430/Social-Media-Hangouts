import { FiHome, FiUsers } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userSelector } from "../../redux/reducers/user_reducer";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";

export default function AsideLeft() {
  const { loggedUser } = useSelector(userSelector);
  const dispatch = useDispatch();

  return (
    <aside className="left-aside">
      <section className="aside-main-sec">
        <Link to={`/profile/${loggedUser._id}`} className="profile-wrapper">
          <span
            className="profile"
            style={{ backgroundImage: `url(${loggedUser.avatarUrl})` }}
          ></span>
          <span>{loggedUser.username}</span>
        </Link>
        {/* <div> */}
        <Link to="/">
          <span className="home">
            <FiHome size={20} />
          </span>
          <span>Newsfeed</span>
        </Link>
        {/* </div> */}
        {/* <div> */}
        <Link to="/find-friend">
          <span className="users">
            <FiUsers size={20} />
          </span>
          <span>Find Friends</span>
        </Link>
        {/* </div> */}
        <div>
          {/* <Link> */}
          <span className="groups">
            <HiOutlineUserGroup size={20} />
          </span>
          <span>Groups</span>
          {/* </Link> */}
        </div>
        <div>
          {/* <Link> */}
          <span className="store">
            <MdOutlineLocalGroceryStore size={20} />
          </span>
          <span>Nearby Store</span>
          {/* </Link> */}
        </div>
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
        <Link to="/settings">
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