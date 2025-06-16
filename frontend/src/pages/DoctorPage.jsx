// DoctorPage.jsx
import React, { useEffect, useState } from "react"; // Added missing imports
import apiClient from "../services/api"; // Added missing import for apiClient
import SecureMessageForm from "../components/SecureMessageForm"; // Assuming this component exists
import NotificationPopup from "../components/NotificationPopup"; // Assuming this component exists

/**
 * DoctorPage Component: Displays the doctor's dashboard with appointments, messaging, and notifications.
 */
export default function DoctorPage() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  // States for the appointment notification specific to DoctorPage
  const [showNotification, setShowNotification] = useState(false);
  const [nextAppointment, setNextAppointment] = useState(null);

  // Effect to fetch appointments and patients data
  useEffect(() => {
    Promise.all([
      apiClient.get("/appointments").then((res) => setAppointments(res.data)),
      apiClient.get("/patients").then((res) => setPatients(res.data)),
    ])
      .catch((err) => {
        setError(
          "Failed to fetch appointments or patients: " +
            (err.message || "Unknown error")
        );
      })
      .finally(() => setLoading(false));
  }, []);

  // Effect to manage success/error message display timeout
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Effect to simulate and show the next appointment notification for the doctor
  useEffect(() => {
    const mockNextAppointment = {
      id: "appt-doc-456",
      patientName: "Robert Davis",
      time: "10:00 AM",
      date: "June 12, 2025", // Changed date to be more realistic for a "next" appointment
      type: "Consultation",
    };
    setNextAppointment(mockNextAppointment);

    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []); // Runs once on component mount

  const handleSendMessage = ({ recipientId, subject, body }) => {
    apiClient
      .post("/messages/send", {
        recipientId,
        subject,
        body,
        senderRole: "doctor",
      })
      .then(() => setSuccess("Message sent successfully!"))
      .catch((err) => {
        setError(
          "Failed to send message: " +
            (err.response?.data?.message || err.message)
        );
      });
  };

  const handleAcknowledge = () => {
    setShowNotification(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto my-8 relative">
      {" "}
      {/* Added relative for notification positioning */}
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Doctor Dashboard
      </h1>
      {error && (
        <p className="text-red-600 bg-red-100 p-3 rounded mb-4">{error}</p>
      )}
      {success && (
        <p className="text-green-600 bg-green-100 p-3 rounded mb-4">
          {success}
        </p>
      )}
      {loading ? (
        <p className="text-gray-600 text-lg">
          Loading appointments and patient data...
        </p>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-blue-600">
              Upcoming Appointments
            </h2>
            {appointments.length > 0 ? (
              <ul className="space-y-3">
                {appointments.map((appt) => (
                  <li
                    key={appt.id}
                    className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200"
                  >
                    <p className="font-medium text-lg text-gray-800">
                      <span className="font-bold">{appt.patient_name}</span> at{" "}
                      {new Date(appt.appointment_time).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          appt.status === "Scheduled"
                            ? "text-green-700"
                            : "text-orange-700"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No upcoming appointments.</p>
            )}
          </div>

          <SecureMessageForm
            patients={patients}
            onSendMessage={handleSendMessage}
          />
        </>
      )}
      {/* Doctor-specific notification popup */}
      {showNotification && nextAppointment && (
        <NotificationPopup
          appointment={nextAppointment}
          onAcknowledge={handleAcknowledge}
        />
      )}
    </div>
  );
}
