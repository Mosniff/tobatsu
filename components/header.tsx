"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <header>
      <div className="bg-tc5 h-12 flex items-center justify-end px-4 relative">
        <div
          className="w-10 flex items-center justify-center"
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon icon={faUser} className="text-3xl" />
        </div>
        {isDropdownOpen && (
          <div className="absolute bg-tc3 right-0 top-12 py-2 m-2 border border-gray-300 rounded shadow">
            <div className="px-4 py-2">
              <Link href="/account">Profile</Link>
            </div>
            <div className="px-4 py-2">
              <Link href="/gym-management">Manage Gym</Link>
            </div>
            <div className="px-4 py-2">
              <form action="/auth/signout" method="post">
                <button type="submit">Log out</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
