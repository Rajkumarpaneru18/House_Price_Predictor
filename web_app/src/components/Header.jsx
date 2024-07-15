import React from "react";
import house from "../../assets/house.jpg";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";
const Header = () => {
  return (
    <header className="bg-black text-white  flex relative">
      <div className="w-1/2 pl-8 pr-4 mx-12 my-11">
        <NavBar />
        <div className="container mx-auto pt-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span>Easy way to Predict</span>
            <br />
            <span>your perfect</span>
            <br />
            house Price
          </h1>
          <p className="text-lg mb-8 font-mono">
            <span> We provide various property models for you at</span> <br />
            <span>affordable prices and the best quality.</span>
          </p>
        </div>
        <Link to="main">
          <div className="w-24 h-10 rounded-lg">
            <button className="bg-orange-500 text-white py-2 px-4 rounded">
              Get price
            </button>
          </div>
        </Link>
      </div>
      <div className="w-1/2 relative">
        <img
          src={house}
          alt="Building"
          className="h-screen w-full  object-cover"
        />
        <div className="absolute top-8 right-4">
          <button className="bg-orange-500 text-white py-2 px-4 rounded-md">
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
