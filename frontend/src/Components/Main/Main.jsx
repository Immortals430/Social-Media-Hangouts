import Header from "./Header.jsx/Header";
import Posts from "./Posts/Posts";
import AsideRight from "../Aside/Contacts";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ADD_POST,
  LOAD_POST,
  SET_POST,
} from "../../redux/reducers/post_reducer";
import { getPostAPI } from "../../api/api";

export default function Main() {
  const dispatch = useDispatch();
  const [dontFetch, setDontFetch] = useState(false);
  const [postPage, setPostPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // infinite reload posts
  useEffect(() => {
    const callPostAPI = async () => {
      if (!dontFetch) {
        const { data } = await getPostAPI(postPage);
        if (data.length == 0) setDontFetch(true);
        await dispatch(LOAD_POST(data));
      }
      setLoading(false);
    };
    callPostAPI();
  }, [postPage]);

  const handleScroll = async (e) => {
    const totalHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;
    if (scrollTop + clientHeight + 1 >= totalHeight) {
      setLoading(true);
      setPostPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const elem = document.querySelector(".posts-main");
    elem.addEventListener("scroll", handleScroll);
    return () => {
      dispatch(SET_POST([]))
      elem.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="posts-main">
      <div className="posts-main-container">
        <Header />
        <Posts loading={loading} />
      </div>
      <AsideRight />
    </main>
  );
}
