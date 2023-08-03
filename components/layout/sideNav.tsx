"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

const SideNav = () => {
  const path = usePathname();
  const params = useParams();
  const activeRoute = path.split("/")[3];

  return (
    <nav className="bg-gray-800 w-60 h-screen top-0 left-0 py-8 px-8 text-xl">
      <div>
        <ul>
          <li className="mb-4">
            <Link
              className={`text-white hover:text-gray-300${
                activeRoute === undefined ? " font-semibold" : ""
              }`}
              href={`/gym-management/${params.id}`}
            >
              Overview
            </Link>
          </li>
          <li className="mb-4">
            <Link
              className={`text-white hover:text-gray-300${
                activeRoute === "members" ? " font-semibold" : ""
              }`}
              href={`/gym-management/${params.id}/members`}
            >
              Members
            </Link>
          </li>
          <li className="mb-4">
            <Link
              className={`text-white hover:text-gray-300${
                activeRoute === "classes" ? " font-semibold" : ""
              }`}
              href={`/gym-management/${params.id}/classes`}
            >
              Classes
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideNav;
