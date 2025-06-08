// src/layouts/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../utils/storage";
import {
  FaChartBar,
  FaUsers,
  FaBook,
  FaPlus,
  FaChalkboardTeacher,
  FaClipboardList,
  FaClipboardCheck,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
  FaUserGraduate,
} from "react-icons/fa";

const Sidebar = ({ role }) => {
  const menuItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FaChartBar /> },
      { to: "/groups", label: "Groups", icon: <FaUsers /> },
  ];

  if (role === "EDUCATION_CENTER") {
    menuItems.push(
        { to: "/courses", label: "Courses", icon: <FaBook /> },
        { to: "/teachers", label: "Teachers", icon: <FaChalkboardTeacher /> },
        { to: "/children", label: "Children", icon: <FaUsers /> },
        { to: "/attendance-reports", label: "Attendance Reports", icon: <FaClipboardList /> }
    );
  } else if (role === "TEACHER") {
    menuItems.push(
        { to: "/my-courses", label: "My Courses", icon: <FaBook /> },
        { to: "/attendance", label: "Attendance / Marks", icon: <FaClipboardCheck /> }
    );
  }

  menuItems.push(
      { to: "/schedules", label: "Schedule", icon: <FaCalendarAlt /> },
      { to: "/settings", label: "Settings", icon: <FaCog /> },
      { to: "/logout", label: "Logout", icon: <FaSignOutAlt /> }
  );

  const user = getUser();
  const userName = user?.firstName || user?.name || "User";

  return (
      <div className="w-64 min-h-screen bg-[#5463d6] text-white flex flex-col justify-between px-4 py-6">
        <div>
          <div className="mb-6 px-2">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              {role === "TEACHER" ? <FaUserGraduate /> : <FaChalkboardTeacher />}
              {userName}
            </h3>
          </div>
          <ul className="space-y-2">
            {menuItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-2 rounded transition duration-200 font-medium ${
                              isActive ? "bg-white text-[#1e2235]" : "hover:bg-[#2a2f45] text-white"
                          }`
                      }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default Sidebar;
