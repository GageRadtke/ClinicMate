// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientPage from "./pages/PatientPage";
import DoctorPage from "./pages/DoctorPage";
import NavBar from "./components/NavBar";
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SecureMessageForm from "./components/SecureMessageForm";
<<<<<<< HEAD
import ContactPage from "./pages/ContactPage"; // Corrected: This should be .jsx if renamed
=======
import ContactPage from "./pages/ContactPage"; // Assuming ContactPage.jsx now exists
>>>>>>> bd67491df3e7b4e14a93e91ce32f87801e43da84
import RegisterPage from "./pages/RegisterPage";

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
            <Route path="/securemessageform" element={<SecureMessageForm />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Authenticated Pages */}
            <Route path="/patient" element={<PatientPage />} />
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
