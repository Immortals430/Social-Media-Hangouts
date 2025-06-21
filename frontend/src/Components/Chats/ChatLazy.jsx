import React, { Suspense } from "react";
import "./chats.scss";

export default function ChatLazy() {
  return (
    <main className="chats">
      <div>
        <h1>Chats</h1>
        <section>
          <div className="chatlist-container loading">
            <div></div>
            <div></div>
          </div>
          <div className="chatlist-container loading">
            <div></div>
            <div></div>
          </div>
          <div className="chatlist-container loading">
            <div></div>
            <div></div>
          </div>
        </section>
      </div>
    </main>
  );
}
