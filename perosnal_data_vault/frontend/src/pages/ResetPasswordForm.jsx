import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material"; // For loading spinner

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (!value) {
      return "Email is required";
    }
    // Basic email format validation
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValid) {
      return "Invalid email address";
    }
    return "";
  };

  const validateOtp = (value) => {
    if (!value) {
      return "OTP is required";
    }
    // Validate OTP length
    if (value.length !== 6) {
      return "OTP must be 6 digits";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required";
    }
    // Validate password length and complexity
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    const upperCase = /[A-Z]/.test(value);
    const lowerCase = /[a-z]/.test(value);
    const number = /\d/.test(value);
    const specialChar = /[!@#$%^&*]/.test(value);
    if (!upperCase || !lowerCase || !number || !specialChar) {
      return "Password must include uppercase, lowercase, number, and special character";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setMessage("");
    const emailError = validateEmail(email);
    const otpError = validateOtp(otp);
    const passwordError = validatePassword(password);
    if (emailError || otpError || passwordError) {
      setErrors({ email: emailError, otp: otpError, password: passwordError });
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5500/api/verify-otp-and-update-password",
        {
          email,
          otp,
          newPassword: password,
        }
      );
      setMessage(response.data.message);
      navigate("/login"); // Redirect to login page after successful password reset
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: "#f0f8f4", minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card mt-5 shadow-lg rounded" style={{ border: "1px solid #d0e2d8" }}>
            <div className="card-body">
              <h2 className="text-center mb-4" style={{ color: "#006400" }}>Reset Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    required
                    style={{ borderRadius: "20px", border: "1px solid #006400" }}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className={`form-control ${errors.otp ? "is-invalid" : ""}`}
                    placeholder="Enter OTP"
                    required
                    style={{ borderRadius: "20px", border: "1px solid #006400" }}
                  />
                  {errors.otp && <div className="invalid-feedback">{errors.otp}</div>}
                </div>
                <div className="form-group mb-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter new password"
                    required
                    style={{ borderRadius: "20px", border: "1px solid #006400" }}
                  />
                  <div
                    className="position-absolute"
                    style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </div>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button
                  type="submit"
                  className="btn btn-success btn-block"
                  disabled={loading}
                  style={{ borderRadius: "20px" }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
                </button>
              </form>
              {message && <p className={`mt-3 text-center ${message.includes("Error") ? "text-danger" : "text-success"}`}>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
