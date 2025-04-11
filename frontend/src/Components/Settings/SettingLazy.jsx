import React, { Suspense } from "react";

export default function SettingLazy({ component }) {
  return (
    <Suspense
      fallback={
        <main className="settings">
          <div>
            <h1>Settings</h1>
            <section>
              <div className="setting loading">
                <div></div>
                <div></div>
              </div>

              <div className="setting loading">
                <div></div>
                <div></div>
              </div>

              <div className="setting loading">
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
