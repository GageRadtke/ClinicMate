import React from "react";

export default function PrescriptionList({ prescriptions }) {
  return (
    <ul>
      {prescriptions.map((pres) => (
        <li key={pres.prescription_id} className="border p-2 mb-2 rounded">
          {pres.medications.map((med, idx) => (
            <div key={idx}>
              {med.name} – {med.dosage} – {med.frequency}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
