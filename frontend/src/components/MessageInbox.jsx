// MessageInbox.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../services/api.jsx"; // Corrected: Explicitly import from .jsx

export default function MessageInbox() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // Assuming the backend returns messages relevant to the authenticated user
      const res = await apiClient.get("/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      // Optionally set an error state to display to the user
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      {" "}
      {/* Added styling for a 'window' effect */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Inbox</h2>
      {messages.length === 0 ? (
        <p className="text-gray-600">No messages to display.</p>
      ) : (
        <ul className="space-y-4">
          {" "}
          {/* Added spacing between message items */}
          {messages.map((msg) => (
            <li
              key={msg.message_id}
              className="border border-gray-200 p-4 rounded-md bg-gray-50"
            >
              <p className="text-sm text-gray-500 mb-1">
                <strong>From:</strong> {msg.sender_id?.first_name}{" "}
                {msg.sender_id?.last_name || "Unknown Sender"}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>To:</strong> {msg.recipient_id?.first_name}{" "}
                {msg.recipient_id?.last_name || "Unknown Recipient"}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Sent:</strong>{" "}
                {new Date(msg.timestamp).toLocaleString()}
              </p>
              <div className="bg-white p-3 border border-gray-300 rounded-sm">
                <strong className="text-gray-700">Content (encrypted):</strong>{" "}
                <span className="text-gray-900">{msg.content}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
