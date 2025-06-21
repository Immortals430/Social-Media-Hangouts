// import Shorts from "./Shorts";
import { memo } from "react";
import CreatePost from "./CreatePost";
import "../homepage.scss"

 function Header() {

  return (
    <header>
      {/* <Shorts /> */}
      <CreatePost />
    </header>
  )
}


export default memo(Header)