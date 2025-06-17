// PrescriptionList.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../services/api.jsx"; // Ensure correct import path

export default function PrescriptionList() {
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]); // State to hold the list of patients
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock patient data (replace with actual API call to /patients endpoint)
  const mockPatients = [
    { id: "patient1", name: "Alice Wonderland" },
    { id: "patient2", name: "Bob The Builder" },
    { id: "patient3", name: "Charlie Chaplin" },
    // Add more mock patients or fetch from your backend:
    // { id: "p4", name: "Dr. Who" },
    // { id: "p5", name: "Darth Vader" },
  ];

  // Fetch patients on component mount
  useEffect(() => {
    // In a real app, you would fetch from your backend:
    // apiClient.get('/patients').then(res => setPatients(res.data)).catch(err => console.error(err));
    setPatients(mockPatients); // Using mock data for now
  }, []);

  // Fetch prescriptions whenever selectedPatientId changes
  useEffect(() => {
    if (selectedPatientId) {
      setLoading(true);
      setError("");
      // Simulate API call to fetch prescriptions for the selected patient
      // In a real app, this would be:
      // apiClient.get(`/prescriptions?patientId=${selectedPatientId}`)
      //   .then(res => {
      //     setPrescriptions(res.data);
      //     setLoading(false);
      //   })
      //   .catch(err => {
      //     setError("Failed to fetch prescriptions for selected patient.");
      //     console.error(err);
      //     setLoading(false);
      //   });

      // --- Mocking prescription data based on selected patient for demonstration ---
      const fetchedPrescriptions =
        mockPrescriptionsByPatient[selectedPatientId] || [];
      setTimeout(() => {
        // Simulate network delay
        setPrescriptions(fetchedPrescriptions);
        setLoading(false);
      }, 500);
      // --- End Mocking ---
    } else {
      setPrescriptions([]); // Clear prescriptions if no patient is selected
    }
  }, [selectedPatientId]);

  // Mock data for prescriptions by patient ID
  const mockPrescriptionsByPatient = {
    patient1: [
      {
        prescription_id: "p_alpha_001",
        medications: [
          { name: "Amoxicillin", dosage: "500mg", frequency: "TID" },
        ],
        date_prescribed: "2024-05-01",
        status: "Active",
      },
      {
        prescription_id: "p_alpha_002",
        medications: [{ name: "Ibuprofen", dosage: "200mg", frequency: "PRN" }],
        date_prescribed: "2024-04-15",
        status: "Active",
      },
    ],
    patient2: [
      {
        prescription_id: "p_beta_001",
        medications: [{ name: "Metformin", dosage: "850mg", frequency: "BID" }],
        date_prescribed: "2024-03-20",
        status: "Active",
      },
      {
        prescription_id: "p_beta_002",
        medications: [{ name: "Lisinopril", dosage: "10mg", frequency: "QD" }],
        date_prescribed: "2024-05-10",
        status: "Active",
      },
    ],
    patient3: [
      {
        prescription_id: "p_gamma_001",
        medications: [
          { name: "Atorvastatin", dosage: "20mg", frequency: "QD" },
        ],
        date_prescribed: "2024-06-01",
        status: "Active",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Prescription Viewer Tool
      </h2>

      <div className="mb-6">
        <label
          htmlFor="patient-select"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Select Patient:
        </label>
        <select
          id="patient-select"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
        >
          <option value="">-- Choose a patient --</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-600">Loading prescriptions...</p>
      ) : (
        <>
          {selectedPatientId && prescriptions.length > 0 ? (
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">
                Prescriptions for{" "}
                {patients.find((p) => p.id === selectedPatientId)?.name ||
                  "Selected Patient"}
              </h3>
              <ul className="space-y-4">
                {prescriptions.map((pres) => (
                  <li
                    key={pres.prescription_id}
                    className="border border-gray-200 p-4 rounded-md bg-gray-50 shadow-sm"
                  >
                    <p className="font-medium text-lg text-gray-800 mb-2">
                      Prescribed on:{" "}
                      {new Date(pres.date_prescribed).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      Status:{" "}
                      <span className="font-semibold text-green-700">
                        {pres.status}
                      </span>
                    </p>
                    <h4 className="text-md font-semibold text-gray-700 mb-1">
                      Medications:
                    </h4>
                    <ul className="list-disc list-inside ml-4 text-gray-700">
                      {pres.medications.map((med, idx) => (
                        <li key={idx} className="mb-1">
                          <strong>{med.name}</strong> - {med.dosage} -{" "}
                          {med.frequency}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ) : selectedPatientId ? (
            <p className="text-gray-600">
              No prescriptions found for this patient.
            </p>
          ) : (
            <p className="text-gray-600">
              Please select a patient to view prescriptions.
            </p>
          )}
        </>
      )}
    </div>
  );
}
