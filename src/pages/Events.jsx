import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleEventClick = (event) => {
    navigate(`/view-event/${event.eventId}`, { state: { event } });
  };

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
              onClick={() => handleEventClick(event)}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <div className="flex-1 mb-4 sm:mb-0 sm:mr-4">
                <h2 className="text-xl mb-2 font-semibold text-gray-800 dark:text-white">
                  {event.eventName}
                </h2>
                <p className="text-gray-600 mb-2 dark:text-gray-300">
                  <strong>Date:</strong>{" "}
                  {format(new Date(event.eventDate), "MMMM dd, yyyy")}
                </p>
                <p className="text-gray-600 mb-2 dark:text-gray-300">
                  <strong>Start Time:</strong> {event.startTime}
                </p>
                <p className="text-gray-600 mb-2 dark:text-gray-300">
                  <strong>End Time:</strong> {event.endTime}
                </p>
                <p className="text-gray-600 mb-2 dark:text-gray-300">
                  <strong>Time Zone:</strong> {event.timeZone}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Description:</strong> {event.description}
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
              </div>
              {event.bannerimage && (
                <div className="w-full sm:w-80 h-60 sm:h-80 flex-shrink-0">
                  <img
                    src={event.bannerimage}
                    alt="Event Banner"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
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
