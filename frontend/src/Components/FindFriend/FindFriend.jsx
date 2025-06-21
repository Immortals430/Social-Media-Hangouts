import { useDispatch, useSelector } from "react-redux";
import {
  DONT_FETCH_FRIEND_SUGG,
  friendsSelector,
  INCREASE_FRIEND_PAGE,
  LOAD_FRIENDS_SUGG,
  respondReq,
  SET_FRIENDS,
  SET_FRIENDS_REQ,
  SET_FRIENDS_SUGG,
  SET_INITIAL_LOAD_FIND_FRIEND,
  toggleFrndReq,
} from "../../redux/reducers/friend_reducer";
import { Link } from "react-router-dom";
import { removeSkeleton } from "../../utility/removeSkeleton";
import "./find-friend.scss";
import { useEffect, useRef, useState } from "react";
import {
  getFriendReqAPI,
  getFriendsAPI,
  getFriendSuggestionAPI,
} from "../../api/api";
import FindFriendLazy from "./FindFriendLazy";

export default function FindFriend() {
  const { friendReqsRec, friendSuggestions } = useSelector(friendsSelector);
  const dispatch = useDispatch();
  const friendsRef = useRef();
  const { friendPage, dontFetch, initialLoadFindFriend } = useSelector(friendsSelector);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initailRender = async () => {
      const friends = await getFriendsAPI();
      await dispatch(SET_FRIENDS(friends.data));
      const frndReq = await getFriendReqAPI();
      await dispatch(SET_FRIENDS_REQ(frndReq.data));
      const users = await getFriendSuggestionAPI(1);
      await dispatch(SET_FRIENDS_SUGG(users.data));
      dispatch(SET_INITIAL_LOAD_FIND_FRIEND(false));
    };
    initailRender();
  }, []);

  // infinite reload posts
  const callFriendAPI = async () => {
    if (!dontFetch) {
      const { data } = await getFriendSuggestionAPI(friendPage);
      if (data.length == 0) dispatch(DONT_FETCH_FRIEND_SUGG());

      dispatch(LOAD_FRIENDS_SUGG(data));
    }
    setLoading(false);
  };

  const handleScroll = async (e) => {
    const totalHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;
    if (scrollTop + clientHeight + 1 >= totalHeight) {
      setLoading(true);
      callFriendAPI();
      dispatch(INCREASE_FRIEND_PAGE());
    }
  };

  useEffect(() => {
    if (!dontFetch && friendsRef.current)
      friendsRef.current.addEventListener("scroll", handleScroll);
    return () => {
      friendsRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [friendPage, dontFetch]);

  function callRespondReq(e, friendId, respond) {
    e.preventDefault();
    dispatch(respondReq({ friendId, respond }));
  }

  function calltoggleFrndReq(e, friendId) {
    e.preventDefault();
    dispatch(toggleFrndReq(friendId));
  }

  if (initialLoadFindFriend) {
    return <FindFriendLazy />;
  }

  return (
    <main className="friends" ref={friendsRef}>
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
                <div className="card">
                  <div className="image-container loading">
                    <img src={user.avatarUrl} alt="" onLoad={removeSkeleton} />
                  </div>

                  <div className="details">
                    <h3>{user.name}</h3>
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
                <div className="card">
                  <div className="image-container loading">
                    <img src={user.avatarUrl} alt="" onLoad={removeSkeleton} />
                  </div>
                  <div className="details">
                    <h3>{user.name}</h3>
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
