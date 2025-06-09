import React, { useEffect, useState } from "react";
import apiClient from "../services/api";
import SecureMessageForm from "../components/SecureMessageForm";

export default function DoctorPage() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch appointments
    apiClient
      .get("/appointments")
      .then((response) => setAppointments(response.data))
      .catch(() => setError("Failed to fetch appointments."));

    // Fetch patients
    apiClient
      .get("/patients")
      .then((response) => setPatients(response.data))
      .catch(() => setError("Failed to fetch patients."));
  }, []);

  const handleSendMessage = ({ recipientId, subject, body }) => {
    apiClient
      .post("/messages/send", {
        recipientId,
        subject,
        body,
        senderRole: "doctor",
      })
      .then(() => {
        setSuccess("Message sent successfully!");
      })
      .catch((err) => {
        setError(
          "Failed to send message: " +
            (err.response?.data?.message || err.message)
        );
      });
  };

  return (
    <div className="p-6">
      {" "}
      {/* Was: < className=... also removed App shell structure */}
      <h1 className="text-2xl font-semibold mb-4">Doctor Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
        {appointments.length > 0 ? (
          <ul>
            {appointments.map((appt) => (
              <li key={appt.id} className="mb-2 p-2 border rounded">
                {appt.patient_name} at{" "}
                {new Date(appt.appointment_time).toLocaleString()} -{" "}
                {appt.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </div>
      <SecureMessageForm
        patients={patients}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
