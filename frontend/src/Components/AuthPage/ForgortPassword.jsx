import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/user_reducer";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../redux/reducers/user_reducer";
import { useEffect } from "react";
import { changePassword } from "../../redux/reducers/user_reducer";
import MoonLoader from "react-spinners/MoonLoader";

export default function ForgortPassword({ setAuthForm }) {
  const emailRef = useRef();
  const [passwordState, setPasswordState] = useState("");
  const [confirmPassState, setConfirmPassState] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z0-9\W_]{8,}$/;
    if (passwordState === confirmPassState) {
      setIsValidPassword(regex.test(passwordState));
      setPasswordMatch(true);
    } else setPasswordMatch(false);
  }, [passwordState, confirmPassState]);

  // change password
  async function callchangePassword(e) {
    e.preventDefault();
    if (!passwordMatch && !isValidPassword) return;
    const passswordData = {
      email: e.target.email.value,
      password: e.target.password.value,
      otp: e.target.otp.value,
    };
    setLoading(true);
    const { payload } = await dispatch(changePassword(passswordData));
    if (payload) {
      e.target.reset();
      setAuthForm("login");
    }
    setLoading(false);
  }

  // send otp
  async function callSendotp() {
    if (emailRef.current.value == "") return;
    setLoading(true);
    const { payload } = await dispatch(sendOtp(emailRef.current.value));
    if (payload) {
      setOtpSent(true);
      emailRef.current.disabled = true;
    }
    setLoading(false);
  }

  return (
    <div className="login-sec">
      <form onSubmit={callchangePassword}>
        <h1>Reset Password</h1>
        <input
          type="email"
          name="email"
          ref={emailRef}
          required
          placeholder="Email"
          defaultValue=""
        />
        {!otpSent ? (
          loading ? (
            <div className="send-otp-btn loading">
              <MoonLoader size={20} color="white" />
            </div>
          ) : (
            <button
              type="button"
              defaultValue="Send OTP"
              onClick={callSendotp}
              className="send-otp-btn"
            >
              Send Otp
            </button>
          )
        ) : (
          <>
            <input
              type="password"
              name="password"
              required
              placeholder="New password"
              defaultValue=""
              onChange={(e) => setPasswordState(e.target.value)}
            />
            <input
              type="password"
              name="confirmpassword"
              required
              placeholder="Confirm new password"
              defaultValue=""
              onChange={(e) => setConfirmPassState(e.target.value)}
            />
            <span>Enter OTP</span>
            <input
              type="number"
              maxLength="4"
              minLength="4"
              name="otp"
              defaultValue=""
              required
            />

            {!passwordMatch && (
              <p style={{ color: "red" }}>Passwords do not match!</p>
            )}
            {!isValidPassword && (
              <p style={{ color: "red" }}>
                Password must be at least 8 characters long and include at least
                one uppercase letter, one lowercase letter, one number, and one
                special character.
              </p>
            )}
            {loading ? (
              <div className="login-btn loading">
                <MoonLoader size={20} color="white" />
              </div>
            ) : (
              <button type="submit" className="login-btn">
                Submit
              </button>
            )}
          </>
        )}
      </form>
    </div>
  );
}
