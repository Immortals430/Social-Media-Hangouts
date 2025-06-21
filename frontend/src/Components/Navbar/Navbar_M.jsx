import React from "react";
import { FiHome, FiUsers } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { Link } from "react-router-dom";
import "./navbar.scss"

export default function Navbar_M() {
  return (
    <section className="navbar-m">
      <Link to="/">
        <div>
          <FiHome size={28} />
        </div>
      </Link>
      <Link  to="/find-friend">
        <div>
          <FiUsers size={28} />
        </div>
      </Link>
      <Link to="/store">
        <div>
          <MdOutlineLocalGroceryStore size={28} />
        </div>
      </Link>
      <Link to="/groups">
        <div>
          <HiOutlineUserGroup size={28} />
        </div>
      </Link>
    </section>
  );
}
