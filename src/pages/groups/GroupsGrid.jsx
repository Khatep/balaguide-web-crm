"use client"
import GroupCard from "./GroupCard"

const GroupsGrid = ({ groups, loading, error }) => {
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner" />
                <p>Загрузка групп...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">Ошибка: {error}</p>
                <button onClick={() => window.location.reload()} className="retry-btn">
                    Попробовать снова
                </button>
            </div>
        )
    }

    if (groups.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3>No Groups</h3>
            </div>
        )
    }

    return (
        <div className="groups-grid">
            {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
            ))}
        </div>
    )
}

export default GroupsGrid
