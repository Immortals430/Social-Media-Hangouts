import React, { useEffect, useState } from "react";
import ProfileHead from "./ProfileHead";
import About from "./About";
import Photos from "./Photos";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER_TIMELINE_POST, getUser, getUserTimeline, LOAD_USER_TIMELINE, SET_USER_PROFILE, SET_USER_TIMELINE, userSelector } from "../../redux/reducers/user_reducer";
import { useParams } from "react-router-dom";
import CreatePost from "../Main/Header.jsx/CreatePost";
import Timeline from "./Timeline";
import { getPostAPI } from "../../api/api";



export default function Profile() {
  const { id } = useParams();
  const { profileUser, loggedUser  } = useSelector(userSelector)
  const dispatch = useDispatch()


  // get user data
  useEffect(() => {
    if(id === loggedUser._id){
       dispatch(SET_USER_PROFILE(loggedUser))
    }
    else dispatch(getUser(id))
  }, [id])

  return (
  <main className="profile-main">
    <ProfileHead />

    <div className="profile-container">
      <div className="profie-aside">
        <About />
        <Photos />
      </div>
      <div className="posts-main-container"> 
        { loggedUser._id === profileUser._id && <CreatePost /> }
        <Timeline />
      
      </div>
    </div>
  </main>
  );
}