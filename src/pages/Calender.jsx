import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { format, parseISO, isSameDay } from "date-fns";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../components/misc/ConfirmDeleteModal";

const Calender = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const highlightDates = (date) => {
    return events.some((event) => isSameDay(parseISO(event.eventDate), date));
  };

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.eventId !== eventId);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const editEvent = (event) => {
    navigate("/", { state: { event } });
    console.log(event);
  };

  const handleDeleteClick = (eventId) => {
    setIsModalOpen(true);
    setEventToDelete(eventId);
  };

  const handleConfirmDelete = () => {
    deleteEvent(eventToDelete);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEventToDelete(null);
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
                className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={event.bannerimage}
                    alt={event.eventName}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {event.eventName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() =>
                      navigate(`/view-event/${event.eventId}`, {
                        state: { event },
                      })
                    }
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => editEvent(event)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteClick(event.eventId)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Calender;
