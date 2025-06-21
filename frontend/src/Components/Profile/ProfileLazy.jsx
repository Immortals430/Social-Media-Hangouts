import React, { Suspense } from "react";
import "./profile.scss";

export default function ProfileLazy() {
  return (
    <main className="profile-main">
      <div className="profile-head-container loading flex">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`profile-container loading`}>
        <div className="profie-aside loading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="post-container loading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </main>
  );
}
