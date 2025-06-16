// LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { login } from "../services/authService.jsx"; // Corrected: Explicitly import from .jsx
=======
import { login } from "../services/authService"; // This import needs to be updated to .jsx or checked if it's implicitly resolved
>>>>>>> bd67491df3e7b4e14a93e91ce32f87801e43da84
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl mb-4">Login to ClinicMate</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="block mb-2">Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
