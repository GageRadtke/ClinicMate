import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to ClinicMate</h1>
        <p className="mb-6 text-gray-700">
          Streamline your clinic’s workflow with secure messaging, scheduling,
          and patient records.
        </p>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          aria-label="Get started by logging in"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
