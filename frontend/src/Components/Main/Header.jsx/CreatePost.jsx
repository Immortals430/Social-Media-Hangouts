import { LuVideo, LuImage, LuCamera } from "react-icons/lu";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_USER_TIMELINE_POST,
  UPDATE_USER_TIMELINE,
  userSelector,
} from "../../../redux/reducers/user_reducer";
import { ADD_POST, UPDATE_POST } from "../../../redux/reducers/post_reducer";
import { useParams } from "react-router-dom";
import { createPostAPI } from "../../../api/api";

export default function CreatePost() {
  const { loggedUser } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { id } = useParams();

  // create posts
  async function callCreatePost(e) {
    e.preventDefault();
    const caption = e.target.content.value;
    const image = e.target.image.files[0] || null;
    const uniqueId = Date.now()
    const obj = { caption, image }
    const post = {
      caption,
      likeCount: 0,
      uploader: loggedUser,
      url: image && "loading",
      _id: uniqueId
    }
    if(id) await dispatch(ADD_USER_TIMELINE_POST([post]))
    if(!id) await dispatch(ADD_POST([post]))
    e.target.reset();
    const { data } = await createPostAPI(obj);
    data.uniqueId = uniqueId
    if(id) dispatch(UPDATE_USER_TIMELINE(data));
    if(!id) dispatch(UPDATE_POST(data));
  }
  return (
    <section className="create-post-sec">
      <form onSubmit={callCreatePost}>
        <div className="create-post-header">
          <div>
            <AiOutlineEdit />
          </div>
          <div>Create Post</div>
        </div>
        <div className="create-post-textarea">
          <textarea
            placeholder="Whats's on your mind?"
            name="content"
          ></textarea>
          <img src={loggedUser.avatarUrl} />
        </div>

        <div className="create-post-options">
          <div>
            <div>
              {/* <input type="file"  accept="video/mp4, video/webm" /> */}
              <LuVideo color="#e71717" size={22} />
              &nbsp;&nbsp;Video
            </div>
            <div>
              <label>
                <input type="file" name="image" accept="image/jpeg, image/png" />
                Select file
              </label>
              <LuImage color="#12d877" size={22} />
              &nbsp;&nbsp;Photo
            </div>
            <div>
              {/* <input type="" /> */}
              <LuCamera color="#feae63" size={22} />
              &nbsp;&nbsp;Feeling/Activity
            </div>
          </div>
          <button>Post</button>
        </div>
      </form>
    </section>
  );
}
