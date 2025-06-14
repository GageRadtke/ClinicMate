import React, { useState } from "react";
import RecordViewer from "../components/RecordViewer";
import NotesSection from "../components/NotesSection";
import ScheduleManager from "../components/ScheduleManager";

function Dashboard() {
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const patients = [
    { id: "p1", name: "John Doe" },
    { id: "p2", name: "Jane Smith" },
    { id: "p3", name: "Robert Brown" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Select Patient
        </h2>
        <label
          htmlFor="patient-select"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Patient
        </label>
        <select
          id="patient-select"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSelectedPatientId(e.target.value)}
          value={selectedPatientId || ""}
        >
          <option value="">-- Select a Patient --</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>

      {selectedPatientId ? (
        <>
          <div className="lg:col-span-2">
            <RecordViewer patientId={selectedPatientId} />
          </div>
          <div>
            <NotesSection patientId={selectedPatientId} />
          </div>
        </>
      ) : (
        <div className="col-span-full text-center text-gray-500">
          Please select a patient to view records and notes.
        </div>
      )}

      <div className="col-span-full">
        <ScheduleManager />
      </div>
    </div>
  );
}

export default Dashboard;
