import React, { Suspense } from "react";

export default function ChatLazy({ component }) {
  return (
    <Suspense
      fallback={
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
      }
    >
      {component}
    </Suspense>
  );
}
