import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../redux/reducers/user_reducer";
import { useDispatch } from "react-redux";
import "../settings.scss"

export default function AddressSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function callupdateProfile(e) {
    e.preventDefault();
    const house = e.target.house.value;
    const sector = e.target.sector.value;
    const city = e.target.city.value;
    const landmark = e.target.landmark.value;
    const state = e.target.state.value;

    const location = `House No. ${house}, Sector/Area: ${sector}, City: ${city}, ${
      landmark ? "Landmark: " + landmark + "," : ""
    } State: ${state}`;

    dispatch(updateProfile({ location }));
    e.target.reset();
  }

  return (
    <main className="account-setting">
      <div>
        <h1>
          <IoMdArrowRoundBack
            color="#0055ff"
            onClick={() => navigate("/settings")}
          />
          &nbsp;&nbsp;Address Details
        </h1>
        <form className="account-setting-form" onSubmit={callupdateProfile}>
          <div>
            <span>House No.</span>
            <input type="number" name="house" required />
          </div>
          <div>
            <span>Sector/Area</span>
            <input type="text" name="sector" required />
          </div>
          <div>
            <span>City</span>
            <input type="text" name="city" required />
          </div>
          <div>
            <span>Landmark</span>
            <input type="text" name="landmark" />
          </div>
          <div>
            <span>State</span>
            <input type="text" name="state" required />
          </div>
          <div className="button">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </main>
  );
}
