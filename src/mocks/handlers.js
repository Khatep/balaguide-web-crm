// src/mocks/handlers.js

import { http, HttpResponse } from "msw";

export const handlers = [
  // http.get("/groups/:groupId/lessons", ({ params }) => {
  //   const groupId = parseInt(params.groupId);
  //   const lessons = mockDB.lessons.filter((l) => l.groupId === groupId);
  //   return HttpResponse.json(lessons);
  // }),
  //
  // http.post("/api/v1/lessons", async ({ request }) => {
  //   const lesson = await request.json();
  //   const newLesson = {
  //     ...lesson,
  //     id: mockDB.lessons.length + 1,
  //   };
  //   mockDB.lessons.push(newLesson);
  //
  //   return HttpResponse.json({
  //     message: "Lesson created",
  //     lesson: newLesson,
  //   });
  // }),
  //
  // http.get("/api/v1/schedules", () => {
  //   const events = mockDB.lessons
  //     .map((lesson) => {
  //       const schedule = mockDB.schedules.find(
  //         (s) => s.id === lesson.scheduleId
  //       );
  //       if (!schedule) return null;
  //
  //       const lessonDate = new Date(lesson.date);
  //       const [startHour, startMin] = schedule.startTime.split(":");
  //       const [endHour, endMin] = schedule.endTime.split(":");
  //
  //       const start = new Date(lessonDate);
  //       start.setHours(Number(startHour), Number(startMin), 0, 0);
  //
  //       const end = new Date(lessonDate);
  //       end.setHours(Number(endHour), Number(endMin), 0, 0);
  //
  //       return {
  //         id: lesson.id,
  //         title: `${lesson.topic} (Group #${lesson.groupId})`,
  //         start,
  //         end,
  //       };
  //     })
  //     .filter(Boolean);
  //
  //   return HttpResponse.json(events);
  // }),
  // http.post("/api/v1/create-schedule", async ({ request }) => {
  //   const schedule = await request.json();
  //   schedule.id = Math.floor(Math.random() * 1000) + 1;
  //   mockDB.schedules.push(schedule);
  //   console.log("📅 New Schedule (mock):", schedule);
  //   console.log("📂 DB now contains:", mockDB.schedules);
  //
  //   return HttpResponse.json({
  //     message: "Schedule created",
  //     schedule,
  //   });
  // }),
  //
  // http.post("/api/v1/attendance", async ({ request }) => {
  //   const data = await request.json();
  //   console.log("📍 Attendance marked (mock):", data);
  //
  //   return HttpResponse.json({
  //     message: "Attendance successfully recorded",
  //     data,
  //   });
  // }),
  // http.get("/api/v1/attendance/group/:groupId", ({ params }) => {
  //   const groupId = parseInt(params.groupId);
  //   const records = mockDB.attendance.filter((r) => r.groupId === groupId);
  //   return HttpResponse.json(records);
  // }),
  //
  // http.post("/api/v1/teachers/create", async ({ request }) => {
  //   const teacher = await request.json();
  //   const newTeacher = { ...teacher, id: mockDB.teachers.length + 1 };
  //   mockDB.teachers.push(newTeacher);
  //   return HttpResponse.json({
  //     message: "Teacher created",
  //     teacher: newTeacher,
  //   });
  // }),
  //
  // http.get("/api/v1/teachers", () => {
  //   return HttpResponse.json(mockDB.teachers);
  // }),
  //
  // http.post("/api/v1/courses/create", async ({ request }) => {
  //   const teacher = await request.json();
  //   const newTeacher = { ...teacher, id: mockDB.courses.length + 1 };
  //   mockDB.courses.push(newTeacher);
  //   return HttpResponse.json({
  //     message: "Course created",
  //     teacher: newTeacher,
  //   });
  // }),
  //
  // http.get("/api/v1/courses", () => {
  //   return HttpResponse.json(mockDB.courses);
  // }),
  //
  // http.post("/api/v1/groups/create", async ({ request }) => {
  //   const teacher = await request.json();
  //   const newTeacher = { ...teacher, id: mockDB.groups.length + 1 };
  //   mockDB.groups.push(newTeacher);
  //   return HttpResponse.json({
  //     message: "Group created",
  //     teacher: newTeacher,
  //   });
  // }),
  //
  // http.get("/api/v1/groups", () => {
  //   return HttpResponse.json(mockDB.groups);
  // }),
  //
  // http.get("/api/v1/lessons/group/:groupId", ({ params }) => {
  //   const groupId = parseInt(params.groupId);
  //   const groupLessons = mockDB.lessons.filter((l) => l.groupId === groupId);
  //
  //   return HttpResponse.json(groupLessons);
  // }),
  // http.get("/api/v1/schedules/group/:groupId", ({ params }) => {
  //   const groupId = parseInt(params.groupId);
  //   return HttpResponse.json([
  //     {
  //       id: 101,
  //       groupId,
  //       dayOfWeek: "MONDAY",
  //       startTime: "10:00",
  //       endTime: "11:00",
  //     },
  //     {
  //       id: 102,
  //       groupId,
  //       dayOfWeek: "FRIDAY",
  //       startTime: "14:00",
  //       endTime: "15:00",
  //     },
  //   ]);
  //}),
  //   http.get("/api/v1/schedules", () => {
  //     return HttpResponse.json([
  //       {
  //         id: 1,
  //         groupId: 1,
  //         groupName: "Group A",
  //         teacherName: "Mr. Ali",
  //         dayOfWeek: "MONDAY",
  //         startTime: "10:00",
  //         endTime: "11:00",
  //       },
  //       {
  //         id: 2,
  //         groupId: 1,
  //         groupName: "Group A",
  //         teacherName: "Mr. Ali",
  //         dayOfWeek: "WEDNESDAY",
  //         startTime: "10:00",
  //         endTime: "11:00",
  //       },
  //       {
  //         id: 3,
  //         groupId: 2,
  //         groupName: "Group B",
  //         teacherName: "Ms. Aigerim",
  //         dayOfWeek: "TUESDAY",
  //         startTime: "14:00",
  //         endTime: "15:00",
  //       },
  //       {
  //         id: 4,
  //         groupId: 2,
  //         groupName: "Group B",
  //         teacherName: "Ms. Aigerim",
  //         dayOfWeek: "THURSDAY",
  //         startTime: "14:00",
  //         endTime: "15:00",
  //       },
  //       {
  //         id: 5,
  //         groupId: 3,
  //         groupName: "Group C",
  //         teacherName: "Mr. Bekzat",
  //         dayOfWeek: "FRIDAY",
  //         startTime: "09:00",
  //         endTime: "10:30",
  //       },
  //       {
  //         id: 6,
  //         groupId: 3,
  //         groupName: "Group C",
  //         teacherName: "Mr. Bekzat",
  //         dayOfWeek: "SATURDAY",
  //         startTime: "11:00",
  //         endTime: "12:30",
  //       },
  //     ]);
  //   }),
  // http.get("/api/v1/groups/:id", ({ params }) => {
  //   const id = parseInt(params.id);
  //   const group = mockDB.groups.find((g) => g.id === id);
  //
  //   if (!group) {
  //     return HttpResponse.json({ message: "Group not found" }, { status: 404 });
  //   }
  //
  //   return HttpResponse.json(group);
  // }),
  // http.post("/api/v1/attendance", async ({ request }) => {
  //   const record = await request.json();
  //   const alreadyMarked = mockDB.attendance.find(
  //     (a) => a.lessonId === record.lessonId && a.childId === record.childId
  //   );
  //
  //   if (alreadyMarked) {
  //     return HttpResponse.json({ message: "Already marked" }, { status: 409 });
  //   }
  //
  //   mockDB.attendance.push(record);
  //   return HttpResponse.json({ message: "Attendance recorded", data: record });
  // }),
  //
  // http.post("/api/v1/auth/sign-in", async ({ request }) => {
  //   const { phoneNumber, password } = await request.json();
  //
  //   // Simulate fake login logic
  //   if (phoneNumber === "111" && password === "teacher") {
  //     return HttpResponse.json({
  //       token: "teacher-token",
  //       user: {
  //         role: "TEACHER",
  //         id: 42,
  //       },
  //     });
  //   }
  //
  //   if (phoneNumber === "222" && password === "center") {
  //     return HttpResponse.json({
  //       token: "ec-token",
  //       user: {
  //         role: "EDUCATION CENTER",
  //         id: 99,
  //       },
  //     });
  //   }
  //
  //   return HttpResponse.json(
  //     { message: "Invalid credentials" },
  //     { status: 401 }
  //   );
  // }),
];
