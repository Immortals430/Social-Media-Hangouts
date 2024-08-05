import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/reducers/user_reducer";

export default function Signup({setAuthForm}) {
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const [passwordState, setPasswordState] = useState("");
  const [confirmPassState, setConfirmPassState] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const dispatch = useDispatch();

  // set if password is valid or not
  useEffect(() => {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z0-9\W_]{8,}$/;
    if (passwordState === confirmPassState) {
      setIsValidPassword(regex.test(passwordState));
      setPasswordMatch(true);
    } else setPasswordMatch(false);
  }, [passwordState, confirmPassState]);

  // signup
  async function callSignup(e) {
    e.preventDefault();
    if (!passwordMatch && !isValidPassword) return;
    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };
    const { payload } = await dispatch(signup(formData));
    if (!payload) return;
    e.target.reset();
    setAuthForm("login");
  }

  return (
    <div className="login-sec">
      <form onSubmit={callSignup}>
        <h1>Signup</h1>

        <input type="text" name="username" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          ref={passwordRef}
          onChange={() => setPasswordState(passwordRef.current.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          ref={confirmPassRef}
          onChange={() => setConfirmPassState(confirmPassRef.current.value)}
        />
        {!passwordMatch && (
          <p style={{ color: "red" }}>Passwords do not match!</p>
        )}
        {!isValidPassword && (
          <p style={{ color: "red" }}>
            Password must be at least 8 characters long and include at least one
            uppercase letter, one lowercase letter, one number, and one special
            character.
          </p>
        )}
        <p>
          Aready have an account?{" "}
          <span onClick={() => setAuthForm("login")}>Login</span>
        </p>
        <button type="submit" className="login-btn">
          Signup
        </button>

      </form>
    </div>
  );
}
