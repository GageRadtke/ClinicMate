import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-gray-100">
        ClinicMate
      </Link>
      <ul className="flex space-x-4 items-center">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/SecureMessageForm" className="hover:text-gray-300">
            Contact Medical Team
          </Link>
        </li>

        {user ? (
          <>
            {user.role === "patient" && (
              <li>
                <Link to="/patient" className="hover:text-gray-300">
                  Patient Dashboard
                </Link>
              </li>
            )}
            {user.role === "doctor" && (
              <li>
                <Link to="/doctor" className="hover:text-gray-300">
                  Doctor Dashboard
                </Link>
              </li>
            )}
            {user.role === "admin" && (
              <li>
                <Link to="/admin" className="hover:text-gray-300">
                  Admin Panel
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
export default NavBar;
