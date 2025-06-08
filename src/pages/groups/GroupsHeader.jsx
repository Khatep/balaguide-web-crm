"use client"
import { BiPlus, BiSearch, BiFilter } from "react-icons/bi"

const GroupsHeader = ({ onCreateGroup, searchTerm, onSearchChange, filterStatus, onFilterChange, groupsCount }) => {
    return (
        <div className="groups-header">
            <div className="header-title-section">
                <h1 className="page-title">Groups</h1>
                <span className="groups-count">{groupsCount} groups</span>
            </div>

            <div className="header-controls">
                <div className="search-container">
                    <BiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search groups..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-container">
                    <BiFilter className="filter-icon" />
                    <select value={filterStatus} onChange={(e) => onFilterChange(e.target.value)} className="filter-select">
                        <option value="all">All Groups</option>
                        <option value="active">Active</option>
                        <option value="full">Full</option>
                        <option value="empty">Empty</option>
                    </select>
                </div>

                <button className="create-btn" onClick={onCreateGroup}>
                    <BiPlus />
                    <span>Create New Group</span>
                </button>
            </div>
        </div>
    )
}

export default GroupsHeader
