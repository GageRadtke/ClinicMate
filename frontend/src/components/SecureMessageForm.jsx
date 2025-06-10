import React, { useState } from "react";
import apiClient from "../services/api";

export default function SecureMessageForm() {
  const [recipientId, setRecipientId] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(""); // success or error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!recipientId.trim() || !content.trim()) {
      setStatus("Please fill in all fields.");
      return;
    }

    try {
      await apiClient.post("/messages", {
        recipient_id: recipientId.trim(),
        content: content.trim(),
      });
      setRecipientId("");
      setContent("");
      setStatus("Message sent successfully!");
    } catch (err) {
      setStatus("Failed to send message. Please try again.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h3 className="text-xl mb-2">Send Secure Message</h3>

      {status && (
        <div
          className={`mb-4 text-sm ${
            status.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </div>
      )}

      <label htmlFor="recipientId" className="block mb-2">
        Recipient ID
      </label>
      <input
        id="recipientId"
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        required
      />

      <label htmlFor="messageContent" className="block mb-2">
        Message Content
      </label>
      <textarea
        id="messageContent"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </form>
  );
}
