"use client"

import { useState, useEffect } from "react"
import axiosInstance from "../../utils/axiosInstance"

export const useGroups = (refreshTrigger) => {
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true)
            setError(null)

            try {
                const token = localStorage.getItem("token")
                const user = JSON.parse(localStorage.getItem("user"))
                const centerId = user?.id

                if (!centerId) {
                    throw new Error("Center ID not found")
                }

                const res = await axiosInstance.get(`/api/v1/education-centers/${centerId}/groups`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setGroups(res.data.data || [])
            } catch (error) {
                console.error("Error fetching groups:", error)
                setError(error.message || "Failed to fetch groups")
            } finally {
                setLoading(false)
            }
        }

        fetchGroups()
    }, [refreshTrigger])

    return { groups, loading, error, refetch: () => setGroups([]) }
}
