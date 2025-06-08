// src/features/AuthService.js
import axios from "../../utils/axiosInstance";


export const signIn = async (phoneNumber, password) => {
    const response = await axios.post("/auth/sign-in", {
        phoneNumber,
        password,
    });
    console.warn(response.data.user);
    console.warn(response.data.jwtResponseDto);

    return response.data;
};

export const signUp = async (phoneNumber, password, role) => {
    const response = await axios.post("/auth/sign-up", {
        phoneNumber,
        password,
        role,
    });
    console.warn(response.data.token);
    return response.data;
};