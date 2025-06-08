// src/pages/dashboard/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import axiosInstance from "../../utils/axiosInstance";
import StatCard from "../../components/StatCard";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    BarChart,
    Bar,
} from "recharts";

const DashboardHome = () => {
    const [totalRevenue, setTotalRevenue] = useState(null);
    const [topCourses, setTopCourses] = useState([]);
    const [childrenPerCourse, setChildrenPerCourse] = useState([]);
    const [revenueByMonth, setRevenueByMonth] = useState([]);
    const [childrenGrowth, setChildrenGrowth] = useState([]);
    const [avgDuration, setAvgDuration] = useState(null);
    const [avgFillPercent, setAvgFillPercent] = useState(null);
    const [returningParentsCount, setReturningParentsCount] = useState(null);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const centerId = user?.id;

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const endpoints = [
                ["total-revenue", setTotalRevenue],
                ["top-courses-by-revenue", setTopCourses],
                ["children-per-course", setChildrenPerCourse],
                ["revenue-by-month", setRevenueByMonth],
                ["children-growth-by-month", setChildrenGrowth],
                ["average-course-duration", setAvgDuration],
                ["average-group-fill-percent", setAvgFillPercent],
                ["returning-parents-count", setReturningParentsCount],
            ];

            await Promise.all(
                endpoints.map(async ([path, setter]) => {
                    const res = await axiosInstance.get(
                        `/api/v1/education-centers/${centerId}/dashboard/${path}`
                    );
                    setter(res.data.data);
                })
            );
        } catch (err) {
            console.error("❌ Dashboard load error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (
        <div className="min-h-screen bg-[#f2f4f8] p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                <button
                    onClick={fetchDashboard}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    ↻ Refresh
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={totalRevenue} unit="₸" />
                <StatCard title="Avg. Course Duration (weeks)" value={avgDuration} />
                <StatCard title="Avg. Group Fill" value={avgFillPercent?.toFixed(1)} unit="%" />
                <StatCard title="Returning Parents" value={returningParentsCount} />
            </div>

            {/* Revenue by Month */}
            <DashboardCard title="Monthly Revenue">
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={revenueByMonth}>
                        <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                        <XAxis dataKey="month" stroke="#4b5563" />
                        <YAxis stroke="#4b5563" />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#5463d6"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardCard>

            {/* Children Growth */}
            <DashboardCard title="Monthly Children Growth">
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={childrenGrowth}>
                        <CartesianGrid stroke="#d1d5db" strokeDasharray="3 3" />
                        <XAxis dataKey="month" stroke="#4b5563" />
                        <YAxis stroke="#4b5563" allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="childrenCount" stroke="#5463d6" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardCard>

            {/* Top Courses by Revenue */}
            <DashboardCard title="Top Courses by Revenue">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={topCourses}>
                        <CartesianGrid stroke="#d1d5db" strokeDasharray="3 3" />
                        <XAxis dataKey="courseName" stroke="#4b5563" />
                        <YAxis stroke="#4b5563" />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#5463d6" name="Revenue (₸)" />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardCard>

            {/* Children per Course */}
            <DashboardCard title="Children Distribution by Course">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={childrenPerCourse}>
                        <CartesianGrid stroke="#d1d5db" strokeDasharray="3 3" />
                        <XAxis dataKey="courseName" stroke="#4b5563" />
                        <YAxis stroke="#4b5563" />
                        <Tooltip />
                        <Bar dataKey="childrenCount" fill="#5463d6" name="Children" />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardCard>
        </div>
    );
};

export default DashboardHome;
