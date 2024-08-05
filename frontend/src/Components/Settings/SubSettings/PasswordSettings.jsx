import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, sendOtp, userSelector } from "../../../redux/reducers/user_reducer";
import { useEffect, useRef, useState } from "react";

export default function PasswordSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const { loggedUser } = useSelector(userSelector);
  const [passwordState, setPasswordState] = useState("");
  const [confirmPassState, setConfirmPassState] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  useEffect(() => {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z0-9\W_]{8,}$/;
    if (passwordState === confirmPassState) {
      setIsValidPassword(regex.test(passwordState));
      setPasswordMatch(true);
    } else setPasswordMatch(false);
  }, [passwordState, confirmPassState]);

  function callchangePassword(e) {
    e.preventDefault();
    if (!passwordMatch && !isValidPassword) return;
    const passswordData = {
      email: loggedUser.email,
      password: e.target.password.value,
      otp: e.target.otp.value
    }
    dispatch(changePassword(passswordData))
    e.target.reset()
  }


  return (
    <main className="account-setting">
      <div>
        <h1>
          <IoMdArrowRoundBack
            color="#0055ff"
            onClick={() => navigate("/settings")}
          />
          &nbsp;&nbsp;Password Settings
        </h1>
        <form className="account-setting-form" onSubmit={callchangePassword}>
          <div>
            <span>New Password</span>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              onChange={() => setPasswordState(passwordRef.current.value)}
              required
            />
          </div>
          <div>
            <span>Confirm Password</span>
            <input
              type="password"
              name="confirmpassword"
              ref={confirmPassRef}
              onChange={() => setConfirmPassState(confirmPassRef.current.value)}
              required
            />
          </div>
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
          <div>
            <span>Enter Otp</span>
            <div>
              <input type="number" maxLength="4" minLength="4" name="otp" />
              &nbsp;&nbsp;
              <input
                type="button"
                value="Send Otp"
                onClick={() => dispatch(sendOtp(loggedUser.email))}
              />
            </div>
          </div>

          <div className="button">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </main>
  );
}
