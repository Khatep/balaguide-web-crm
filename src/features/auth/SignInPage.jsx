// src/features/SignInPage.jsx
import React, { useState } from "react";
import { signIn } from "./AuthService";
import { useNavigate } from "react-router-dom";
import "./AuthPages.css";
import { toast } from "react-toastify";

import emailIcon from "../../assets/email.png";
import passwordIcon from "../../assets/password.png";
import loginIcon from "../../assets/balaguide-logo.png"; // You can replace icon

const SignInPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await signIn(phoneNumber, password);
      console.warn(response);
      console.warn(response.jwtResponseDto.token);
      localStorage.setItem("token", response.jwtResponseDto.token);
      localStorage.setItem("role", response.user.authUser.role);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Error data:", err.response?.data);
      toast.error("Login failed: " + err.response?.data?.message || "Unknown error");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    } finally {
      setLoading(false); // Stop loading after success or error
    }
  };

  return (
    <div className="auth-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className={`auth-card ${isShaking ? "shake" : ""}`}>
        <div className="auth-header">
          <img className="balaguideLogo" src={loginIcon} alt="Login" />
          <h2>Welcome</h2>
        </div>

        <div className="auth-body">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <img src={emailIcon} alt="Email" />
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <img src={passwordIcon} alt="Password" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-text">{error}</div>}
            <button type="submit" disabled={loading}>
              {loading && <span className="spinner"></span>}
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          <p className="go-to-main" onClick={() => navigate("/")}>
            Go to Main Page
          </p>

          <p className="auth-switch-text">
            Don't have an account?{" "}
            <span
              className="auth-switch-link"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
