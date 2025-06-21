import { LuVideo, LuImage, LuCamera } from "react-icons/lu";
import { TiDelete } from "react-icons/ti";
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
import { useState } from "react";
import "../homepage.scss"

export default function CreatePost() {
  const { loggedUser } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [fileInput, setFileInput] = useState(null);

  // create posts
  async function callCreatePost(e) {
    e.preventDefault();
    const caption = e.target.content.value;
    const image = fileInput;
    const uniqueId = crypto.randomUUID();
    const obj = { caption, image };

    const post = {
      caption,
      likeCount: 0,
      uploader: {...loggedUser, avatarUrl: " "},
      url: " " || null,
      _id: uniqueId,
      temp: true,
    };

    if(image?.size > 5242880){
      window.alert("File size should be less than 5MB")
      return
    }
    console.log("post")
    if (caption || image) {
      if (id) await dispatch(ADD_USER_TIMELINE_POST([post]));
      if (!id) await dispatch(ADD_POST([post]));
      e.target.reset();
      setFileInput(null)
      const { data } = await createPostAPI(obj);

      if (id) dispatch(UPDATE_USER_TIMELINE(data, uniqueId));
      if (!id) dispatch(UPDATE_POST({ data, uniqueId }));
    }
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
            className={fileInput && "shrink-area"}
          ></textarea>
          <img src={loggedUser.avatarUrl} className="textarea-dp" alt="" />

          {fileInput && (
            <div className="thumbnail">
              <TiDelete
                className="delete"
                color="#e50000"
                size={20}
                onClick={() => setFileInput(null)}
              />
              <img src={URL.createObjectURL(fileInput)} />
            </div>
          )}
        </div>

        <div className="create-post-options">
          <div>
            <div>
              <input type="file"  accept="video/mp4, video/webm"  onInput={(e) => setFileInput(e.target.files[0])} />
              <LuVideo color="#e71717" size={22} />
              &nbsp;&nbsp;Video
            </div>
            <div>
              <label>
                <input
                  type="file"
                  name="image"
                  accept="image/jpeg, image/png"
                  onInput={(e) => setFileInput(e.target.files[0])}
                />
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
