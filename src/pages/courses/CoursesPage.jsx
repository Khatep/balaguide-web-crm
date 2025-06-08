"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CreateCourseModal from "./CreateCourseModal"
import { getCoursesByCenterId } from "./CoursesPageService"
import { FaDollarSign, FaClock, FaChild, FaTag, FaPlus } from "react-icons/fa"
import "./styles/courses.css"

const CoursesPage = () => {
    const [courses, setCourses] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const centerId = user?.id

    const fetchCourses = async () => {
        try {
            setLoading(true)
            const data = await getCoursesByCenterId(centerId)
            setCourses(data)
        } catch (err) {
            console.error("Error fetching courses", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [centerId])

    if (loading) {
        return (
            <div className="courses-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <span style={{ marginLeft: "1rem" }}>Loading courses...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="courses-container">
            <div className="page-header">
                <h1 className="page-title">All Courses</h1>
            </div>

            {courses.length === 0 ? (
                <div className="empty-state">
                    <h3>No courses yet</h3>
                    <p>Create your first course to get started!</p>
                </div>
            ) : (
                <div className="courses-grid">
                    {courses.map((course) => (
                        <div key={course.id} onClick={() => navigate(`/courses/${course.id}`)} className="course-card">
                            <div className="course-header">
                                <span className="course-badge">Popular</span>
                                <span className="course-type">Course</span>
                            </div>

                            <h3 className="course-title">{course.courseName}</h3>
                            <p className="course-description">{course.description}</p>

                            <div className="course-details">
                                <div className="course-detail-item">
                                    <FaDollarSign className="course-detail-icon" />
                                    <span>{course.price} ₸</span>
                                </div>
                                <div className="course-detail-item">
                                    <FaClock className="course-detail-icon" />
                                    <span>{course.durabilityByWeeks} weeks</span>
                                </div>
                                <div className="course-detail-item">
                                    <FaChild className="course-detail-icon" />
                                    <span>Age: {course.ageRange}</span>
                                </div>
                                <div className="course-detail-item">
                                    <FaTag className="course-detail-icon" />
                                    <span>{course.courseCategory}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <button onClick={() => setIsModalOpen(true)} className="create-course-btn">
                    <FaPlus />
                    Create New Course
                </button>
            </div>

            <CreateCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                centerId={centerId}
                onCreated={fetchCourses}
            />
        </div>
    )
}

export default CoursesPage
