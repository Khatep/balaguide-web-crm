"use client"
import CreateGroupPage from "./CreateGroupPage"
import React from "react";

const CreateGroupModal = ({ isOpen, onClose, onSuccess }) => {
    if (!isOpen) return null

    const handleSuccess = () => {
        onSuccess()
        onClose()
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="text-2xl font-bold mb-4">Create New Group</h2>
                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className="modal-body">
                    <CreateGroupPage onSuccess={handleSuccess} />
                </div>
            </div>
        </div>
    )
}

export default CreateGroupModal
