// src/features/teacher/CreateTeacherPage.jsx
import React, { useState } from "react";
import { createTeacher } from "./teacherService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/AuthForm.css";

const CreateTeacherPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { phoneNumber, password } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    salary: "",
    gender: "MALE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTeacher(formData);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Teacher profile created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to create teacher profile.");
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form-form">
        <h2>Create Teacher Profile</h2>
        {[
          "firstName",
          "lastName",
          "birthDate",
          "phoneNumber",
          "email",
          "salary",
        ].map((field) => (
          <input
            key={field}
            name={field}
            type={
              field === "salary"
                ? "number"
                : field === "birthDate"
                ? "date"
                : "text"
            }
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTeacherPage;
