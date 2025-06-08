// src/pages/teachers/ScanAttendancePage.jsx
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ScanAttendancePage = () => {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("lessonId");
  const groupId = searchParams.get("groupId");
  const [childId, setChildId] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/attendance", {
        lessonId: parseInt(lessonId),
        groupId: parseInt(groupId),
        childId: parseInt(childId),
      });
      setStatus("✅ Attendance recorded successfully!");
    } catch (err) {
      console.error("❌ Error marking attendance", err);
      setStatus("❌ Failed to mark attendance");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Scan Attendance</h2>
      <p>Lesson ID: {lessonId}</p>
      <p>Group ID: {groupId}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Child ID:
          <input
            type="number"
            value={childId}
            onChange={(e) => setChildId(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">📌 Mark Attendance</button>
      </form>

      <p>{status}</p>
    </div>
  );
};

export default ScanAttendancePage;
