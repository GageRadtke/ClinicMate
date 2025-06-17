// AdminPanel.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../services/api.jsx";
import ScheduleManager from "../components/ScheduleManager.jsx";
import MessageInbox from "../components/MessageInbox.jsx";
import SecureMessageForm from "../components/SecureMessageForm.jsx"; // Added missing import
import PrescriptionList from "../components/PrescriptionList.jsx";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await apiClient.get("/auth/users"); // assume an admin route exists
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {" "}
      {/* Added React Fragment to wrap multiple top-level elements */}
      <div className="p-6">
        <h2 className="text-2xl mb-4">Admin Panel</h2>
        <h3 className="text-xl mb-2">All Registered Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="border p-2 mb-2 rounded">
              {user.first_name} {user.last_name} – {user.email} – {user.role}
            </li>
          ))}
        </ul>
      </div>
      {/* These components are now correctly placed within the Fragment */}
      <ScheduleManager />
      <MessageInbox />
      <SecureMessageForm />
      <PrescriptionList />
    </> // Closed React Fragment
  );
}
//Note: For AdminPanel, you’d need a corresponding backend route (/api/auth/users)
