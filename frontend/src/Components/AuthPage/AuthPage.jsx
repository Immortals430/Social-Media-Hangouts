import { IoShareSocial } from "react-icons/io5";
import { useEffect, useState } from "react";
import { userSelector } from "../../redux/reducers/user_reducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import ForgortPassword from "./ForgortPassword";

function AuthPage() {
  const [authForm, setAuthForm] = useState("login");
  const navigate = useNavigate();
  const { loggedUser } = useSelector(userSelector);

  // navigate to homepage if authenticated on initial render
  useEffect(() => {
    if (loggedUser._id) navigate("/");
  }, [loggedUser]);

  return (
    <>
      <nav className="auth-nav">
        <a href="/">
          <h1 className="nav-left-container">
            <IoShareSocial color="#12d877" />
            <span>Hangouts</span>
          </h1>
        </a>

        <div>
          <div onClick={() => setAuthForm("login")}>
            <span className="nav-login-btn">Login</span>
          </div>
          <div onClick={() => setAuthForm("register")}>
            <span className="nav-register-btn">Register</span>
          </div>
        </div>
      </nav>

      <div className="auth-container">
        <div
          className="banner"
          style={{ backgroundImage: `url("/banner.webp")` }}
        ></div>
       
        {authForm == "register" ? (
       
            <Signup setAuthForm={setAuthForm} />
          
        ) : authForm == "forgot-pass" ? (
          <ForgortPassword setAuthForm={setAuthForm} />
        ) : (
          <Signin setAuthForm={setAuthForm} />
        )}

      </div>
    </>
  );
}

export default AuthPage;
