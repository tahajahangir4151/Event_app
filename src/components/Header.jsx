import React from "react";

const Header = ({ toggleDrawer, isDrawerOpen }) => {
  return (
    <header className="bg-white dark:bg-gray-800 px-6 py-4 flex justify-between items-center shadow-md">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search ShowOps"
          className="w-full py-2 pl-12 pr-16 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1D211C] dark:text-gray-300">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#1D211C] font-bold dark:text-gray-300 hidden sm:block">
          ⌘S
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300">
          <i className="fas fa-bell"></i>
        </button>
        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300">
          <i className="fas fa-user-circle"></i>
        </button>
        <button
          onClick={toggleDrawer}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300 lg:hidden"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
