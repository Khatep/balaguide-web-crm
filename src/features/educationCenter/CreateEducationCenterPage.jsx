// src/features/center/CreateEducationCenterPage.jsx
import React, { useState } from "react";
import { createEducationCenter } from "./educationCenterService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/AuthForm.css";

const CreateEducationCenterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { phoneNumber, password } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    dateOfCreated: "",
    phoneNumber: "",
    email: "",
    address: "",
    instagramLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createEducationCenter(formData);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Education Center created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to create Education Center.");
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form-form">
        <h2>Create Education Center</h2>
        {[
          "name",
          "dateOfCreated",
          "phoneNumber",
          "email",
          "address",
          "instagramLink",
        ].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "dateOfCreated" ? "date" : "text"}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            required={field !== "instagramLink"}
          />
        ))}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateEducationCenterPage;
