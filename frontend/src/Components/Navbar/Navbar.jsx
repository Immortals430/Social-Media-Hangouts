import { IoShareSocial } from "react-icons/io5";
import { FiHome, FiUsers } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/user_reducer";
import Hamburger from "hamburger-react";

export default function Navbar({ mobileAside, setMobileAside }) {
  let { loggedUser } = useSelector(userSelector);
  let { pathname } = useLocation();
  const [path, setPath] = useState("");

  useEffect(() => {
    const path = pathname.split("/")[1];
    setPath(path);
  }, [pathname]);

  const activeLink = () => {
    return {
      color: "#0055ff",
      backgroundColor: "#d0e4ff",
    };
  };

  return (
    <nav>
      <h1 className="nav-left-container">
        <IoShareSocial color="#12d877" />
        <Link to="/">Hangouts</Link>
      </h1>
      <div className="nav-mid-container">
        <Link to="/" style={path === "" ? activeLink() : null}>
          <FiHome size={25} />
        </Link>
        <Link
          to="/find-friend"
          style={path === "find-friend" ? activeLink() : null}
        >
          <FiUsers size={25} />
        </Link>
        <Link style={path == "/" ? activeLink() : null} className="store">
          <MdOutlineLocalGroceryStore size={25} />
        </Link>
        <Link
          to={"/chatlist"}
          style={path == "/chatlist" ? activeLink() : null}
          className="chats"
        >
          <FaRegMessage size={25} />
        </Link>
        <Link style={path == "/" ? activeLink() : null}>
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
          <div
            className="nav-profile"
            style={{ backgroundImage: `url(${loggedUser.avatarUrl})` }}
          ></div>
          {/* <FaUserCircle size={25} /> */}
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
