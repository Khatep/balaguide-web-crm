// src/pages/CreateGroupPage.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance"
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const CreateGroupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    minParticipants: "",
    maxParticipants: "",
    startEducationDate: "",
    language: "RU",
    course: "",
    teacher: "",
  });

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const centerId = user?.id;

        const [coursesRes, teachersRes] = await Promise.all([
          axiosInstance.get(`/api/v1/education-centers/${centerId}/courses`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axiosInstance.get(`/api/v1/teachers/${centerId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCourses(coursesRes.data);
        setTeachers(teachersRes.data.data); // так как ApiResponse<T> обёрнут
      } catch (err) {
        console.error("Failed to fetch courses or teachers:", err);
        toast.error("Ошибка при загрузке курсов или учителей.");
      }
    };

    fetchData();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axiosInstance.post(
          "/api/v1/groups/create",
          {
            ...formData,
            minParticipants: parseInt(formData.minParticipants),
            maxParticipants: parseInt(formData.maxParticipants),
            currentParticipants: 0,
            groupFull: false,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
      );
      toast.success("Group created successfully!");
      navigate("/groups");
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Failed to create group.");
    }
  };

  return (
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Group Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                required
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Min Participants</label>
              <input
                  type="number"
                  name="minParticipants"
                  value={formData.minParticipants}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                  required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Max Participants</label>
              <input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                  required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
                type="date"
                name="startEducationDate"
                value={formData.startEducationDate}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Language</label>
            <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="RU">Russian</option>
              <option value="KZ">Kazakh</option>
              <option value="EN">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Course</label>
            <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                required
            >
              <option value="">Select course</option>
              {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseName}
                  </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Teacher</label>
            <select
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                required
            >
              <option value="">Select teacher</option>
              {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName}
                  </option>
              ))}
            </select>
          </div>

          <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            ➕ Create Group
          </button>
        </form>
      </div>
  );
};

export default CreateGroupPage;
