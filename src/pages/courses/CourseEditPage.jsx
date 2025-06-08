"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCoursesByCenterId, updateCourse } from "./CoursesPageService"
import { toast } from "react-toastify"
import { FaSave, FaArrowLeft } from "react-icons/fa"
import "./styles/modal.css"

const CourseEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        description: "",
        courseCategory: "",
        ageRange: "",
        price: 0,
        numberOfLessonsInWeek: 0,
        durabilityByWeeks: 0,
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getCoursesByCenterId(id)
                setForm(data)
            } catch (err) {
                console.error("Error fetching course", err)
                toast.error("Failed to load course data")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setSaving(true)
            await updateCourse(id, form)
            toast.success("Course updated successfully!")
            navigate("/courses")
        } catch (err) {
            console.error("Error updating course", err)
            toast.error("Error updating the course")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="courses-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <span style={{ marginLeft: "1rem" }}>Loading course...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="courses-container">
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <div className="modal-header" style={{ marginBottom: "2rem" }}>
                    <h2 className="modal-title">Edit Course</h2>
                    <button
                        onClick={() => navigate("/courses")}
                        className="btn btn-secondary"
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                        <FaArrowLeft />
                        Back to Courses
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label className="form-label">Course Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter course name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="form-textarea"
                            placeholder="Course description"
                            rows={4}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <select
                            name="courseCategory"
                            value={form.courseCategory}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select category</option>
                            <option value="PROGRAMMING">Programming</option>
                            <option value="SPORT">Sport</option>
                            <option value="LANGUAGES">Languages</option>
                            <option value="ART">Art</option>
                            <option value="MATH">Math</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Age Range</label>
                        <input
                            name="ageRange"
                            value={form.ageRange}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="e.g., 6-10"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Price (₸)</label>
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Course price"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Lessons per Week</label>
                        <input
                            name="numberOfLessonsInWeek"
                            type="number"
                            value={form.numberOfLessonsInWeek}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Number of lessons per week"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Duration (weeks)</label>
                        <input
                            name="durabilityByWeeks"
                            type="number"
                            value={form.durabilityByWeeks}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Course duration in weeks"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate("/courses")} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving && <div className="loading-spinner"></div>}
                            <FaSave />
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CourseEditPage
