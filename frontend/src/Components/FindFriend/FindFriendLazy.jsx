import React, { Suspense } from "react";
import "./find-friend.scss";

export default function FindFriendLazy() {
  return (
    <main className="friends">
      <section>
        <div className="friend-sugg-head">
          <h2>People you may know</h2>
        </div>

        <div className="grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="card" key={i}>
              <div className="loading-skeleton round"></div>
              <div className="loading-skeleton"></div>
              <div className="loading-skeleton"></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
