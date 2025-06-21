import { IoShareSocial } from "react-icons/io5";
import { FiHome, FiUsers } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/user_reducer";
import Hamburger from "hamburger-react";
import { removeSkeleton } from "../../utility/removeSkeleton";

import "./navbar.scss"


export default function Navbar({ mobileAside, setMobileAside }) {
  const { loggedUser } = useSelector(userSelector);
  const { pathname } = useLocation();

  return (
    <nav>
      <h1 className="nav-left-container">
        <IoShareSocial color="#12d877" />
        <Link to="/">Hangouts</Link>
      </h1>
      <div className="nav-mid-container">
        <Link to="/" className={`${pathname == "/" ? "active" : null}`}>
          <FiHome size={25} />
        </Link>
        <Link
          to="/find-friend"
          className={`${pathname == "/find-friend" ? "active" : null}`}
        >
          <FiUsers size={25} />
        </Link>
        <Link className="store" to="/store">
          <MdOutlineLocalGroceryStore size={25} />
        </Link>
        <Link
          to={"/chatlist"}
          className={`${pathname == "/chatlist" ? "active" : null} chats`}
        >
          <FaRegMessage size={25} />
        </Link>
        <Link to={"/groups"}>
          <HiOutlineUserGroup size={25} />
        </Link>
      </div>
      <div className="nav-right-container">
        <div>
          <FaRegBell size={25} />
        </div>
        <div>
          <Link to={"/chatlist"}>
            <FaRegMessage size={25} />
          </Link>
        </div>
        <Link to={`/profile/${loggedUser._id}`}>
          <div className={"nav-profile loading"}>
            <img src={loggedUser.avatarUrl} onLoad={removeSkeleton} alt="logo" />
          </div>
        </Link>
        <div className="nav-burger-menu">
          <span>
            <Hamburger toggled={mobileAside} toggle={setMobileAside} />
          </span>
          {/* <NavRightCont_M mobileNavRight={mobileAside} setMobileNavRight={setMobileAside} /> */}
        </div>
      </div>
    </nav>
  );
}
