// src/components/NotesSection.js
import React, { useState, useEffect } from "react";

function NotesSection({ patientId }) {
  const [noteContent, setNoteContent] = useState("");
  const [existingNotes, setExistingNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!patientId) {
      setExistingNotes([]);
      return;
    }

    const fetchNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/patients/${patientId}/notes`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExistingNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [patientId]);

  const handleSaveNote = async () => {
    if (!noteContent.trim() || !patientId) {
      alert("Please select a patient and enter some notes.");
      return;
    }

    setUploading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint for saving notes
      const response = await fetch(`/api/patients/${patientId}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: noteContent,
          patientId: patientId,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newNote = await response.json(); // Assuming your API returns the saved note
      setExistingNotes((prevNotes) => [...prevNotes, newNote]);
      setNoteContent(""); // Clear the textarea
      alert("Note saved successfully!");
    } catch (err) {
      setError(err.message);
      alert(`Failed to save note: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-96 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Patient Notes
      </h2>

      {patientId ? (
        <>
          <div className="flex-1 overflow-y-auto mb-4 border border-gray-200 rounded-md p-3">
            {loading && (
              <p className="text-center text-blue-500">Loading notes...</p>
            )}
            {error && (
              <p className="text-center text-red-500">Error: {error}</p>
            )}
            {existingNotes.length === 0 && !loading && !error && (
              <p className="text-center text-gray-500">
                No notes for this patient yet.
              </p>
            )}
            {existingNotes.map((note) => (
              <div key={note.id} className="mb-3 p-2 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-800">{note.content}</p>
                <p className="text-xs text-gray-500 text-right">
                  {new Date(note.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <textarea
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows="5"
            placeholder="Type your notes here..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          ></textarea>
          <button
            onClick={handleSaveNote}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            disabled={!noteContent.trim() || uploading}
          >
            {uploading ? "Saving..." : "Save Note"}
          </button>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          Please select a patient to take notes.
        </p>
      )}
    </div>
  );
}

export default NotesSection;
