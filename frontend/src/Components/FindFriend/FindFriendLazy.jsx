import React, { Suspense } from "react";

export default function FindFriendLazy({ component }) {
  return (
    <Suspense
      fallback={
        <main className="friends">
          <section>
            <div className="grid">
              {Array.from({ length: 6 }).map((_,i) => (
                <div className="user-card" key={i}>
                  <div className="loading-skeleton round"></div>
                  <div className="loading-skeleton"></div>
                  <div className="loading-skeleton"></div>
                </div>
              ))}
            </div>
          </section>
        </main>
      }
    >
      {component}
    </Suspense>
  );
}
