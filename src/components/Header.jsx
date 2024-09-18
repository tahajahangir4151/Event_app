import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = ({
  toggleDrawer,
  isDrawerOpen,
  loggedIn,
  email,
  setLoggedIn,
  setEmail,
  setPassword,
}) => {
  const navigate = useNavigate();
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const handleLogout = () => {
    if (!loggedIn) {
      navigate("/login");
      toast.warn("You are not logged in");
    } else {
      setLoggedIn(false);
      setEmail("");
      setPassword("");
      setShowLogoutMenu(false);
      localStorage.removeItem("userInfo");

      toast.success("Logged Out Successfully");
    }
  };

  const handleProfileIconClick = () => {
    if (loggedIn) {
      setShowLogoutMenu((prev) => !prev);
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 px-6 py-4 flex justify-between items-center shadow-md">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search ShowOps"
          className="w-full py-2 pl-12 pr-16 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-bold dark:text-gray-300 hidden sm:block">
          ⌘S
        </span>
      </div>
      <div className="flex items-center space-x-4">
        {loggedIn ? (
          <div className="relative">
            <button
              onClick={handleProfileIconClick}
              className="flex items-center space-x-2 ml-5"
            >
              <div className="bg-purple-500 text-white rounded-full p-2 flex items-center justify-center text-xl">
                {email[0].toUpperCase()}
              </div>
            </button>
            {showLogoutMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="text-gray-600 ml-5 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300 flex items-center space-x-2">
              <i className="fa-solid fa-user-circle text-xl"></i>
            </button>
          </Link>
        )}
        <button
          onClick={toggleDrawer}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300 lg:hidden"
        >
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
