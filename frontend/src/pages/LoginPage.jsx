// LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { login } from "../services/authService.jsx";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      loginContext(res.data.token);
      if (res.data.role === "patient") navigate("/patient");
      if (res.data.role === "doctor") navigate("/doctor");
      if (res.data.role === "admin") navigate("/admin");
    } catch (err) {
      setError(err.response?.data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80 max-w-sm" // Added max-w-sm for better responsiveness
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to ClinicMate
        </h2>
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email" // Added for better user experience
          />
        </div>

        <div className="mb-6">
          {" "}
          {/* Increased margin bottom for password field */}
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password" // Added for better user experience
          />
          {/* Forgot Password Button/Link */}
          <div className="text-right mt-2">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-blue-800 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
}
