// HelpPage.jsx
import React from "react";
import { Link } from "react-router-dom"; // Assuming you might want to link to other pages

const HelpPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Help & Support
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {/* FAQ Item 1 */}
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How do I reset my password?
            </h3>
            <p className="text-gray-700">
              To reset your password, please go to the{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login page
              </Link>{" "}
              and click on the "Forgot Password?" link. Follow the instructions
              sent to your registered email address.
            </p>
          </div>

          {/* FAQ Item 2 */}
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How can I book an appointment?
            </h3>
            <p className="text-gray-700">
              Patients can book appointments directly from their{" "}
              <Link to="/patient" className="text-blue-500 hover:underline">
                Patient Dashboard
              </Link>{" "}
              once logged in. Doctors can manage their schedules from the Doctor
              Dashboard.
            </p>
          </div>

          {/* FAQ Item 3 */}
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What if I have an urgent medical query?
            </h3>
            <p className="text-gray-700">
              For urgent medical matters, please do not use this portal.
              Immediately call emergency services (e.g., 911) or visit the
              nearest emergency room.
            </p>
          </div>

          {/* FAQ Item 4 */}
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I securely message my doctor?
            </h3>
            <p className="text-gray-700">
              Yes, our platform provides a secure messaging feature. You can
              access it from your respective dashboard to send and receive
              secure messages.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Need More Help?
        </h2>
        <p className="text-gray-700 mb-4">
          If you can't find the answer to your question here, please don't
          hesitate to reach out to our support team.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Contact Support
        </Link>
      </section>
    </div>
  );
};

export default HelpPage;
