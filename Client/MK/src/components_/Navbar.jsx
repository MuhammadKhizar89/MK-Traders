import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#f8b72c] border-t-2 border-gray-600 shadow shadow-gray-300 w-100 px-8 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-center flex-wrap md:flex-nowrap">
        <div className="text-black order-3 w-full md:w-auto md:order-2">
          <ul className="flex font-bold text-xl flex-wrap">
            <li className="md:px-4 px-2 md:py-2">
              <NavLink 
                exact 
                to="/" 
                className={({ isActive }) => isActive ? "text-white" : "hover:text-white"}
              >
                Home
              </NavLink>
            </li>
            <li className="md:px-4 px-2 md:py-2">
              <NavLink 
                to="/cart" 
                className={({ isActive }) => isActive ? "text-white" : "hover:text-white"}
              >
                Cart
              </NavLink>
            </li>
            <li className="md:px-4 px-2 md:py-2">
              <NavLink 
                to="/orderDetails" 
                className={({ isActive }) => isActive ? "text-white" : "hover:text-white"}
              >
                OrderDetails
              </NavLink>
            </li>
            <li className="md:px-4 px-2 md:py-2">
              <NavLink 
                to="/aboutus" 
                className={({ isActive }) => isActive ? "text-white" : "hover:text-white"}
              >
                AboutUs
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
