import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { format, parseISO, isSameDay } from "date-fns";
import "react-calendar/dist/Calendar.css"; // Import default styles for react-calendar

const Calender = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const highlightDates = (date) => {
    // Check if the date has any events
    return events.some((event) => isSameDay(parseISO(event.eventDate), date));
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Calendar
      </h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={({ date }) =>
            highlightDates(date) ? "bg-green-300 text-black rounded-full" : null
          }
          className="react-calendar border-none dark:bg-gray-800 dark:text-white"
        />
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Events for {format(date, "MMMM d, yyyy")}
        </h2>
        <ul className="mt-4">
          {events
            .filter((event) => isSameDay(parseISO(event.eventDate), date))
            .map((event, index) => (
              <li
                key={index}
                className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {event.eventName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {event.description}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Calender;
