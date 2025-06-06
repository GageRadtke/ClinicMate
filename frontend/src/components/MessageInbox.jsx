import React, { useEffect, useState } from "react";
import apiClient from "../services/api";

export default function MessageInbox() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await apiClient.get("/messages");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ul className="mb-6">
      {messages.map((msg) => (
        <li key={msg.message_id} className="border p-2 mb-2 rounded">
          <strong>From:</strong> {msg.sender_id.first_name} {msg.sender_id.last_name} <br />
          <strong>To:</strong> {msg.recipient_id.first_name} {msg.recipient_id.last_name} <br />
          <strong>Sent:</strong> {new Date(msg.timestamp).toLocaleString()} <br />
          <strong>Content (encrypted):</strong> {msg.content}
        </li>
      ))}
    </ul>
  );
}
