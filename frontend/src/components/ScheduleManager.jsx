// src/components/ScheduleManager.js
import React, { useState, useEffect } from "react";

function ScheduleManager() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppt, setNewAppt] = useState({
    patientName: "",
    date: "",
    time: "",
    type: "",
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/appointments");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppt({ ...newAppt, [name]: value });
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    if (!newAppt.patientName || !newAppt.date || !newAppt.time) {
      alert("Please fill in all required appointment fields.");
      return;
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppt),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const addedAppt = await response.json();
      setAppointments((prev) => [...prev, addedAppt]);
      setNewAppt({ patientName: "", date: "", time: "", type: "" });
      setShowAddForm(false);
      alert("Appointment added successfully!");
    } catch (err) {
      setError(err.message);
      alert(`Failed to add appointment: ${err.message}`);
    }
  };

  const handleRemoveAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to remove this appointment?")) {
      return;
    }

    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      alert("Appointment removed successfully!");
    } catch (err) {
      setError(err.message);
      alert(`Failed to remove appointment: ${err.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Appointment Schedule
      </h2>

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 mb-4"
      >
        {showAddForm ? "Hide Form" : "Add New Appointment"}
      </button>

      {showAddForm && (
        <form
          onSubmit={handleAddAppointment}
          className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50"
        >
          <h3 className="text-lg font-medium mb-3">Add New Appointment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="patientName"
                className="block text-sm font-medium text-gray-700"
              >
                Patient Name:
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={newAppt.patientName}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={newAppt.date}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time:
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={newAppt.time}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type:
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={newAppt.type}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                placeholder="e.g., Check-up, Follow-up"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Appointment
          </button>
        </form>
      )}

      {loading && (
        <p className="text-center text-blue-500">Loading appointments...</p>
      )}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && appointments.length === 0 && (
        <p className="text-center text-gray-500">No appointments scheduled.</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appt.patientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appt.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appt.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appt.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleRemoveAppointment(appt.id)}
                    className="text-red-600 hover:text-red-900 ml-2"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScheduleManager;
