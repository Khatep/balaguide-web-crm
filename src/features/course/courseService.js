// src/features/course/courseService.js
import axios from "axios";

const BASE_URL = "/api/v1/courses";

export const getAllCourses = async () => {
  const response = await axios.get(`${BASE_URL}/search-courses?query=`);
  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await axios.post(`${BASE_URL}/create`, courseData);
  return response.data;
};
