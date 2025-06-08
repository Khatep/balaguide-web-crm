// src/features/SignUpPage.jsx
import React, {useState} from "react";
import {signUp} from "./AuthService";
import {useNavigate} from "react-router-dom";
import "./AuthPages.css";
import {toast} from "react-toastify";

import phoneIcon from "../../assets/email.png";
import passwordIcon from "../../assets/password.png";
import teacherIcon from "../../assets/Teacher.png";
import educationCenterIcon from "../../assets/EducationCenter.png";

const SignUpPage = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("EDUCATION_CENTER");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await signUp(phoneNumber, password, role);

            const token = response?.token;
            if (!token) throw new Error("Token not received");

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            toast.success("Registration successful!");

            if (role === "TEACHER") {
                navigate("/create-teacher", {state: {phoneNumber, password}});
            } else if (role === "EDUCATION_CENTER") {
                navigate("/create-education-center", {
                    state: {phoneNumber, password},
                });
            } else {
                navigate("/signin");
            }
        } catch (err) {
            console.dir(err);
            console.error("Error data:", err.response?.data);

            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Unknown error occurred during registration";

            toast.error(`Registration failed. ${message}`);

            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }

    };

    const getRoleIcon = () => {
        if (role === "TEACHER") {
            return teacherIcon;
        }
        if (role === "EDUCATION_CENTER") {
            return educationCenterIcon;
        }
        return null;
    };

    return (
        <div className="auth-container">
            <div className={`auth-card ${isShaking ? "shake" : ""}`}>
                <div className="auth-header">
                    {getRoleIcon() && <img src={getRoleIcon()} alt="Role"/>}
                    <h2>Sign Up</h2>
                </div>

                <div className="auth-body">
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <img src={phoneIcon} alt="Phone"/>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <img src={passwordIcon} alt="Password"/>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="EDUCATION_CENTER">Education Center</option>
                                <option value="TEACHER">Teacher</option>
                            </select>
                        </div>
                        {error && <div className="error-text">{error}</div>}
                        <button type="submit" disabled={loading}>
                            {loading && <span className="spinner"></span>}
                            {loading ? "Loading..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="go-to-main" onClick={() => navigate("/")}>
                        Go to Main Page
                    </p>

                    <p className="auth-switch-text">
                        Already have an account?{" "}
                        <span
                            className="auth-switch-link"
                            onClick={() => navigate("/signin")}
                        >
              Sign In
            </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
