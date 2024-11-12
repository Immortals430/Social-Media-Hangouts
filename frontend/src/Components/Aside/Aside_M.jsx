import React from "react";
import { userSelector, logout } from "../../redux/reducers/user_reducer";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { FiHome, FiUsers } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { SiYoutubeshorts } from "react-icons/si";


export default function Aside_M({ mobileAside, setMobileAside }) {
  const { loggedUser } = useSelector(userSelector);
  const dispatch = useDispatch()
  return (
    <main className={`aside-m ${mobileAside && "active"}`}>
      <div>
        <Link to={`/profile/${loggedUser._id}`} onClick={() => setMobileAside(false)}>
          <div>
            <span
              className="profile"
              style={{ backgroundImage: `url(${loggedUser.avatarUrl})` }}
            ></span>
            <span>Profile</span>
          </div>
        </Link>
        <Link to="/" onClick={() => setMobileAside(false)}>
          <div>
            <span className="home">
              <FiHome size={20} />
            </span>
            <span>News Feed</span>
          </div>
        </Link>
        <Link>
          <div>
            <span className="reels">
              <SiYoutubeshorts size={25} />
            </span>
            <span>Reels</span>
          </div>
        </Link>
        <Link to="/find-friend" onClick={() => setMobileAside(false)}>
          <div>
            <span className="users">
              <FiUsers size={20} />
            </span>
            <span>Find Friend</span>
          </div>
        </Link>
        <Link>
          <div>
            <span className="store">
              <MdOutlineLocalGroceryStore size={20} />
            </span>
            <span>Store</span>
          </div>
        </Link>
        <Link>
          <div>
            <span className="groups">
              <HiOutlineUserGroup size={20} />
            </span>
            <span>Groups</span>
          </div>
        </Link>
        <Link to={"/chatlist"} onClick={() => setMobileAside(false)}>
          <div>
            <span className="chats">
              <FaRegMessage size={25} />
            </span>
            <span>Chats</span>
          </div>
        </Link>
        <Link to="/settings" onClick={() => setMobileAside(false)}>
          <div>
            <span className="settings">
              <FiSettings size={28} />
            </span>
            <span>
              <b>Settings</b>
            </span>
          </div>
        </Link>
        <a
          href="https://www.linkedin.com/in/vishal-kumar-788326273/"
          target="_blank"
        >
          <div>
            <span className="linkedin">
              <FaLinkedinIn size={28} />
            </span>
            <span>Linked In</span>
          </div>
        </a>
        <a href="https://github.com/Immortals430" target="_blank">
          <div>
            <span className="github">
              <FaGithub size={28} />
            </span>
            <span>Github</span>
          </div>
        </a>

        <Link>
          <div>
            <span className="notification">
              <FaRegBell size={25} />
            </span>
            <span>Notification</span>
          </div>
        </Link>
        <a href="/" onClick={() => dispatch(logout())}>
          <div>
            <span className="logout">
              <IoLogOutSharp size={28} />
            </span>
            <span>Logout</span>
          </div>
        </a>
      </div>
    </main>
  );
}
