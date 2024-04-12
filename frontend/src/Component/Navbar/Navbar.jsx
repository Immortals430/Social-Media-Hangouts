import React, { useState } from 'react'
import "./Navbar.css"
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../../redux/reducers/user_reducer'
import { useEffect } from 'react';
import {  getUserAPI } from '../../api/api'
import { SET_LOGGED_USER } from '../../redux/reducers/user_reducer'
import Auth from '../Auth/Auth'
import { PropagateLoader } from 'react-spinners'
import { logout } from '../../redux/reducers/user_reducer'
import { MdLogout } from "react-icons/md";
import logo from "../../assets/logo.png"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { SET_LOGGED_USER_AVATAR } from '../../redux/reducers/user_reducer'
import { FiMenu } from "react-icons/fi";
import { SET_MOBILE_ASIDE, navigateSelector } from '../../redux/reducers/navigation_reducer'




export default function Navbar() {

  const { loggedUser } = useSelector(userSelector)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const {mobileAside} = useSelector(navigateSelector)

  // check logged in state
  useEffect(() => {
    async function fetchLoginStatus(){
      const data = JSON.parse(localStorage.getItem('loggedUser'))
      const cookies = document.cookie

      if(data && cookies && data.expiry > Date.now()){
        const res = await getUserAPI(data._id)
        dispatch(SET_LOGGED_USER(res.data.data[0]))
      }
        setLoading(false)
    }
    fetchLoginStatus()
  }, [])


  // fetch logged user avatar
  useEffect(() => {
    if(loggedUser._id){
      async function fetchImage(){
        const storageRef = ref(getStorage(), `avatar/${loggedUser.avatar}`);
        try {
            const url = await getDownloadURL(storageRef);     
            dispatch(SET_LOGGED_USER_AVATAR(url))        
        } catch (error) {
            console.error(error);
        }
      }

      fetchImage();
    }

  }, [loggedUser]);



  return (
    <>
    <nav className='flex v-center'>
        <a href="/" className='logo-cont'>
            <img src={logo} className='logo' alt='Hangouts' />
        </a>

        {
          !loggedUser._id ? null : 
          <>
          <div className='flex v-center logout'>
            <h3 onClick={() => dispatch(logout())}>Logout</h3> &nbsp; 
            <MdLogout />
          </div>
          
          <FiMenu className='menu' onClick={() => dispatch(SET_MOBILE_ASIDE(!mobileAside))} size={25}/>


          </>

          
        }

    </nav>
  
    {loading ? <div className='flex v-center h-center spinner'>
                <PropagateLoader color='#fa2457' />
               </div> :  
               (loggedUser._id ? <Outlet /> : <Auth />)}  
  
    </>
  )
}