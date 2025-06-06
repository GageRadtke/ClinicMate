import React, { useEffect, useState } from "react";
import apiClient from "../services/api";
import AppointmentForm from "../components/AppointmentForm";
import PrescriptionList from "../components/PrescriptionList";
import MessageInbox from "../components/MessageInbox";

export default function PatientPage() {
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchAppointments();
    fetchPrescriptions();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await apiClient.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const res = await apiClient.get("/prescriptions");
      setPrescriptions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Patient Dashboard</h2>
      <AppointmentForm onSuccess={fetchAppointments} />
      <h3 className="text-xl mt-6 mb-2">Your Appointments</h3>
      <ul className="mb-6">
        {appointments.map((appt) => (
          <li key={appt.appointment_id} className="border p-2 mb-2 rounded">
            {new Date(appt.dateTime).toLocaleString()} – Status: {appt.appointment_status}
          </li>
        ))}
      </ul>
      <h3 className="text-xl mb-2">Your Prescriptions</h3>
      <PrescriptionList prescriptions={prescriptions} />
      <h3 className="text-xl mt-6 mb-2">Secure Messages</h3>
      <MessageInbox />
    </div>
  );
}
