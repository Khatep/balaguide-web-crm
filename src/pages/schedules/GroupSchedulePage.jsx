// src/pages/GroupSchedulePage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import GroupScheduleCalendar from "../../components/GroupScheduleCalendar";

const GroupSchedulePage = () => {
  const { id } = useParams(); // groupId from URL

  return (
    <div>
      <h2 style={{ padding: "1rem 2rem" }}>Group Schedule</h2>
      <GroupScheduleCalendar groupId={id} />
    </div>
  );
};

export default GroupSchedulePage;
