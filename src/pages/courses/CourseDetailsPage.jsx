"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import Modal from "react-modal"
import { FaPlus, FaEdit, FaDollarSign, FaClock, FaChild, FaTag, FaTimes } from "react-icons/fa"
import { updateCourse } from "./CoursesPageService"
import { toast } from "react-toastify"
import "./styles/course-details.css"
import "./styles/modal.css"

Modal.setAppElement("#root")

const CourseDetailsPage = () => {
    const { courseId } = useParams()
    const [course, setCourse] = useState(null)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editForm, setEditForm] = useState(null)
    const [isEditingContent, setIsEditingContent] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true)
                const res = await axiosInstance.get(`/api/v1/courses/${courseId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                })
                setCourse(res.data)
                setEditForm(res.data)
            } catch (error) {
                console.error("Error loading course", error)
                toast.error("Failed to load course details")
            } finally {
                setLoading(false)
            }
        }
        fetchCourse()
    }, [courseId])

    const handleEditChange = (e) => {
        const { name, value } = e.target
        setEditForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault()
        try {
            const updated = await updateCourse(course.id, editForm)
            setCourse(updated)
            setIsEditOpen(false)
            toast.success("Course updated successfully!")
        } catch (err) {
            console.error("Error updating course", err)
            toast.error("Error updating the course")
        }
    }

    const handleAddLesson = () => {
        const currentLessons = editForm.content || {}
        const lessonCount = Object.keys(currentLessons).length + 1
        const newKey = `Lesson_${lessonCount}`
        setEditForm((prev) => ({
            ...prev,
            content: {
                ...currentLessons,
                [newKey]: { topic: "", description: "" },
            },
        }))
    }

    if (loading) {
        return (
            <div className="course-details-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <span style={{ marginLeft: "1rem" }}>Loading course details...</span>
                </div>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="course-details-container">
                <div className="empty-state">
                    <h3>Course not found</h3>
                    <p>The requested course could not be loaded.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="course-details-container">
            <div className="course-details-header">
                <h1 className="course-details-title">{course.name}</h1>
                <button onClick={() => setIsEditOpen(true)} className="edit-btn">
                    <FaEdit />
                    Edit Course
                </button>
            </div>

            <p className="course-description">{course.description}</p>

            <div className="course-info-grid">
                <div className="course-info-item">
                    <FaDollarSign className="course-info-icon" />
                    <span className="course-info-text">{course.price} ₸</span>
                </div>
                <div className="course-info-item">
                    <FaClock className="course-info-icon" />
                    <span className="course-info-text">
            {course.durabilityByWeeks} weeks × {course.numberOfLessonsInWeek}/week
          </span>
                </div>
                <div className="course-info-item">
                    <FaChild className="course-info-icon" />
                    <span className="course-info-text">Age: {course.ageRange}</span>
                </div>
                <div className="course-info-item">
                    <FaTag className="course-info-icon" />
                    <span className="course-info-text">{course.courseCategory}</span>
                </div>
            </div>

            {(course.content || editForm?.content) && (
                <div className="course-content-section">
                    <div className="content-header">
                        <h2 className="content-title">Course Content</h2>
                        <label className="edit-toggle">
                            <input
                                type="checkbox"
                                checked={isEditingContent}
                                onChange={() => setIsEditingContent((prev) => !prev)}
                                className="edit-checkbox"
                            />
                            Edit Content
                        </label>
                    </div>

                    {!isEditingContent ? (
                        <div className="lessons-list">
                            {Object.entries(course.content).map(([lessonKey, lesson]) => (
                                <div key={lessonKey} className="lesson-item">
                                    <h3 className="lesson-title">{lesson.topic}</h3>
                                    <p className="lesson-description">{lesson.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="lessons-list">
                                {Object.entries(editForm.content).map(([lessonKey, lesson]) => (
                                    <div key={lessonKey} className="lesson-item">
                                        <div className="lesson-edit-form">
                                            <input
                                                type="text"
                                                className="lesson-input"
                                                placeholder="Lesson topic"
                                                value={lesson.topic}
                                                onChange={(e) =>
                                                    setEditForm((prev) => ({
                                                        ...prev,
                                                        content: {
                                                            ...prev.content,
                                                            [lessonKey]: {
                                                                ...prev.content[lessonKey],
                                                                topic: e.target.value,
                                                            },
                                                        },
                                                    }))
                                                }
                                            />
                                            <textarea
                                                className="lesson-textarea"
                                                placeholder="Lesson description"
                                                value={lesson.description}
                                                onChange={(e) =>
                                                    setEditForm((prev) => ({
                                                        ...prev,
                                                        content: {
                                                            ...prev.content,
                                                            [lessonKey]: {
                                                                ...prev.content[lessonKey],
                                                                description: e.target.value,
                                                            },
                                                        },
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button onClick={handleAddLesson} className="add-lesson-btn">
                                <FaPlus />
                                Add New Lesson
                            </button>
                        </>
                    )}
                </div>
            )}

            <Modal
                isOpen={isEditOpen}
                onRequestClose={() => setIsEditOpen(false)}
                contentLabel="Edit Course"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <div className="modal-header">
                    <h2 className="modal-title">Edit Course</h2>
                    <button onClick={() => setIsEditOpen(false)} className="modal-close">
                        <FaTimes />
                    </button>
                </div>

                {editForm && (
                    <form onSubmit={handleEditSubmit} className="form-container">
                        <div className="form-group">
                            <label className="form-label">Course Name</label>
                            <input
                                name="name"
                                value={editForm.name}
                                onChange={handleEditChange}
                                className="form-input"
                                placeholder="Course name"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                value={editForm.description}
                                onChange={handleEditChange}
                                className="form-textarea"
                                placeholder="Course description"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select
                                name="courseCategory"
                                value={editForm.courseCategory}
                                onChange={handleEditChange}
                                className="form-select"
                            >
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
                                value={editForm.ageRange}
                                onChange={handleEditChange}
                                className="form-input"
                                placeholder="e.g., 6-10"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Price (₸)</label>
                            <input
                                name="price"
                                type="number"
                                value={editForm.price}
                                onChange={handleEditChange}
                                className="form-input"
                                placeholder="Course price"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Lessons per Week</label>
                            <input
                                name="numberOfLessonsInWeek"
                                type="number"
                                value={editForm.numberOfLessonsInWeek}
                                onChange={handleEditChange}
                                className="form-input"
                                placeholder="Lessons per week"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Duration (weeks)</label>
                            <input
                                name="durabilityByWeeks"
                                type="number"
                                value={editForm.durabilityByWeeks}
                                onChange={handleEditChange}
                                className="form-input"
                                placeholder="Course duration"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="button" onClick={() => setIsEditOpen(false)} className="btn btn-secondary">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    )
}

export default CourseDetailsPage
