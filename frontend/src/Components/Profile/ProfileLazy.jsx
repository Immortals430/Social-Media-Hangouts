import React, { Suspense } from "react";

export default function ProfileLazy({ component }) {
  return (
    <Suspense
      fallback={
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
      }
    >
      {component}
    </Suspense>
  );
}
