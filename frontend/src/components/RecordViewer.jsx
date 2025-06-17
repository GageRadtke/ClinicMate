// src/components/RecordViewer.js
import React, { useState, useEffect } from "react";

function RecordViewer({ patientId }) {
  const [patientRecords, setPatientRecords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!patientId) {
      setPatientRecords(null);
      return;
    }

    const fetchPatientRecords = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/patients/${patientId}/records`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPatientRecords(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientRecords();
  }, [patientId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-96 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Patient Records
      </h2>
      {loading && (
        <p className="text-center text-blue-500">Loading records...</p>
      )}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!patientId && !loading && (
        <p className="text-center text-gray-500">
          Please select a patient to view records.
        </p>
      )}
      {patientRecords && (
        <div>
          {/* Display patient demographics */}
          <div className="mb-4 border-b pb-2">
            <h3 className="text-lg font-medium text-gray-800">
              {patientRecords.demographics?.name}
            </h3>
            <p className="text-sm text-gray-600">
              DOB: {patientRecords.demographics?.dob}
            </p>
            <p className="text-sm text-gray-600">
              Contact: {patientRecords.demographics?.contact}
            </p>
          </div>

          {/* Display medical history */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Medical History
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {patientRecords.medicalHistory?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Display medications */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800">Medications</h3>
            <ul className="list-disc list-inside text-gray-700">
              {patientRecords.medications?.map((med, index) => (
                <li key={index}>
                  {med.name} - {med.dosage}
                </li>
              ))}
            </ul>
          </div>

          {/* Display recent visits/diagnoses */}
          <div>
            <h3 className="text-lg font-medium text-gray-800">Recent Visits</h3>
            {patientRecords.recentVisits?.map((visit, index) => (
              <div key={index} className="mb-2 p-3 bg-gray-50 rounded-md">
                <p className="font-semibold">{visit.date}</p>
                <p className="text-sm text-gray-700">
                  Diagnosis: {visit.diagnosis}
                </p>
                <p className="text-sm text-gray-700">Notes: {visit.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {!patientRecords && !loading && patientId && (
        <p className="text-center text-gray-500">
          No records found for this patient.
        </p>
      )}
    </div>
  );
}

export default RecordViewer;
