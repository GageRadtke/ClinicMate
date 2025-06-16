import React, { useState } from "react";
import apiClient from "../services/api"; // Assuming apiClient handles your base URL
import { useNavigate } from "react-router-dom"; // For redirection after successful registration

const RegisterPage = () => {
  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // For success or error messages
  const [error, setError] = useState(""); // For specific error messages

  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    setMessage(""); // Clear previous messages
    setError(""); // Clear previous errors

    // Basic client-side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 12) {
      setError("Password must be at least 12 characters long.");
      return;
    }

    try {
      // Make a POST request to your backend's registration endpoint
      // Ensure your backend has a route like /api/auth/register or similar
      const response = await apiClient.post("/auth/register", {
        // Adjust endpoint as per your backend
        email,
        password,
      });

      // Handle successful registration
      if (response.data && response.data.token) {
        // If your backend returns a token upon registration, save it
        localStorage.setItem("token", response.data.token);
        setMessage("Registration successful! Redirecting to dashboard...");
        // Optionally, save user info if returned
        // localStorage.setItem('userInfo', JSON.stringify(response.data.user));

        // Redirect to a dashboard or login page after a short delay
        setTimeout(() => {
          navigate("/patient"); // Or wherever your user dashboard is
        }, 1500);
      } else {
        setMessage("Registration successful, but no token received.");
      }
    } catch (err) {
      // Handle errors from the backend (e.g., duplicate email, server error)
      console.error("Registration error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display error message from backend
      } else {
        setError("Registration failed. Please try again."); // Generic error
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register for ClinicMate
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Message and Error Display */}
          {message && (
            <p className="text-green-600 text-sm text-center">{message}</p>
          )}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
