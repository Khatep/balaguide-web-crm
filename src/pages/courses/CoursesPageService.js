import axiosInstance from "../../utils/axiosInstance"

const API_URL = "/api/v1"

export const getCoursesByCenterId = async (centerId) => {
    const token = localStorage.getItem("token")

    const response = await axiosInstance.get(`${API_URL}/education-centers/${centerId}/courses`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data
}

export const updateCourse = async (id, updatedCourse) => {
    const token = localStorage.getItem("token")

    const response = await axiosInstance.put(`${API_URL}/courses/${id}`, updatedCourse, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    return response.data
}

export const deleteCourse = async (id) => {
    const token = localStorage.getItem("token")

    const response = await axiosInstance.delete(`${API_URL}/courses/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data
}
