import React, { useEffect, useState } from "react";
import apiClient from "../services/api";
import SecureMessageForm from "../components/SecureMessageForm";

export default function DoctorPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await apiClient.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await apiClient.patch(`/appointments/${id}`, { appointment_status: status });
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Doctor Dashboard</h2>
      <h3 className="text-xl mb-2">Your Appointments</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.appointment_id} className="border p-2 mb-2 rounded">
            {appt.patient_id.first_name} {appt.patient_id.last_name} –{" "}
            {new Date(appt.dateTime).toLocaleString()} – Status: {appt.appointment_status}
            <div className="mt-2">
              <button
                onClick={() => updateStatus(appt.appointment_id, "completed")}
                className="mr-2 bg-green-600 text-white px-2 py-1 rounded"
              >
                Mark Completed
              </button>
              <button
                onClick={() => updateStatus(appt.appointment_id, "canceled")}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="text-xl mt-6 mb-2">Secure Messages</h3>
      <SecureMessageForm />
    </div>
  );
}
