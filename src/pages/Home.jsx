import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainContainer from "../components/MainContainer";
import Calender from "./Calender";
import Events from "./Events";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          isDrawerOpen={isDrawerOpen}
          closeDrawer={closeDrawer}
        />
        <div className="flex-grow">
          <Header toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
          <main>
            <Routes>
              <Route path="/" element={<MainContainer />} />
              <Route path="/calender" element={<Calender />} />
              <Route path="/events" element={<Events />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
