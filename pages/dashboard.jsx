import Link from "next/link";
import React from "react";

function dashboard() {
  return (
    <div className="relative">
      <img
        src="admin/pizza.jpg"
        className="w-screen h-screen object-cover absolute -z-10"
      />
      <div className="mx-auto w-11/12 pt-14">
        <h1 className="text-primary bg-white opacity-80 rounded-lg text-2xl font-bold text-center py-3">
          Dashboard
        </h1>

        <ul
          className="rounded-3xl px-3 py-5 flex flex-col items-center mt-10"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <li className="bg-primary text-white py-3 px-4 rounded-full mb-4 w-3/4 text-center">
            <Link href="#">
              <a>Manage orders</a>
            </Link>
          </li>
          <li className="bg-primary text-white py-3 px-4 rounded-full mb-4 w-3/4 text-center">
            <Link href="#">
              <a>Manage menu</a>
            </Link>
          </li>
          <li className="bg-primary text-white py-3 px-4 rounded-full mb-4 w-3/4 text-center">
            <Link href="#">
              <a>Edit profile</a>
            </Link>
          </li>
          <button className="bg-primary text-white py-3 px-4 rounded-full w-3/4 text-center">
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
}

export default dashboard;
