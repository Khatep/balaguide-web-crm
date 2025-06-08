"use client"
import { useNavigate } from "react-router-dom"
import { BiBookOpen, BiGroup, BiCalendar, BiUser } from "react-icons/bi"
import { HiOutlineAcademicCap } from "react-icons/hi"

const GroupCard = ({ group }) => {
    const navigate = useNavigate()

    const getStatusColor = () => {
        if (group.groupFull) return "bg-red-100 text-red-800"
        if (group.currentParticipants === 0) return "bg-gray-100 text-gray-800"
        return "bg-green-100 text-green-800"
    }

    const getStatusText = () => {
        if (group.groupFull) return "Group is full"
        if (group.currentParticipants === 0) return "No children"
        return "Active"
    }

    const participantsPercentage = (group.currentParticipants / group.maxParticipants) * 100

    return (
        <div className="group-card">
            <div className="group-card-header">
                <div className="group-title-section">
                    <h3 className="group-title">{group.name}</h3>
                    <span className={`status-badge ${getStatusColor()}`}>{getStatusText()}</span>
                </div>
                <div className="language-badge">{group.language}</div>
            </div>

            <div className="group-card-content">
                <div className="info-grid">
                    <div className="info-item">
                        <BiGroup className="info-icon" />
                        <div className="info-content">
                            <span className="info-label">Children</span>
                            <div className="participants-info">
                <span className="participants-count">
                  {group.currentParticipants} / {group.maxParticipants}
                </span>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${participantsPercentage}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="info-item">
                        <BiCalendar className="info-icon" />
                        <div className="info-content">
                            <span className="info-label">Start Date</span>
                            <span className="info-value">{group.startEducationDate?.split("T")[0] || "Не указана"}</span>
                        </div>
                    </div>

                    <div className="info-item">
                        <HiOutlineAcademicCap className="info-icon" />
                        <div className="info-content">
                            <span className="info-label">COURSE</span>
                            <button className="course-link" onClick={() => navigate(`/courses/${group.course?.id}`)}>
                                {group.course?.name || "Не назначен"}
                            </button>
                        </div>
                    </div>

                    <div className="info-item">
                        <BiUser className="info-icon" />
                        <div className="info-content">
                            <span className="info-label">Children are enrolled</span>
                            <span className="info-value">{group.childrenEnrolled?.length || 0}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="group-card-actions">
                <button className="action-btn primary" onClick={() => navigate(`/groups/${group.id}/lessons`)}>
                    <BiBookOpen />
                    <span>Lesson</span>
                </button>
                <button className="action-btn secondary" onClick={() => navigate(`/groups/${group.id}`)}>
                    <span>Details</span>
                </button>
            </div>
        </div>
    )
}

export default GroupCard
