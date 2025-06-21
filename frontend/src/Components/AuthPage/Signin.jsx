import { useDispatch } from "react-redux";
import { signin } from "../../redux/reducers/user_reducer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleLoginButton";
import { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import "./auth-page.scss"

export default function Signin({ setAuthForm }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // signin
  async function callSignin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    await dispatch(signin({ email, password }));
    setLoading(false);
  }

  return (
    <div className="login-sec">
      <form onSubmit={callSignin}>
        <h1>Login</h1>

        <input type="email" name="email" placeholder="Email" required autoComplete="true"/>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <p onClick={() => setAuthForm("forgot-pass")}>Forgotten password?</p>
        {loading ? (
            <div className="login-btn loading">
              <MoonLoader size={20} color="white" />
            </div>
        ) : (
          <button type="submit" className="login-btn ">
            Login
          </button>
        )}

        <GoogleOAuthProvider clientId={ import.meta.env.VITE_APP_CLIENTID }>
          <GoogleLoginButton />
        </GoogleOAuthProvider>

        <p className="signup-para">Dont have an account?</p>
        
        <button
          type="button"
          className="signup-btn"
          onClick={() => setAuthForm("register")}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
