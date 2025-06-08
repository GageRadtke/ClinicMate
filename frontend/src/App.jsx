import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider and useAuth
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PatientPage from "./pages/PatientPage";
import DoctorPage from "./pages/DoctorPage";
import AdminPanel from "./pages/AdminPanel"; // Assuming you have this component
import Navbar from "./components/navbar";
import ContactPage from "./pages/ContactPage"; // Assuming you have this component

/**
 * ProtectedRoute component to control access based on user authentication and role.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render if authorized.
 * @param {string} [props.role] - The required role for accessing the route.
 */
function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  // While authentication status is being determined, show a loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a role is specified and the user's role doesn't match, redirect to home page
  if (role && user.role !== role) {
    return <Navigate to="/" replace />; // Or a more specific unauthorized page
  }

  // If authorized, render the children components
  return children;
}

/**
 * The main App component that sets up routing and authentication context.
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar is placed here to be present on all pages */}
        <div className="content"> {/* Optional: A div to contain your page content */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} /> {/* Added Contact Page Route */}

            {/* Protected routes based on roles */}
            <Route
              path="/patient"
              element={
                <ProtectedRoute role="patient">
                  <PatientPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor"
              element={
                <ProtectedRoute role="doctor">
                  <DoctorPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for any undefined paths - redirects to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;