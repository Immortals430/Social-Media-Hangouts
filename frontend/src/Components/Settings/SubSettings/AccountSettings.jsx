import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../redux/reducers/user_reducer";
import { useDispatch } from "react-redux";
import "../settings.scss"

export default function AccountSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function callupdateProfile(e){
    e.preventDefault()
    const accountDetails = {
      name: e.target.username.value,
      status: e.target.status.value,
      phone: e.target.phone.value,
      hobbies: e.target.hobbies.value,
    }
    dispatch(updateProfile(accountDetails))
    e.target.reset()
  }

  return (
    <main className="account-setting">
      <div>
        <h1>
          <IoMdArrowRoundBack
            onClick={() => navigate("/settings")}
            color="#0055ff"
          />
          &nbsp;&nbsp;Account Details
        </h1>
        <form className="account-setting-form" onSubmit={callupdateProfile}>
          <div>
            <span>Username</span>
            <input type="text" name="username" />
          </div>
          <div>
            <span>Relationship Status</span>
            <select name="status" defaultValue="">
              <option value="single">Single</option>
              <option value="dating">Dating</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="">None</option>
            </select>
          </div>
          <div>
            <span>Contact no.</span>
            <input type="tel" name="phone" />
          </div>
          <div>
            <span>Hobbies</span>
            <input type="text" name="hobbies" />
          </div>
          <div className="button">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </main>
  );
}
