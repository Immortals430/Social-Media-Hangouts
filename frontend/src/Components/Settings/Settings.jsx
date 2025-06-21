import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { PiTwitterLogo } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoLogOutSharp } from "react-icons/io5";
import { TfiAngleRight } from "react-icons/tfi";
import { logout } from "../../redux/reducers/user_reducer";
import { useDispatch } from "react-redux";
import { MdOutlineFeedback } from "react-icons/md";
import "./settings.scss"

export default function Settings() {
  const dispatch = useDispatch();

  return (
    <main className="settings">
      <div>
        <h1>Settings</h1>
        <section>
          <h5>General</h5>
          <Link to="/settings/account">
            <div>
              <div className="setting-icons account">
                <MdOutlineAccountCircle size={22} />
              </div>
              <div className="description">Account Information</div>
              <span>
                <TfiAngleRight />
              </span>
            </div>
          </Link>
          <Link to="/settings/address">
            <div>
              <div className="setting-icons address">
                <IoLocationSharp size={22} />
              </div>
              <div className="description">Saved Address</div>
              <span>
                <TfiAngleRight />
              </span>
            </div>
          </Link>
          <Link>
            <div>
              <div className="setting-icons social">
                <PiTwitterLogo size={22} />
              </div>
              <div className="description">Social Accounts</div>
              <span>
                <TfiAngleRight />
              </span>
            </div>
          </Link>
        </section>

        <section>
          <h5>Account</h5>
          <Link to="/settings/password">
            <div>
              <div className="setting-icons password">
                <RiLockPasswordLine size={22} />
              </div>
              <div className="description">Password</div>
              <span>
                <TfiAngleRight />
              </span>
            </div>
          </Link>
        </section>

        <section>
          <h5>Other</h5>
          <Link to="mailto:vishalkumar619430@gmail.com">
            <div>
              <div className="setting-icons feedback">
                <MdOutlineFeedback size={22} />
              </div>
              <div className="description">Feedback</div>
              <span>
                <TfiAngleRight />
              </span>
            </div>
          </Link>
          <a href="/" onClick={() => dispatch(logout())}>
            <div>
              <div className="setting-icons logout">
                <IoLogOutSharp size={22} />
              </div>
              <div className="description">Logout</div>
            </div>
          </a>
        </section>
      </div>
    </main>
  );
}
