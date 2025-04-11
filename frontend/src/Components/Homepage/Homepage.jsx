import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_POST,
  INCREASE_POST_PAGE,
  postSelector,
  DONT_FETCH_POST,
} from "../../redux/reducers/post_reducer";
import { getPostAPI } from "../../api/api";

import Header from "./Header.jsx/Header";
import Posts from "./Posts/Posts";
import AsideRight from "../Aside/Contacts";

export default function Homepage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { postPage, dontFetchPost } = useSelector(postSelector);
  const postRef = useRef();

  // infinite reload posts
  const callPostAPI = async () => {
    if (!dontFetchPost) {
      const { data } = await getPostAPI(postPage);
      if (data.length == 0) dispatch(DONT_FETCH_POST());
      await dispatch(LOAD_POST(data));
    }
    setLoading(false);
  };

  const handleScroll = async (e) => {
    const totalHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;
    if (scrollTop + clientHeight + 1 >= totalHeight) {
      setLoading(true);
      callPostAPI();
      dispatch(INCREASE_POST_PAGE());
      
    }
  };

  useEffect(() => {
    if (!dontFetchPost)
      postRef.current.addEventListener("scroll", handleScroll);
    return () => {
      postRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [postPage, dontFetchPost]);


  useEffect(() => {
    setLoading(true);
    callPostAPI();
    dispatch(INCREASE_POST_PAGE());
  }, []);

  return (
    <main className="posts-main" ref={postRef}>
      <div className="posts-main-container">
        <Header />
        <Posts loading={loading} />
      </div>
      <AsideRight />
    </main>
  );
}
