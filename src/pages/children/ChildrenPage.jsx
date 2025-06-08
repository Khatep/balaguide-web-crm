"use client"

import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { Search, ArrowUpDown, Users, BookOpen, Calendar, Phone, Mail, User } from "lucide-react"
import { FaChild, FaGraduationCap, FaBirthdayCake } from "react-icons/fa"
import "./ChildrenPage.css"

const ChildrenPage = () => {
    const [children, setChildren] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })
    const role = localStorage.getItem("role")

    useEffect(() => {
        if (role !== "EDUCATION_CENTER") return

        const fetchChildren = async () => {
            setIsLoading(true)
            try {
                const user = JSON.parse(localStorage.getItem("user"))
                const centerId = user?.id
                const res = await axiosInstance.get(`/api/v1/education-centers/${centerId}/children`)
                setChildren(res.data.data || [])
            } catch (error) {
                console.error("Failed to load children:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchChildren()
    }, [role])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const requestSort = (key) => {
        let direction = "ascending"
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending"
        }
        setSortConfig({ key, direction })
    }

    const filteredChildren = children.filter((child) => {
        const fullName = `${child.firstName} ${child.lastName}`.toLowerCase()
        return (
            fullName.includes(searchTerm.toLowerCase()) ||
            child.phoneNumber.includes(searchTerm) ||
            child.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    const sortedChildren = [...filteredChildren].sort((a, b) => {
        if (!sortConfig.key) return 0

        let aValue, bValue

        if (sortConfig.key === "name") {
            aValue = `${a.firstName} ${a.lastName}`.toLowerCase()
            bValue = `${b.firstName} ${b.lastName}`.toLowerCase()
        } else {
            aValue = a[sortConfig.key]
            bValue = b[sortConfig.key]
        }

        if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1
        return 0
    })

    const getAvatarColor = (index) => {
        const colors = ["avatar-pink", "avatar-blue", "avatar-green", "avatar-purple", "avatar-orange", "avatar-teal"]
        return colors[index % colors.length]
    }

    if (role !== "EDUCATION_CENTER") {
        return (
            <div className="children-access-denied">
                <div className="access-denied-card">
                    <FaChild className="access-denied-icon" />
                    <h2>Access Denied</h2>
                    <p>You do not have permission to view this page.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="children-page">
            <div className="children-header">
                <div className="header-content">
                    <div className="header-title">
                        <FaChild className="header-icon" />
                        <h1>Our Little Stars</h1>
                        <span className="children-count">{children.length} Students</span>
                    </div>
                    <div className="header-stats">
                        <div className="stat-card">
                            <Users className="stat-icon" />
                            <div className="stat-info">
                                <span className="stat-number">{children.length}</span>
                                <span className="stat-label">Total Students</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <BookOpen className="stat-icon" />
                            <div className="stat-info">
                <span className="stat-number">
                  {children.reduce((acc, child) => acc + child.enrolledCourses.length, 0)}
                </span>
                                <span className="stat-label">Active Enrollments</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="children-controls">
                <div className="search-section">
                    <div className="search-wrapper">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search for students..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-field"
                        />
                    </div>
                </div>

                <div className="sort-section">
                    <span className="sort-label">Sort by:</span>
                    <div className="sort-buttons">
                        <button
                            className={`sort-button ${sortConfig.key === "name" ? "active" : ""}`}
                            onClick={() => requestSort("name")}
                        >
                            <ArrowUpDown size={14} />
                            Name
                        </button>
                        <button
                            className={`sort-button ${sortConfig.key === "birthDate" ? "active" : ""}`}
                            onClick={() => requestSort("birthDate")}
                        >
                            <Calendar size={14} />
                            Age
                        </button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="children-loading">
                    <div className="loading-animation">
                        <div className="loading-circle"></div>
                        <div className="loading-circle"></div>
                        <div className="loading-circle"></div>
                    </div>
                    <p>Loading our amazing students...</p>
                </div>
            ) : sortedChildren.length === 0 ? (
                <div className="children-empty">
                    <FaGraduationCap className="empty-icon" />
                    <h3>No Students Found</h3>
                    <p>Try adjusting your search criteria</p>
                </div>
            ) : (
                <div className="children-grid">
                    {sortedChildren.map((child, index) => (
                        <div key={child.id} className="child-card">
                            <div className="card-header">
                                <div className={`child-avatar ${getAvatarColor(index)}`}>
                  <span className="avatar-text">
                    {child.firstName.charAt(0)}
                      {child.lastName.charAt(0)}
                  </span>
                                </div>
                                <div className="child-basic-info">
                                    <h3 className="child-name">
                                        {child.firstName} {child.lastName}
                                    </h3>
                                    <span className="child-gender">{child.gender}</span>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="info-grid">
                                    <div className="info-item">
                                        <Phone className="info-icon" />
                                        <div className="info-content">
                                            <span className="info-label">Phone</span>
                                            <span className="info-value">{child.phoneNumber}</span>
                                        </div>
                                    </div>

                                    <div className="info-item">
                                        <Mail className="info-icon" />
                                        <div className="info-content">
                                            <span className="info-label">Email</span>
                                            <span className="info-value">{child.email}</span>
                                        </div>
                                    </div>

                                    <div className="info-item">
                                        <FaBirthdayCake className="info-icon" />
                                        <div className="info-content">
                                            <span className="info-label">Birthday</span>
                                            <span className="info-value">{child.birthDate}</span>
                                        </div>
                                    </div>

                                    <div className="info-item">
                                        <User className="info-icon" />
                                        <div className="info-content">
                                            <span className="info-label">Parent</span>
                                            <span className="info-value">{child.parentFullName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="courses-section">
                                    <div className="courses-header">
                                        <BookOpen className="courses-icon" />
                                        <span className="courses-title">Enrolled Courses</span>
                                        <span className="courses-badge">{child.enrolledCourses.length}</span>
                                    </div>

                                    {child.enrolledCourses.length > 0 ? (
                                        <div className="courses-list">
                                            {child.enrolledCourses.map((course, courseIndex) => (
                                                <div key={courseIndex} className="course-chip">
                                                    <div className="course-info">
                                                        <span className="course-title">{course.courseTitle}</span>
                                                        <span className="course-details">
                              {course.groupName} • {course.language}
                            </span>
                                                    </div>
                                                    <div className="course-teacher">
                                                        <FaGraduationCap className="teacher-icon" />
                                                        <span>{course.teacherFullName}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="no-courses">
                                            <span>No active enrollments</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ChildrenPage
