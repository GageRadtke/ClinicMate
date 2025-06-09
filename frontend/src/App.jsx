import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom"; // Import routing components

import Header from "./components/Header"; // Ensure this path is correct
import Dashboard from "./pages/Dashboard"; // Ensure this path is correct, e.g., if Dashboard is a page
import NotificationPopup from "./components/NotificationPopup"; // Ensure this path is correct
import DoctorPage from "./pages/DoctorPage"; // Import DoctorPage
import NavBar from "./components/NavBar"; // Import NavBar

function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [nextAppointment, setNextAppointment] = useState(null); // This would come from your API

  useEffect(() => {
    // In a real app, you'd fetch the next appointment from your API here
    // For demonstration, let's mock it
    const mockNextAppointment = {
      id: "appt-123",
      patientName: "Alice Johnson",
      time: "2:00 PM",
      date: "June 10, 2025",
      type: "Follow-up",
    };
    setNextAppointment(mockNextAppointment);

    // Show notification after a delay (or based on real-time event)
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer); // Cleanup
  }, []);

  const handleAcknowledge = () => {
    setShowNotification(false);
    // You might want to update a flag in your database here
    // to prevent showing the same notification again for this session/user.
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <NavBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        {/* Basic navigation links */}

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/doctor" element={<DoctorPage />} />
            {/* Add other routes here as needed */}
            <Route path="*" element={<div>Page Not Found</div>} />{" "}
            {/* Fallback for unknown paths */}
          </Routes>
        </main>
      </div>
      {showNotification && nextAppointment && (
        <NotificationPopup
          appointment={nextAppointment}
          onAcknowledge={handleAcknowledge}
        />
      )}
    </div>
  );
}

export default App;
