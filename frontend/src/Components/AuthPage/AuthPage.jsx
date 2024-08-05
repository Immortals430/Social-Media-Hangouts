import { IoShareSocial } from "react-icons/io5";
import banner from "../../assets/banner.jpg";
import { useEffect, useState } from "react";
import { userSelector } from "../../redux/reducers/user_reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_PATH } from "../../redux/reducers/navigation_reducer";
import Signup from "./Signup";
import Signin from "./Signin";
import ForgortPassword from "./ForgortPassword";


export default function AuthPage() {


  const [authForm, setAuthForm] = useState("login");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loggedUser} = useSelector(userSelector)


  // navigate to homepage if authenticated on initial render
  useEffect(() => {  
    if(loggedUser._id) {
      navigate('/')
      dispatch(SET_PATH('home'))
    }
  }, [loggedUser])

  
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
          style={{ backgroundImage: `url(${banner})` }}
        ></div>

        {authForm == "register" ? (
          <Signup setAuthForm={setAuthForm}/>
        ) :
        authForm == "forgot-pass" ? (
          <ForgortPassword setAuthForm={setAuthForm}/>
        ) : (
          <Signin setAuthForm={setAuthForm}/>
        )}
      </div>
    </>
  );
}
