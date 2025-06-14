// src/components/NotificationPopup.js
import React from "react";
import { createPortal } from "react-dom";

function NotificationPopup({ appointment, onAcknowledge }) {
  // Use React Portal to render the notification outside the main DOM tree
  // This helps with z-index and ensures it's always on top.
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full animate-fade-in-down">
        <h3 className="text-2xl font-bold text-blue-700 mb-4">
          Upcoming Appointment!
        </h3>
        <p className="text-lg text-gray-800 mb-2">
          <span className="font-semibold">Patient:</span>{" "}
          {appointment.patientName}
        </p>
        <p className="text-lg text-gray-800 mb-2">
          <span className="font-semibold">Date:</span> {appointment.date}
        </p>
        <p className="text-lg text-gray-800 mb-4">
          <span className="font-semibold">Time:</span> {appointment.time}
        </p>
        {appointment.type && (
          <p className="text-md text-gray-700 mb-4">
            <span className="font-semibold">Type:</span> {appointment.type}
          </p>
        )}
        <button
          onClick={onAcknowledge}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Acknowledge
        </button>
      </div>
    </div>,
    document.body // Render into the body
  );
}

export default NotificationPopup;
