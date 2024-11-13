import { useDispatch, useSelector } from "react-redux";
import { updateProfile, userSelector } from "../../redux/reducers/user_reducer";
import { toggleFrndReq, unfriend } from "../../redux/reducers/friend_reducer";
import {
  friendsSelector,
  respondReq,
} from "../../redux/reducers/friend_reducer";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  REMOVE_UNREAD,
  SET_USER,
  setSeen,
} from "../../redux/reducers/chat_reducer";

export default function ProfileHead({setActiveComp}) {
  const { loggedUser, profileUser } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { friends, friendReqsRec } = useSelector(friendsSelector);
  const profileDpRef = useRef();
  const coverPicRef = useRef();
  const { id } = useParams();
  const [loading, setLoading] = useState("");

  function callStartChat(profileUser) {
    dispatch(SET_USER(profileUser));
    dispatch(REMOVE_UNREAD(profileUser._id));
    dispatch(setSeen(profileUser._id));
  }

  function profileBtnOptions(profileUser) {
    if (Object.keys(profileUser).length == 0) {
      return;
    }
    const request = friendReqsRec.some(
      (obj) => obj.user._id === profileUser._id
    );
    if (request) {
      return (
        <>
          <div
            className="blue-btn"
            onClick={() =>
              dispatch(
                respondReq({ friendId: profileUser._id, respond: "accept" })
              )
            }
          >
            Accept
          </div>
          <div
            className="red-btn"
            onClick={() =>
              dispatch(
                respondReq({ friendId: profileUser._id, respond: "reject" })
              )
            }
          >
            Reject
          </div>
        </>
      );
    }
    const friend = friends.some(({ friend }) => friend._id === profileUser._id);
    if (friend) {
      return (
        <>
          <div
            className="red-btn"
            onClick={() => dispatch(unfriend(profileUser._id))}
          >
            Unfriend
          </div>
          <div className="blue-btn" onClick={() => callStartChat(profileUser)}>
            Message
          </div>
        </>
      );
    }

    if (!request && !friend) {
      return (
        <>
          <div
            className={profileUser.reqSent ? "red-btn" : "green-btn"}
            onClick={() => dispatch(toggleFrndReq(profileUser._id))}
          >
            {profileUser.reqSent ? "Cancel Request" : "Send Request"}
          </div>
          <div className="blue-btn" onClick={() => callStartChat(profileUser)}>
            Message
          </div>
        </>
      );
    }
  }

  const callUpdateProfile = async (e, picName) => {
    let obj = {};
    obj[`${picName}`] = e.target.files[0];
    setLoading(picName);
    await dispatch(updateProfile(obj));
    setLoading("");
  };

  return (
    <div className="profile-head-container">
      <header className="profile-header">
        <form action="">
          <div
            className="cover-photo"
            style={{
              backgroundImage: `url(${
                id == loggedUser._id
                  ? loggedUser.coverUrl
                  : profileUser.coverUrl
              })`,
              opacity: loading == "cover" ? 0.5 : 1,
            }}
          >
            <input
              type="file"
              ref={coverPicRef}
              onChange={(e) => callUpdateProfile(e, "cover")}
            />
          </div>
          <div className="user-details">
            <div
              className="profile-dp"
              style={{
                backgroundImage: `url(${
                  id == loggedUser._id
                    ? loggedUser.avatarUrl
                    : profileUser.avatarUrl
                })`,
                opacity: loading == "avatar" ? 0.5 : 1,
              }}
            >
              <input
                type="file"
                ref={profileDpRef}
                onChange={(e) => callUpdateProfile(e, "avatar")}
              />
            </div>
            <div className="profilename">
              <h4>{profileUser.username}</h4>
            </div>
            <div className="connects-container">
 
              {loggedUser._id == profileUser._id
                ? null
                : profileBtnOptions(profileUser)}
            </div>
          </div>
        </form>
        <div className="links">
          <div onClick={() => setActiveComp("about")}>About</div>
          <div onClick={() => setActiveComp("friends")}>Friends</div>
          <div onClick={() => setActiveComp("photos")}>Photos</div>
          <div onClick={() => setActiveComp("posts-main-container")}>Timeline</div>
        </div>
      </header>
    </div>
  );
}
