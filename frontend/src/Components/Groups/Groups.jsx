import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeSkeleton } from "../../utility/removeSkeleton";
import { getGroupsAPI, toggleToAddRemoveFromGroupAPI } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import "./groups.scss";
import { groupSelector, SET_GROUPS } from "../../redux/reducers/group_reducer";
import { IoIosAdd } from "react-icons/io";
import { userSelector } from "../../redux/reducers/user_reducer";

export default function Groups() {
  const { groups } = useSelector(groupSelector);
  const dispatch = useDispatch();
  const { loggedUser } = useSelector(userSelector);

  console.log(loggedUser)

  useEffect(() => {
    const fetchGroups = async () => {
      const { data } = await getGroupsAPI();
      dispatch(SET_GROUPS(data));
    };
    fetchGroups();
  }, []);

  const handleFollow = (e, groupId) => {
    if (e.target.innerText === "Follow") {
      e.target.innerText = "Unfollow";
      e.target.style.backgroundColor = "red";
    } else {
      e.target.innerText = "Follow";
      e.target.style.backgroundColor = "#0055ff";
    }

    toggleToAddRemoveFromGroupAPI(groupId)
  };

  return (
    <main className="groups">
      <section>
        <div className="groups-head">
          <h2>Groups</h2>
        </div>

        <div className="grid">
          {groups.map((group) => (
            <Link key={group._id}>
              <div className="card">
                <div className="image-container loading">
                  <img src={group.avatarUrl} alt="" onLoad={removeSkeleton} />
                </div>

                <div className="details">
                  <h3>{group.name}</h3>
                  {group.admin ===
                  loggedUser._id ? null : group.members.includes(
                      loggedUser._id
                    ) ? (
                    <div
                      className="reject-btn"
                      onClick={(e) => handleFollow(e, group._id)}
                    >
                      Unfollow
                    </div>
                  ) : (
                    <div
                      className="accept-btn"
                      onClick={(e) => handleFollow(e, group._id)}
                    >
                      Follow
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
