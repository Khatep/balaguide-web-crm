import React, { useState } from "react";
import axios from "axios";
import "./CreateTeacherPage.css";
import {toast} from "react-toastify";

const CreateTeacherPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    salary: "",
    gender: "MALE",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/v1/teachers/create",
        {
          ...formData,
          salary: parseFloat(formData.salary),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Teacher created successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        birthDate: "",
        phoneNumber: "",
        email: "",
        salary: "",
        gender: "MALE",
      });
    } catch (err) {
      console.error("Error creating teacher", err);
      toast.error("Failed to create teacher.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-teacher-container">
      <h2 className="create-teacher-title">Create Teacher</h2>
      <form onSubmit={handleSubmit} className="create-teacher-form">
        <label className="create-teacher-label">
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="create-teacher-input"
            required
          />
        </label>

        <label className="create-teacher-label">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="create-teacher-input"
            required
          />
        </label>

        <label className="create-teacher-label">
          Birth Date:
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="create-teacher-input"
            required
          />
        </label>

        <label className="create-teacher-label">
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="create-teacher-input"
            required
          />
        </label>

        <label className="create-teacher-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="create-teacher-input"
            required
          />
        </label>

        <label className="create-teacher-label">
          Salary:
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="create-teacher-input"
            required
          />
        </label>

        <label className="create-teacher-label">
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="create-teacher-select"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </label>

        <button
          type="submit"
          className="create-teacher-button"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Teacher"}
        </button>
      </form>
    </div>
  );
};

export default CreateTeacherPage;
