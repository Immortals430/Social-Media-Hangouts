import React, { Suspense } from "react";
import "./settings.scss"

export default function SettingLazy() {
  return (

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

  );
}
