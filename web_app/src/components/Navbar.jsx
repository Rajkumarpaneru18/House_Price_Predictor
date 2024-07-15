import React from "react";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <nav className="container mx-auto flex justify-between items-center">
      <div className="text-xl font-semibold flex justify-center items-center -my-10">
        <img
          src={logo}
          alt="logo"
          className="h-24 transform scale-125 w-24"
          style={{ transformOrigin: "center" }}
        />
      </div>

      <ul className="flex space-x-8">
        <li>
          <a href="#" className="hover:bg-orange-300 ">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:bg-orange-300 w-auto h-auto">
            About Us
          </a>
        </li>
        <li>
          <a href="#" className="hover:bg-orange-300 w-auto h-auto">
            How It Works?
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
