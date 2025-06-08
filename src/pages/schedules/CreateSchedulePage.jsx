// src/pages/CreateSchedulePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateSchedulePage.css";
import {toast} from "react-toastify";

const CreateSchedulePage = () => {
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({
    groupId: "",
    dayOfWeek: "MONDAY",
    startTime: "",
    endTime: "",
    timeZone: "Asia/Almaty",
  });

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/v1/groups", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGroups(res.data);
      } catch (err) {
        console.error("Failed to load groups", err);
      }
    };
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/v1/create-schedule",
        {
          ...formData,
          startTime: `${formData.startTime}:00`, // format HH:mm:ss
          endTime: `${formData.endTime}:00`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Schedule created successfully!");
    } catch (err) {
      console.error("Failed to create schedule", err);
      toast.error("Error occurred.");
    }
  };

  return (
    <div className="schedule-create-container">
      <h2>Create Group Schedule</h2>
      <form onSubmit={handleSubmit} className="schedule-form">
        <label>
          Select Group:
          <select
            name="groupId"
            value={formData.groupId}
            onChange={handleChange}
            className="schedule-input"
            required
          >
            <option value="">-- Choose Group --</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Day of Week:
          <select
            name="dayOfWeek"
            value={formData.dayOfWeek}
            onChange={handleChange}
            className="schedule-input"
          >
            {[
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY",
            ].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>

        <label>
          Start Time:
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="schedule-input"
            required
          />
        </label>

        <label>
          End Time:
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="schedule-input"
            required
          />
        </label>

        <button type="submit" className="schedule-submit-button">
          Create Schedule
        </button>
      </form>
    </div>
  );
};

export default CreateSchedulePage;
