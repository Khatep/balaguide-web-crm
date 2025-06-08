// src/features/center/educationCenterService.js
import axios from "../../utils/axiosInstance";
import { authHeader } from "../../utils/authHeader";
import {API_BASE_URL_NETBIRD, API_BASE_URL_LOCAL} from "../../config/api";

const API_URL = `${API_BASE_URL_NETBIRD}/api/v1/education-centers`;
export const createEducationCenter = async (centerData) => {

  const response = await axios.post(`${API_URL}/create`, centerData, {
    headers: authHeader(),
  });

  return response.data;
};
