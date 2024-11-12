import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  friendsSelector,
  respondReq,
  toggleFrndReq,
} from "../../redux/reducers/friend_reducer";
import { Link } from "react-router-dom";

export default function FindFriend() {
  const { friendReqsRec, friendSuggestions } = useSelector(friendsSelector);
  const dispatch = useDispatch();

  function callRespondReq(e, friendId, respond) {
    e.preventDefault();
    dispatch(respondReq({ friendId, respond }));
  }

  function calltoggleFrndReq(e, friendId) {
    e.preventDefault();
    dispatch(toggleFrndReq(friendId));
  }
  return (
    <main className="friends">
      {/* <section className="filter-friend">
        <h2>Find Friend</h2>
        <form action="">
          <input type="text" />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </section> */}

      {friendReqsRec.length > 0 ? (
        <section>
          <div className="friend-req-head">
            <h2>Friend Request</h2>
          </div>

          <div className="grid">
            {friendReqsRec.map(({ user }) => (
              <Link to={`/profile/${user._id}`} key={user._id}>
                <div className="user-card">
                  <img src={user.avatarUrl} alt="" className="user-image" />
                  {/* <div
                  className="user-image"
                  style={{ backgroundImage: `url(${user.avatarUrl})`, height: "208px" }}
                ></div> */}
                  <div className="details">
                    <h3>{user.username}</h3>
                    <div
                      className="accept-btn"
                      onClick={(e) => callRespondReq(e, user._id, "accept")}
                    >
                      Accept
                    </div>
                    <div
                      className="reject-btn"
                      onClick={(e) => callRespondReq(e, user._id, "reject")}
                    >
                      Reject
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {friendSuggestions.length > 0 ? (
        <section>
          <div className="friend-sugg-head">
            <h2>People you may know</h2>
          </div>

          <div className="grid">
            {friendSuggestions.map((user) => (
              <Link to={`/profile/${user._id}`} key={user._id}>
                <div className="user-card">
                  <img src={user.avatarUrl} alt="" className="user-image" />
                  {/* <div
                  className="user-image"
                  style={{ backgroundImage: `url(${user.avatarUrl})` }}
                ></div> */}
                  <div className="details">
                    <h3>{user.username}</h3>
                    {!user.reqSent ? (
                      <div
                        className="send-req-btn"
                        onClick={(e) => calltoggleFrndReq(e, user._id)}
                      >
                        Send Request
                      </div>
                    ) : (
                      <div
                        className="reject-btn"
                        onClick={(e) => calltoggleFrndReq(e, user._id)}
                      >
                        Cancel Request
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
