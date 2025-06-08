// src/pages/ContactPage.jsx
import React from 'react';

export default function ContactPage() {
  return (
    <div id="contact" className="features-section p-6">
        <h2 className="text-2xl mb-4">Contact Our Medical Team</h2>
        <div className="feature-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-item border p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">Clinical Support</h3>
                <p>For inquiries related to patient data, clinical workflows, or specific medical functionalities, our dedicated medical support team is ready to assist you.</p>
                <p>Email: <a href="mailto:clinicalsupport@clinicmate.com" className="text-blue-600 hover:underline">clinicalsupport@clinicmate.com</a></p>
                <p>Phone: (123) 456-7890</p>
            </div>
            <div className="feature-item border p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
                <p>Experiencing technical issues or need assistance with system integration? Our IT experts are here to provide prompt and effective solutions.</p>
                <p>Email: <a href="mailto:techsupport@clinicmate.com" className="text-blue-600 hover:underline">techsupport@clinicmate.com</a></p>
                <p>Phone: (123) 789-0123</p>
            </div>
            <div className="feature-item border p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">General Inquiries</h3>
                <p>For all other questions, feedback, or partnership opportunities, please reach out to our general inquiry department.</p>
                <p>Email: <a href="mailto:info@clinicmate.com" className="text-blue-600 hover:underline">info@clinicmate.com</a></p>
                <p>Phone: (123) 987-6543</p>
            </div>
        </div>
    </div>
  );
}