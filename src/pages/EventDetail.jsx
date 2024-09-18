import React, { useState, useEffect } from "react";
import { format, differenceInMilliseconds, intervalToDuration } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";

const EventDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    if (location.state && location.state.event) {
      setEvent(location.state.event);
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (event && event.eventDate) {
      const updateRemainingTime = () => {
        const now = new Date();
        const eventDate = new Date(event.eventDate);
        const difference = differenceInMilliseconds(eventDate, now);
        const duration = intervalToDuration({ start: now, end: eventDate });

        if (difference > 0) {
          const { days, hours, minutes, seconds } = duration;
          setRemainingTime(
            `${
              days > 0 ? `${days} days ` : ""
            }${hours} hours ${minutes} minutes ${seconds} seconds`
          );
        } else {
          setRemainingTime("The event has started!");
        }
      };

      updateRemainingTime(); // Initial call
      const interval = setInterval(updateRemainingTime, 1000);
      return () => clearInterval(interval);
    }
  }, [event]);

  if (!event) return <p>Loading...</p>;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${event.bannerimage})` }}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-lg font-semibold bg-gray-800 bg-opacity-50 p-2 rounded"
      >
        Back
      </button>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-6 rounded-lg shadow-lg max-w-lg mx-4">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            {event.eventName}
          </h1>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            <strong>Date:</strong>{" "}
            {event.eventDate
              ? format(new Date(event.eventDate), "MMMM dd, yyyy")
              : "Date not available"}
          </p>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            <strong>Start Time:</strong> {event.startTime}
          </p>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            <strong>End Time:</strong> {event.endTime}
          </p>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            <strong>Time Zone:</strong> {event.timeZone}
          </p>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            <strong>Description:</strong> {event.description}
          </p>
          <p className="font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Time Remaining: {remainingTime}
          </p>
          {event.videoLink && (
            <a
              href={event.videoLink}
              className="text-blue-500 hover:underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Video
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
