// src/utils/axiosInstance.js
import axios from "axios";
import {API_BASE_URL_NETBIRD, API_BASE_URL_LOCAL} from "../config/api";


const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL_NETBIRD}`,
    withCredentials: true, // если используешь куки
});

axiosInstance.interceptors.request.use((config) => {
    console.log("Request URL:", config.url);
    console.log("Request headers BEFORE:", config.headers);

    // Не добавлять токен на /auth маршруты
    if (!config.url.includes("/auth")) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    console.log("Request headers AFTER:", config.headers);
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
