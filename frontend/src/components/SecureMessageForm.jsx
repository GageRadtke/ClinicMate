import React, { useState } from "react";
import apiClient from "../services/api";

export default function SecureMessageForm() {
  const [recipientId, setRecipientId] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/messages", { recipient_id: recipientId, content });
      setRecipientId("");
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h3 className="text-xl mb-2">Send Secure Message</h3>
      <label className="block mb-2">Recipient ID</label>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        required
      />
      <label className="block mb-2">Message Content</label>
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Send
      </button>
    </form>
  );
}
