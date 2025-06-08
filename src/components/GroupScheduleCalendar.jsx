// src/components/GroupScheduleCalendar.jsx
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const GroupScheduleCalendar = ({ groupId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/v1/schedules/group/${groupId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const scheduleItems = await res.json();

        // Map your schedule data to calendar events
        const currentWeek = getCurrentWeekMonday();

        const calendarEvents = scheduleItems.map((item, index) => {
          const date = getNextWeekdayDate(currentWeek, item.dayOfWeek);
          const [startHour, startMin] = item.startTime.split(":");
          const [endHour, endMin] = item.endTime.split(":");

          return {
            id: index,
            title: `Lesson`,
            start: new Date(date.setHours(startHour, startMin)),
            end: new Date(date.setHours(endHour, endMin)),
          };
        });

        setEvents(calendarEvents);
      } catch (err) {
        console.error("Failed to load schedule", err);
      }
    };

    fetchSchedule();
  }, [groupId]);

  const getCurrentWeekMonday = () => {
    const now = new Date();
    const monday = new Date(
      now.setDate(now.getDate() - ((now.getDay() + 6) % 7))
    );
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const getNextWeekdayDate = (mondayDate, dayOfWeek) => {
    const days = {
      MONDAY: 0,
      TUESDAY: 1,
      WEDNESDAY: 2,
      THURSDAY: 3,
      FRIDAY: 4,
      SATURDAY: 5,
      SUNDAY: 6,
    };
    const target = new Date(mondayDate);
    target.setDate(mondayDate.getDate() + days[dayOfWeek]);
    return new Date(target);
  };

  return (
    <div style={{ height: "80vh", padding: "2rem" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week"]}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default GroupScheduleCalendar;
