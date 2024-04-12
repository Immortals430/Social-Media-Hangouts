import { useDispatch, useSelector } from "react-redux"
import "./Home.css"
import { respondReq, toggleFrndReq, userSelector } from "../../redux/reducers/user_reducer"
import { Link } from "react-router-dom"
import { MdPersonAddAlt1 } from "react-icons/md";
import { RiArrowGoBackLine } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { MoonLoader } from "react-spinners"
import { navigateSelector } from "../../redux/reducers/navigation_reducer"

export default function Friends() {
  
  const { loggedUser, users, userAvatar } = useSelector(userSelector)
  const { loading } = useSelector(navigateSelector)
  const dispatch = useDispatch()



  // what to show send req, cancel req or nothing
  function checkRequest({ friends, friendRequest, _id }){ 
    const friend = friends.findIndex(value => ( loggedUser._id === value._id ))
    const res = friendRequest.findIndex(value =>  ( loggedUser._id === value._id ))
    const myReqList = loggedUser.friendRequest.findIndex(value => ( _id === value._id ))

    if(myReqList > -1) {
      // user has already sent req
      return (<>
      <GiConfirmed onClick={() => dispatch(respondReq({friendId: _id, respond: 'accept'}))} />
      &nbsp;&nbsp;
      <RxCross2 onClick={() => dispatch(respondReq({friendId: _id, respond: 'reject'}))}/>
      </>)
    }
    // if already friend return nothing
    if(friend > -1) return   
    // if user is not friend                                 
    if(res === -1) return <MdPersonAddAlt1 onClick={() => dispatch(toggleFrndReq({friendId: _id}))} />  
    // if req is sent                
    else return <RiArrowGoBackLine onClick={() => dispatch(toggleFrndReq({friendId: _id}))} />                         
  }

  return (
    <section className='frndSec'>
        <div className="flex h-center">
            <h2>Find Friends</h2>
        </div>

   
            {
            loading.includes('friends') ? 
            <div className="flex v-center h-center post-loading" style={{height: "90%"}}>
                <MoonLoader color="var(--theme)"/>
            </div> :
            
            users.map(( user, i ) => (

        
              user._id === loggedUser._id ? null : 
                    (
                      <div  className="flex users v-center" key={i}>
                        <Link to={`/profile/${user.id}`} className="userDp logo" style={{backgroundImage: `url(${userAvatar[user._id]})`}} ></Link>
                        <Link to={`/profile/${user.id}`} className="userName">{user.username}</Link>
                        <div className="flex v-center">{checkRequest(user)}</div>
                      </div>
                    )
            ))}
    

    </section>
  )
}
