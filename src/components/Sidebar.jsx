import React, { useState } from "react";
import { Link } from "react-router-dom";
import viperRoomImg from "../images/viperRoom.avif";
import jasonImg from "../images/Jason+Isbell+Southeastern+Reissue.jpg";
import trobadorImg from "../images/trobadour.jpg";

const Sidebar = ({ toggleDarkMode, darkMode }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  // Menu items with route paths
  const menuItems = [
    { name: "Dashboard", icon: "fas fa-th-large" },
    { name: "Calendar", icon: "fas fa-calendar" },
    { name: "Events", icon: "fas fa-bookmark" },
    { name: "Offers & Deals", icon: "fas fa-briefcase" },
    { name: "Settings", icon: "fas fa-sliders-h" },
  ];

  // Handle the active menu item
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-6 flex flex-col min-h-screen justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
          <i className="fas fa-cog mr-2"></i>ShowOps
        </h2>

        {/* Navigation Menu */}
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-4">
                <Link
                  //   to={item.path}
                  onClick={() => handleItemClick(item.name)}
                  className={`flex items-center text-[#040E0082] dark:text-gray-300 p-2  rounded-lg 
                    ${
                      activeItem === item.name
                        ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                >
                  <i className={`${item.icon} mr-3`}></i>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Today Events Section  */}
        <div className="mt-8">
          <h3 className="text-[#040E0082] dark:text-gray-400 mb-4 font-bold">
            Today's Event
          </h3>
          <div className="space-y-6">
            <div className="items-center flex space-x-4">
              <div className="flex items-center space-x-4">
                <img
                  //   src="https://via.placeholder.com/40"
                  src={viperRoomImg}
                  alt="The Viper Room"
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <span className="block text-[#1D211C] dark:text-white">
                    Tourist
                  </span>
                  <span className="block text-[#1D211C] font-[630] dark:text-white">
                    The Viper Room
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                // src="https://via.placeholder.com/40"
                src={jasonImg}
                alt="The Wiltern"
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <span className="block  text-[#1D211C] dark:text-white">
                  Jason Isbell
                </span>
                <span className="block  text-[#1D211C] font-[630] dark:text-white">
                  The Wiltern
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                // src="https://via.placeholder.com/40"
                src={trobadorImg}
                alt="The Troubadour"
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <span className="block  text-[#1D211C] dark:text-white">
                  Brenn!
                </span>
                <span className="block  text-[#1D211C] font-[630] dark:text-white">
                  The Troubadour
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Footer section  */}
        <div className="mt-8">
          <label className="flex items-center relative cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="sr-only"
            />
            <div className="w-10 h-[24px] bg-gray-300 rounded-full relative dark:bg-gray-600">
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${
                  darkMode ? "translate-x-4" : ""
                }`}
              >
                {darkMode ? (
                  <i className="fas fa-sun text-yellow-400"></i>
                ) : (
                  <i className="fas fa-moon text-gray-600"></i>
                )}
              </div>
            </div>
            <span className="ml-3 text-gray-600 dark:text-white">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </label>{" "}
          <div className="mt-10 text-gray-600 dark:text-gray-400">
            <Link className="block text-sm text-[#006514D5] font-[500]">
              Terms of Use
            </Link>
            <Link className="block text-sm text-[#006514D5] font-[500]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
