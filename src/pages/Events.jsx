import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from local storage
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  return (
    <div className="p-6 max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Event List
      </h1>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.eventId}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm"
            >
              <h2 className="text-xl mb-2 font-semibold text-gray-800 dark:text-white">
                {event.eventName}
              </h2>
              <p className="text-gray-600 mb-2 dark:text-gray-300">
                Date: {format(new Date(event.eventDate), "MMMM dd, yyyy")}
              </p>
              <p className="text-gray-600 mb-2 dark:text-gray-300">
                Start Time: {event.startTime}
              </p>
              <p className="text-gray-600 mb-2 dark:text-gray-300">
                End Time: {event.endTime}
              </p>
              <p className="text-gray-600 mb-2 dark:text-gray-300">
                Time Zone: {event.timeZone}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Description: {event.description}
              </p>
              {event.videoLink ? (
                <div className="mt-2">
                  <a
                    href={event.videoLink}
                    className="text-blue-500 hover:underline"
                  >
                    Watch Video
                  </a>
                </div>
              ) : (
                <p className="text-gray-600 mt-2 dark:text-gray-300">
              No Video Available
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">No events found.</p>
      )}
    </div>
  );
};

export default Events;
