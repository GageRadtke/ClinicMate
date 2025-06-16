// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import DoctorPage from "./pages/DoctorPage";
import NavBar from "./components/NavBar";
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import SecureMessageForm from "./components/SecureMessageForm";
import ContactPage from "./pages/ContactPage";

const App = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <NavBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/SecureMessageForm" element={<SecureMessageForm />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Authenticated Pages */}
            <Route path="/patient" element={<Dashboard />} />
            <Route path="/doctor" element={<DoctorPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            {/* Fallback for unknown routes */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
export default App;
