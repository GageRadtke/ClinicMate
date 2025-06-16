// ContactPage.jsx (Content remains the same, only filename changed)
import React from "react";

const ContactPage = () => {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Contact Medical Team</h1>
      <p className="mb-2">
        If you need help, you can reach our medical team using the contact
        details below:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          Email:{" "}
          <a
            href="mailto:medical@clinicmate.com"
            className="text-blue-500 underline"
          >
            medical@clinicmate.com
          </a>
        </li>
        <li>Phone: (123) 456-7890</li>
        <li>Hours: Monday – Friday, 9 AM – 5 PM</li>
      </ul>
      <p className="italic">
        For urgent matters, please call 911 or visit the nearest emergency room.
      </p>
    </div>
  );
};

export default ContactPage;
