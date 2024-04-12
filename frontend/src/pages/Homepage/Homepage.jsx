import React from 'react'
import Post from '../../Component/Home/Post'
import Aside from '../../Component/Home/Aside'
import Contacts from '../../Component/Home/Contacts'
import { useDispatch, useSelector } from 'react-redux'
import { STOP_LOADING, navigateSelector } from '../../redux/reducers/navigation_reducer'
import Friends from '../../Component/Home/FindFriend'
import { SET_AVATAR, SET_USERS_LIST, SET_USER_MEMORIES, userSelector } from '../../redux/reducers/user_reducer'
import { SET_POST, SET_POST_IMAGE, postSelector } from '../../redux/reducers/post_reducer'
import { useEffect } from 'react'
import { getStorage, ref ,getDownloadURL } from "firebase/storage";
import { getPostAPI, getUserAPI } from '../../api/api'
import Chats from '../../Component/Chats/Chats'
import { SET_ONLINE_USERS, chatSelector } from '../../redux/reducers/chat_reducer'
import { socket } from '../../configs/socket'
import { SET_CHAT_UPDATE, SET_UNREAD } from '../../redux/reducers/chat_reducer'
import Navigator from '../../Component/Mobile/Navigator'
import MobileAside from '../../Component/Mobile/MobileAside'
import Group from '../../Component/Home/Group'


export default function Homepage() {

  const { path }  = useSelector(navigateSelector)
  const { posts } = useSelector(postSelector)
  const { users, loggedUser } = useSelector(userSelector)
  const { user } = useSelector(chatSelector)
  const dispatch = useDispatch()



  // get user on initial render post login 
  useEffect(() => {
    if(loggedUser._id){
      async function getUsers(){
        const { data } = await getUserAPI()
        dispatch(SET_USERS_LIST(data.data))
        dispatch(STOP_LOADING('friends'))
      }
      getUsers() 
    }
  },[])

  // socket 
  useEffect(() => {
    socket.emit('connected', loggedUser._id)
    socket.on('online-users', (onlineUsers) => {
      dispatch(SET_ONLINE_USERS(onlineUsers))
    })
    socket.on('new-msg', (msg) => {
      dispatch(SET_CHAT_UPDATE(msg))
      if(!user._id) dispatch(SET_UNREAD(msg.messenger))
    })
    return () => {
      socket.off('online-users')
      socket.off('new-msg')
    }
  }, [])


  // fetch user avatar images  
  useEffect(() => {
      async function fetchImages() {
          const avatarUrls = {};
          for (const element of users) {
              const storageRef = ref(getStorage(), `avatar/${element.avatar}`);
              try {
                  const url = await getDownloadURL(storageRef);
                  avatarUrls[element._id] = url
              } catch (error) {
                  console.log(error)
              }
          }
          dispatch(SET_AVATAR(avatarUrls));
      }
      fetchImages();
  }, [users]);



  // fetch post image
  useEffect(() => {
    async function fetchImages() {
        const imageUrls = {};
        for (const element of posts) {
            const storageRef = ref(getStorage(), `post/${element.image}`);
            try {
                const url = await getDownloadURL(storageRef);
                imageUrls[element._id] = url
            } catch (error) {
                console.log(error)
            }
        }

        dispatch(SET_POST_IMAGE(imageUrls));
    }
    fetchImages();
  }, [posts]);
  


  // load post on if logged in
  useEffect(() => {
    async function loadPost(){
        const { data } = await getPostAPI()
        await dispatch(SET_POST(data.data))
        dispatch(STOP_LOADING('posts'))
        
    }
    loadPost()
  }, [loggedUser])


  return (
    <main className='flex'>
      <Aside />
      <Navigator/>
      {
          path === "friends" ? (<Friends />) : 
          path === "groups" ?  (<Group />)  :
          ( <Post />)
        
      }


      <Contacts />
      <MobileAside />
      

      {user._id && loggedUser ? <Chats /> : null}

    </main>

  )
}
