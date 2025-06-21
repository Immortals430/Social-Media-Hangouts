import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../redux/reducers/user_reducer";
import { memo, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import "./auth-page.scss"

function GoogleLoginButton() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const login = useGoogleLogin({

    onError: () => setLoading(false),
    onSuccess: async ({ access_token }) => {
      setLoading(true);
      await dispatch(googleLogin(access_token));
      setLoading(false);
    },
  });

  return loading ? (
      <div className="google-login-btn loading">
        <MoonLoader size={20} color="white" />
      </div>
  ) : (
    <button onClick={login} className="google-login-btn" type="button">
      <FaGoogle size={20} /> Login with Google
    </button>
  );
}


export default memo(GoogleLoginButton)