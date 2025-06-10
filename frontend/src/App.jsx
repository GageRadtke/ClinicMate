import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import NotificationPopup from "./components/NotificationPopup";
import DoctorPage from "./pages/DoctorPage";
import NavBar from "./components/NavBar";
import WelcomeSection from "./components/WelcomeSection";
import AboutSection from "./components/AboutSection";
import HelpSection from "./components/HelpSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/LoginPage";

// Layout for pages with footer
const LayoutWithFooter = () => (
  <>
    <Outlet />
    <Footer />
  </>
);

function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    const mockNextAppointment = {
      id: "appt-123",
      patientName: "Alice Johnson",
      time: "2:00 PM",
      date: "June 10, 2025",
      type: "Follow-up",
    };
    setNextAppointment(mockNextAppointment);

    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAcknowledge = () => {
    setShowNotification(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <NavBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <Routes>
            {/* Public Pages with Footer */}
            <Route element={<LayoutWithFooter />}>
              <Route path="/" element={<WelcomeSection />} />
              <Route path="/about" element={<AboutSection />} />
              <Route path="/help" element={<HelpSection />} />
              <Route path="/contact" element={<ContactSection />} />
            </Route>

            {/* Functional Routes without footer */}
            <Route path="/patient" element={<Dashboard />} />
            <Route path="/doctor" element={<DoctorPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
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
