// src/components/navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

function Navbar() {
  const { user, logout } = useAuth(); // Get user object and logout function

  return (
    <nav className="navbar bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="navbar-brand text-2xl font-bold">ClinicMate</Link>
      <ul className="navbar-nav flex space-x-4">
        <li className="nav-item">
          <Link to="/" className="nav-link hover:text-gray-300">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link hover:text-gray-300">Contact Medical Team</Link>
        </li>
        {/* Conditional rendering based on user authentication */}
        {user ? ( // If user exists, they are logged in
          <>
            {user.role === "patient" && (
              <li className="nav-item">
                <Link to="/patient" className="nav-link hover:text-gray-300">Patient Dashboard</Link>
              </li>
            )}
            {user.role === "doctor" && (
              <li className="nav-item">
                <Link to="/doctor" className="nav-link hover:text-gray-300">Doctor Dashboard</Link>
              </li>
            )}
            {user.role === "admin" && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link hover:text-gray-300">Admin Panel</Link>
              </li>
            )}
            <li className="nav-item">
              <button onClick={logout} className="nav-link hover:text-gray-300 bg-red-600 px-3 py-1 rounded">Logout</button>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link hover:text-gray-300 bg-blue-600 px-3 py-1 rounded">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
