"use client";

import { useContext } from "react";
import ProfileContext from "@/contexts/line";

export default function Header() {
  const profile = useContext(ProfileContext);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">LINE</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end pe-3">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={profile?.pictureUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
