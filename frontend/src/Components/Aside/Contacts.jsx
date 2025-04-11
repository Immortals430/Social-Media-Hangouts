import { useSelector } from "react-redux";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { friendsSelector } from "../../redux/reducers/friend_reducer";
import { useDispatch } from "react-redux";
import {
  chatSelector,
  REMOVE_UNREAD,
  SET_USER,
  setSeen,
} from "../../redux/reducers/chat_reducer";
import { memo } from "react";
import { removeSkeleton } from "../../utility/removeSkeleton";


function AsideRight() {
  const { friends } = useSelector(friendsSelector);
  const { user, unreadMsg } = useSelector(chatSelector);
  const { onlineUsers } = useSelector(chatSelector);
  const dispatch = useDispatch();

  // start chat
  async function callStartChat(user) {
    await dispatch(SET_USER({}));
    dispatch(SET_USER(user));
    dispatch(REMOVE_UNREAD(user._id));
    dispatch(setSeen(user._id));
  }
  return (
    <aside className="right-aside">
      <div>
        <section>
          <h4>CONTACTS</h4>
          <div>
            {friends.map(({ friend }) => (
              <div key={friend._id} onClick={() => callStartChat(friend)}>
                <div className="logo loading">
                  <img src={friend.avatarUrl} alt="logo" onLoad={removeSkeleton} />
                </div>
                <span className="name">{friend.username}</span>
                {user._id == friend._id ||
                !unreadMsg.includes(friend._id) ? null : (
                  <span>
                    {
                      unreadMsg.filter((message) => message == friend._id)
                        .length
                    }
                    <MdOutlineMarkEmailUnread
                      color="blue"
                      size={22}
                      onClick={() => setSeen(friend)}
                      className="delete"
                    />
                  </span>
                )}
                {onlineUsers.includes(friend._id) && (
                  <span className="online-logo"></span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="groups-sec">
          <h4>GROUPS</h4>
          {/* <div>
            <div>
              <div className="logo">
                <div></div>
              </div>
              <span className="name">Linked In</span>
              <span className="online-logo"></span>
            </div>
          </div> */}
        </section>
      </div>
    </aside>
  );
}

export default memo(AsideRight);
