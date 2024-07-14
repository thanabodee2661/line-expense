"use client"

import { useState, useEffect } from "react";
import { liff } from "@line/liff"


export default function Header() {
  // Execute liff.init() when the app is initialized
  useEffect(() => {
    console.log("start liff.init()...");
    liff
      .init({ liffId: "2005736477-2eRaENlj" })
      .then(() => {
        console.log("liff.init() done");
        if (liff.isLoggedIn()) {
          // The user can use an API that requires an access token, such as liff.getProfile().
          console.log("already logged in line");
          
        } else {
          liff.login()
        }
        // setLiffObject(liff);
      })
      .catch((error) => {
        console.log(`liff.init() failed: ${error}`);
        if (!process.env.liffId) {
          console.info(
            "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
          );
        }
      });
  }, []);

  return (
    <div className="navbar bg-base-100 mb-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">LINE</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
