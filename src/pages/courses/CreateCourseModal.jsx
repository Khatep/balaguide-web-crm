// src/components/CreateCourseModal.jsx
import React, { useState } from "react";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstance";
import {toast} from "react-toastify";

Modal.setAppElement("#root");

const CreateCourseModal = ({ isOpen, onClose, centerId }) => {
    const [formData, setFormData] = useState({
        educationCenterId: centerId,
        name: "",
        description: "",
        courseCategory: "PROGRAMMING",
        ageRange: "",
        price: "",
        numberOfLessons: "",
        durabilityByWeeks:""
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
            await axiosInstance.post(
                "/api/v1/courses/create",
                {
                    ...formData,
                    educationCenterId: centerId,
                    price: parseFloat(formData.price),
                    numberOfLessons: parseInt(formData.numberOfLessons),
                    durabilityByWeeks: parseInt(formData.durabilityByWeeks),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success("Course created!");
            onClose();
            window.location.reload();
        } catch (err) {
            console.error("Error creating course", err);
            toast.error("Failed to create course.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Создание курса"
            className="bg-white p-6 max-w-xl max-h-[90vh] overflow-y-auto mx-auto mt-20 rounded-xl shadow-lg outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
        >
            <h2 className="text-xl font-bold mb-4">Create New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    placeholder="Course Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <select
                    name="courseCategory"
                    value={formData.courseCategory}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="PROGRAMMING">Programming</option>
                    <option value="SPORT">Sport</option>
                    <option value="LANGUAGES">Languages</option>
                    <option value="ART">Art</option>
                    <option value="MATH">Math</option>
                </select>
                <input
                    name="ageRange"
                    placeholder="Age Range (e.g., 7–10)"
                    value={formData.ageRange}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    name="price"
                    type="number"
                    placeholder="Price (₸)"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    name="numberOfLessons"
                    type="number"
                    placeholder="Number of Lessons"
                    value={formData.numberOfLessons}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    name="durabilityByWeeks"
                    type="number"
                    placeholder="Durability by weeks"
                    value={formData.durabilityByWeeks}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <div className="flex justify-end gap-2 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateCourseModal;
