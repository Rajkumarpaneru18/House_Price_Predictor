import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import HousePricePredictor from "../components/PropertiesForm";

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="shadow-2xl h-24 flex items-center justify-center">
        <NavBar />
      </div>

      <main className="flex-grow">
        <HousePricePredictor />
      </main>

      <Footer className="bg-gray-200 shadow-2xl h-24 flex items-center justify-center" />
    </div>
  );
};

export default MainPage;
