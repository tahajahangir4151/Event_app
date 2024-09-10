import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainContainer from "../components/MainContainer";
import Header from "../components/Header";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="flex-grow">
          <Header />
          <MainContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;
