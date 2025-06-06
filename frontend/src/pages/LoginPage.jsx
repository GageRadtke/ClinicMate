import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
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
