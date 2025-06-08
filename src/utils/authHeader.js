// src/utils/authHeader.js
export const authHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("⚠️ No token found in localStorage. Sending unauthenticated request.");
  }

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

