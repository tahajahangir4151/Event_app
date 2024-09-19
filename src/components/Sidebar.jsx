import React from "react";
import eventImage from "../images/Event image.jpg";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ darkMode, toggleDarkMode, isDrawerOpen, closeDrawer }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = React.useState("Dashboard");
  const [todayEvents, setTodayEvents] = React.useState([]);

  const menuItems = [
    { name: "Dashboard", icon: "fas fa-th-large", path: "/" },
    { name: "Calendar", icon: "fas fa-calendar", path: "/Calender" },
    { name: "Events", icon: "fas fa-bookmark", path: "/Events" },
    { name: "Offers & Deals", icon: "fas fa-briefcase", path: "/Deals" },
    { name: "Settings", icon: "fas fa-sliders-h", path: "/Settings" },
  ];

  React.useEffect(() => {
    const currentPath = location.pathname;
    const activeMenuItem = menuItems.find((item) => item.path === currentPath);
    if (activeMenuItem) {
      setActiveItem(activeMenuItem.name);
    }
  }, [location.pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item);
    closeDrawer();
  };

  const fetchEvents = () => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const today = new Date().toISOString().split("T")[0];
    const eventsToday = storedEvents.filter(
      (event) => event.eventDate === today
    );
    setTodayEvents(eventsToday);
  };

  React.useEffect(() => {
    fetchEvents();

    const handleStorageChange = (e) => {
      if (e.storageArea === localStorage) {
        fetchEvents();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 p-6 flex flex-col min-h-screen justify-between z-50 transform ${
        isDrawerOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64`}
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
          <i className="fas fa-cog mr-2"></i>ShowOps
        </h2>

        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-4">
                <Link
                  onClick={() => handleItemClick(item.name)}
                  to={item.path}
                  className={`flex items-center text-[#040E0082] dark:text-gray-300 p-2 rounded-lg ${
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

        <div className="mt-8">
          <h3 className="text-[#040E0082] dark:text-gray-400 mb-4 font-bold">
            Today's Event
          </h3>
          <div className="space-y-6">
            {todayEvents.length > 0 ? (
              todayEvents.map((event, index) => (
                <div key={index} className="items-center flex space-x-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={event.bannerimage}
                      alt={event.eventName}
                      className="w-10 h-10 rounded-lg "
                    />
                    <div>
                      <span className="block text-[#1D211C] dark:text-white">
                        {event.eventName}
                      </span>
                      <span className="block text-[#1D211C] font-[630] dark:text-white">
                        {event.description}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                No events for today.
              </p>
            )}
          </div>
        </div>

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
          </label>
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
