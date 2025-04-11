// import Shorts from "./Shorts";
import { memo } from "react";
import CreatePost from "./CreatePost";

 function Header() {

  return (
    <header>
      {/* <Shorts /> */}
      <CreatePost />
    </header>
  )
}


export default memo(Header)