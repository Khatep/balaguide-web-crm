"use client"

import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { useNavigate } from "react-router-dom"
import { Search, Plus, ArrowUpDown } from "lucide-react"
import "./TeachersPage.css"

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })
  const role = localStorage.getItem("role")
  const navigate = useNavigate()

  useEffect(() => {
    if (role !== "EDUCATION_CENTER") return
    const fetchTeachers = async () => {
      setIsLoading(true)
      try {
        const token = localStorage.getItem("token")
        const user = JSON.parse(localStorage.getItem("user"))
        const centerId = user?.id
        const res = await axiosInstance.get(`/api/v1/teachers/${centerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTeachers(res.data.data)
      } catch (err) {
        console.error("Error fetching teachers", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTeachers()
  }, [role])

  const handleCreateTeacher = () => {
    navigate("/create-teacher2")
  }

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

  const filteredTeachers = teachers.filter((teacher) => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase()
    return (
        fullName.includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.phoneNumber.includes(searchTerm)
    )
  })

  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    if (!sortConfig.key) return 0

    let aValue, bValue

    if (sortConfig.key === "name") {
      aValue = `${a.firstName} ${a.lastName}`
      bValue = `${b.firstName} ${b.lastName}`
    } else {
      aValue = a[sortConfig.key]
      bValue = b[sortConfig.key]
    }

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  if (role !== "EDUCATION_CENTER") {
    return (
        <div className="access-denied">
          <div className="access-denied-content">
            <h2>Доступ запрещен</h2>
            <p>У вас нет прав для просмотра этой страницы.</p>
          </div>
        </div>
    )
  }

  return (
      <div className="teachers-container">
        <div className="teachers-header">
          <h1>All Teachers</h1>
          <button className="btn-create" onClick={handleCreateTeacher}>
            <Plus size={16} />
            <span>Create New Teacher</span>
          </button>
        </div>

        <div className="teachers-tools">
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
          </div>

          <div className="sort-filters">
            <button
                className={`sort-btn ${sortConfig.key === "name" ? "active" : ""}`}
                onClick={() => requestSort("name")}
            >
              <ArrowUpDown size={16} />
              <span>Name</span>
            </button>
            <button
                className={`sort-btn ${sortConfig.key === "salary" ? "active" : ""}`}
                onClick={() => requestSort("salary")}
            >
              <ArrowUpDown size={16} />
              <span>Salary</span>
            </button>
          </div>
        </div>

        {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Загрузка преподавателей...</p>
            </div>
        ) : sortedTeachers.length === 0 ? (
            <div className="no-results">
              <p>Преподаватели не найдены</p>
            </div>
        ) : (
            <div className="teachers-grid">
              {sortedTeachers.map((teacher) => (
                  <div key={teacher.id} className="teacher-card">
                    <div className="teacher-avatar">
                      {teacher.firstName.charAt(0)}
                      {teacher.lastName.charAt(0)}
                    </div>
                    <div className="teacher-info">
                      <h3 className="teacher-name">
                        {teacher.firstName} {teacher.lastName}
                      </h3>
                      <div className="teacher-details">
                        <div className="detail-item">
                          <span className="detail-label">Phone:</span>
                          <span className="detail-value">{teacher.phoneNumber}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Email:</span>
                          <span className="detail-value">{teacher.email}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Gender:</span>
                          <span className="detail-value">{teacher.gender}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Date of birth:</span>
                          <span className="detail-value">{teacher.birthDate}</span>
                        </div>
                      </div>
                      <div className="teacher-salary">
                        <span className="salary-label">Salary:</span>
                        <span className="salary-value">₸{teacher.salary.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  )
}

export default TeachersPage
