"use client"

import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { Search, ChevronLeft, ChevronRight, Plus, Filter } from "lucide-react"
import { useNavigate } from "react-router-dom"

const getWeekRange = (date) => {
    const monday = new Date(date)
    monday.setDate(date.getDate() - ((date.getDay() + 6) % 7))
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)

    const toISO = (d) => d.toISOString().split("T")[0]
    return {
        startDate: toISO(monday),
        endDate: toISO(sunday),
    }
}

const AllSchedulesPage = () => {
    const [schedule, setSchedule] = useState([])
    const [groups, setGroups] = useState([])
    const [teachers, setTeachers] = useState([])
    const [selectedGroup, setSelectedGroup] = useState("")
    const [selectedTeacher, setSelectedTeacher] = useState("")
    const [currentWeek, setCurrentWeek] = useState(() => getWeekRange(new Date()))
    const [isLoading, setIsLoading] = useState(true)

    const educationCenterId = JSON.parse(localStorage.getItem("user"))?.id
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        fetchGroups()
        fetchTeachers()
    }, [])

    useEffect(() => {
        if (!educationCenterId) return
        fetchSchedule()
    }, [currentWeek, selectedGroup, selectedTeacher])

    const fetchGroups = async () => {
        const res = await axiosInstance.get(`/api/v1/education-centers/${educationCenterId}/groups`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        setGroups(res.data.data)
    }

    const fetchTeachers = async () => {
        const res = await axiosInstance.get(`/api/v1/teachers/${educationCenterId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        setTeachers(res.data.data)
    }

    const fetchSchedule = async () => {
        setIsLoading(true)
        try {
            const res = await axiosInstance.get("/api/v1/schedule/filter", {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    educationCenterId,
                    startDate: currentWeek.startDate,
                    endDate: currentWeek.endDate,
                    ...(selectedGroup ? { groupId: selectedGroup } : {}),
                    ...(selectedTeacher ? { teacherId: selectedTeacher } : {}),
                },
            })
            setSchedule(res.data.data)
        } catch (err) {
            console.error("Error loading schedule", err)
        } finally {
            setIsLoading(false)
        }
    }

    const goToPreviousWeek = () => {
        const newStart = new Date(currentWeek.startDate)
        newStart.setDate(newStart.getDate() - 7)
        setCurrentWeek(getWeekRange(newStart))
    }

    const goToNextWeek = () => {
        const newStart = new Date(currentWeek.startDate)
        newStart.setDate(newStart.getDate() + 7)
        setCurrentWeek(getWeekRange(newStart))
    }

    const getWeekLabel = () => {
        return `${currentWeek.startDate} - ${currentWeek.endDate}`
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All Group Schedules</h1>
                    <p className="text-gray-600">Manage and view all programming course schedules</p>
                </div>
                <button
                    onClick={() => navigate("/create-schedule")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <Plus className="h-5 w-5 mr-2" /> Create Schedule
                </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search courses or teachers..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                >
                    <option value="">All Groups</option>
                    {groups.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                >
                    <option value="">All Teachers</option>
                    {teachers.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.firstName} {t.lastName}
                        </option>
                    ))}
                </select>

                <button className="border border-gray-300 rounded-lg px-3 py-2 flex items-center text-gray-700 hover:bg-gray-100">
                    <Filter className="h-4 w-4 mr-2" /> More Filters
                </button>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                    <button
                        onClick={goToPreviousWeek}
                        className="border border-gray-300 rounded-lg px-4 py-2 flex items-center text-gray-700 hover:bg-gray-100"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </button>
                    <button
                        onClick={() => setCurrentWeek(getWeekRange(new Date()))}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Today
                    </button>
                    <button
                        onClick={goToNextWeek}
                        className="border border-gray-300 rounded-lg px-4 py-2 flex items-center text-gray-700 hover:bg-gray-100"
                    >
                        Next <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                </div>
                <div className="text-gray-700 font-medium">{getWeekLabel()}</div>
            </div>

            {isLoading ? (
                <div className="text-center text-gray-500">Loading schedule...</div>
            ) : (
                <div className="text-sm text-gray-700">{schedule.length} lessons found for this week</div>
                // Здесь можно отобразить сетку занятий или карточки по дням/часам
            )}
        </div>
    )
}

export default AllSchedulesPage
