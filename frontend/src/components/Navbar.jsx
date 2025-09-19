import React from "react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="h-16 w-full flex items-center justify-between bg-gray-100 px-4 shadow-md">
        <span className="font-bold text-blue-600">Smart Inventory</span>

        {/* desktop nav  */}
        <ul className="hidden md:flex space-x-4">
          <li className="px-3 py-2 cursor-pointer hover:text-blue-600">Home</li>
          <li className="px-3 py-2 cursor-pointer hover:text-blue-600">
            Products
          </li>
          <li className="px-3 py-2 cursor-pointer hover:text-blue-600">
            Sales
          </li>
          <li className="px-3 py-2 cursor-pointer hover:text-blue-600">
            Reports
          </li>
        </ul>

        {/* mob nav  */}
        <div
          className="md:hidden cursor-pointer text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </div>

        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-100 shadow-md md:hidden">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </li>
              <li
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Products
              </li>
              <li
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Sales
              </li>
              <li
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Reports
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
