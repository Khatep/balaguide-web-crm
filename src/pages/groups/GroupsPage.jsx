"use client"

import { useState, useMemo } from "react"
import { useGroups } from "./useGroups"
import GroupsHeader from "./GroupsHeader"
import GroupsGrid from "./GroupsGrid"
import CreateGroupModal from "./CreateGroupModal"
import "./GroupsPage.css"

const GroupsPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")

    const { groups, loading, error } = useGroups(showModal)

    const filteredGroups = useMemo(() => {
        let filtered = groups.filter(
            (group) =>
                group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                group.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
                group.course?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
        )

        switch (filterStatus) {
            case "active":
                filtered = filtered.filter((group) => !group.groupFull && group.currentParticipants > 0)
                break
            case "full":
                filtered = filtered.filter((group) => group.groupFull)
                break
            case "empty":
                filtered = filtered.filter((group) => group.currentParticipants === 0)
                break
            default:
                break
        }

        return filtered
    }, [groups, searchTerm, filterStatus])

    const handleCreateGroup = () => {
        setShowModal(true)
    }

    const handleModalClose = () => {
        setShowModal(false)
    }

    const handleGroupCreated = () => {
        // Trigger refetch by toggling modal state
        setShowModal(false)
    }

    return (
        <div className="groups-page">
            <GroupsHeader
                onCreateGroup={handleCreateGroup}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterStatus={filterStatus}
                onFilterChange={setFilterStatus}
                groupsCount={filteredGroups.length}
            />

            <GroupsGrid groups={filteredGroups} loading={loading} error={error} />

            <CreateGroupModal isOpen={showModal} onClose={handleModalClose} onSuccess={handleGroupCreated} />
        </div>
    )
}

export default GroupsPage
