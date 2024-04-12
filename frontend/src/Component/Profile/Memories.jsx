import "./Profile.css"
import { useDispatch, useSelector } from "react-redux"
import { userSelector } from "../../redux/reducers/user_reducer"
import { SET_PATH } from "../../redux/reducers/navigation_reducer"
import { IoIosAddCircle } from "react-icons/io";
import { useEffect } from "react";
import { getStorage, getDownloadURL, ref} from "firebase/storage";
import { SET_USER_MEMORIES } from "../../redux/reducers/user_reducer";

export default function Memories(){

  const { loggedUser, userMemories } = useSelector(userSelector)
  const dispatch = useDispatch()

    // fetch memories
    useEffect(() => {
      async function fetchMemories() {
          const memories = [];
          for (const element of loggedUser.post) {
              const storageRef = ref(getStorage(), `post/${element.image}`);
              try {
                  const url = await getDownloadURL(storageRef);
                  memories.push(url)
              } catch (error) {
                  console.log(error)
              }
          }
          dispatch(SET_USER_MEMORIES(memories));
      }
      fetchMemories();
    }, []);

  return (
      <section  className="userTimeLine flex" >
          <div className="timeLineData flex">
              <h3 onClick={() => dispatch(SET_PATH('upload'))} className="flex v-center h-center">Add Memories &nbsp;&nbsp; <IoIosAddCircle /></h3>
              <div className="photos-cont flex">
                {
                  userMemories.map((value, i) => (
                    <div key={i} style={{backgroundImage: `url(${value})`}} className="memories-img"></div>
                  ))
                }

              </div>
          </div>
      </section>

  )
}





