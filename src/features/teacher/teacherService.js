// src/features/teacher/teacherService.js
import axios from "../../utils/axiosInstance";
import { authHeader } from "../../utils/authHeader";
import { getToken } from "../../utils/storage";
import {API_BASE_URL_NETBIRD, API_BASE_URL_LOCAL} from "../../config/api";

const API_URL = `${API_BASE_URL_NETBIRD}/api/v1/teachers`;
export const createTeacher = async (teacherData) => {
  const token = getToken();

  const response = await axios.post(`${API_URL}/create`, teacherData, {
    headers: authHeader(),
  });

  return response.data;
};
