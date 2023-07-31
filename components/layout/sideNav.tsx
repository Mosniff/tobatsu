"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

const SideNav = () => {
  const path = usePathname();
  const params = useParams();
  const activeRoute = path.split("/")[3];

  return (
    <nav className="bg-gray-800 w-64 h-full h-screen top-0 left-0 pt-10">
      <div className="px-4">
        <ul className="mt-0">
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
