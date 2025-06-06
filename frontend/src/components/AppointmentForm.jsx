import React, { useState } from "react";
import apiClient from "../services/api";

export default function AppointmentForm({ onSuccess }) {
  const [doctorId, setDoctorId] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/appointments", { doctor_id: doctorId, dateTime });
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h3 className="text-xl mb-2">Book a New Appointment</h3>
      <label className="block mb-2">Doctor ID</label>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        required
      />
      <label className="block mb-2">Date & Time (ISO format)</label>
      <input
        type="datetime-local"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Book
      </button>
    </form>
  );
}
