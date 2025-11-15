import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    otp: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Toast/Popup state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "", // success, error, info
  });

  // API Base URL
  const API_BASE = "https://srs-api-six.vercel.app/api/student-auth";

  // Toast functions
  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    // Auto hide after 4 seconds
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 4000);
  };

  const showSuccess = message => showToast(message, "success");
  const showError = message => showToast(message, "error");
  // eslint-disable-next-line no-unused-vars
  const showInfo = message => showToast(message, "info");

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Send OTP Function
  const handleSendOTP = async () => {
    if (!formData.phone) {
      showError("Please enter phone number");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/send-otp`, {
        phone: formData.phone,
      });

      if (response.data.success) {
        setOtpSent(true);
        showSuccess(
          `OTP sent successfully to +91-${formData.phone}!${
            response.data.otp ? ` Dev OTP: ${response.data.otp}` : ""
          }`
        );
      }
    } catch (error) {
      showError(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Login Submit
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;

      if (loginType === "email") {
        // Email/Password Login
        response = await axios.post(`${API_BASE}/login`, {
          identifier: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        });
      } else {
        // Phone/OTP Login
        if (!otpSent) {
          showError("Please send OTP first");
          setIsLoading(false);
          return;
        }

        response = await axios.post(`${API_BASE}/verify-otp`, {
          phone: formData.phone,
          otp: formData.otp,
          rememberMe: formData.rememberMe,
        });
      }

      if (response.data.success) {
        // Store token and user data
        localStorage.setItem("studentToken", response.data.token);
        localStorage.setItem(
          "studentData",
          JSON.stringify(response.data.student)
        );

        // Success toast
        showSuccess("Login successful! Redirecting to your profile...");

        // Redirect after 1.5 seconds
        setTimeout(() => {
          navigate("/student/studentDashboard");
        }, 1500);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";

      if (error.response?.data?.isLocked) {
        showError(
          "Account is temporarily locked due to multiple failed attempts. Please try again later."
        );
      } else {
        showError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="student-login-page-srs-container">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`student-login-page-srs-toast ${toast.type}`}>
          <div className="student-login-page-srs-toast-content">
            <i
              className={`fas ${
                toast.type === "success"
                  ? "fa-check-circle"
                  : toast.type === "error"
                  ? "fa-exclamation-circle"
                  : "fa-info-circle"
              }`}
            ></i>
            <span>{toast.message}</span>
            <button
              className="student-login-page-srs-toast-close"
              onClick={() => setToast({ show: false, message: "", type: "" })}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      <div className="student-login-page-srs-wrapper">
        {/* Left Side - Illustration */}
        <div className="student-login-page-srs-illustration">
          <div className="student-login-page-srs-brand">
            <h1 className="student-login-page-srs-title">SRS EDUCARES</h1>
            <p className="student-login-page-srs-subtitle">
              IIT-JEE | Medical | KVPY | NTSE | CBSE
            </p>
          </div>
          <div className="student-login-page-srs-image">
            <div className="student-login-page-srs-student-icon">
              <i className="fas fa-user-graduate"></i>
            </div>
            <div className="student-login-page-srs-books">
              <div className="student-login-page-srs-book book1"></div>
              <div className="student-login-page-srs-book book2"></div>
              <div className="student-login-page-srs-book book3"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="student-login-page-srs-form-section">
          <div className="student-login-page-srs-form-container">
            <h2 className="student-login-page-srs-form-title">Student Login</h2>
            <p className="student-login-page-srs-form-subtitle">
              Choose your preferred login method
            </p>

            {/* Login Type Toggle */}
            <div className="student-login-page-srs-toggle-container">
              <div className="student-login-page-srs-toggle-buttons">
                <button
                  type="button"
                  className={`student-login-page-srs-toggle-btn ${
                    loginType === "email" ? "active" : ""
                  }`}
                  onClick={() => {
                    setLoginType("email");
                    setOtpSent(false);
                  }}
                >
                  <i className="fas fa-envelope"></i>
                  Email & Password
                </button>
                <button
                  type="button"
                  className={`student-login-page-srs-toggle-btn ${
                    loginType === "phone" ? "active" : ""
                  }`}
                  onClick={() => {
                    setLoginType("phone");
                    setOtpSent(false);
                  }}
                >
                  <i className="fas fa-mobile-alt"></i>
                  Phone & OTP
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="student-login-page-srs-form"
            >
              {/* Email Login Form */}
              {loginType === "email" && (
                <>
                  <div className="student-login-page-srs-input-group">
                    <label className="student-login-page-srs-label">
                      <i className="fas fa-envelope"></i>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="student-login-page-srs-input"
                      placeholder="Enter your registered email"
                      required
                    />
                  </div>

                  <div className="student-login-page-srs-input-group">
                    <label className="student-login-page-srs-label">
                      <i className="fas fa-lock"></i>
                      Password
                    </label>
                    <div className="student-login-page-srs-password-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="student-login-page-srs-input"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        className="student-login-page-srs-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`fas ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Phone Login Form */}
              {loginType === "phone" && (
                <>
                  <div className="student-login-page-srs-input-group">
                    <label className="student-login-page-srs-label">
                      <i className="fas fa-mobile-alt"></i>
                      Phone Number
                    </label>
                    <div className="student-login-page-srs-phone-wrapper">
                      <select className="student-login-page-srs-country-code">
                        <option value="+91">🇮🇳 +91</option>
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="student-login-page-srs-input phone"
                        placeholder="Enter registered phone"
                        required
                      />
                      <button
                        type="button"
                        className="student-login-page-srs-send-otp-btn"
                        onClick={handleSendOTP}
                        disabled={!formData.phone || isLoading}
                      >
                        {isLoading ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          "Send OTP"
                        )}
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div className="student-login-page-srs-input-group">
                      <label className="student-login-page-srs-label">
                        <i className="fas fa-key"></i>
                        Enter OTP
                      </label>
                      <div className="student-login-page-srs-otp-wrapper">
                        <input
                          type="text"
                          name="otp"
                          value={formData.otp}
                          onChange={handleInputChange}
                          className="student-login-page-srs-input"
                          placeholder="Enter 6-digit OTP"
                          maxLength="6"
                          required
                        />
                        <button
                          type="button"
                          className="student-login-page-srs-resend-btn"
                          onClick={handleSendOTP}
                          disabled={isLoading}
                        >
                          {isLoading ? "Sending..." : "Resend"}
                        </button>
                      </div>
                      <p className="student-login-page-srs-otp-info">
                        OTP sent to +91-{formData.phone}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="student-login-page-srs-form-options">
                <label className="student-login-page-srs-checkbox">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <span className="student-login-page-srs-checkmark"></span>
                  Remember Me
                </label>
                {loginType === "email" && (
                  <a
                    href="/forgot-password"
                    className="student-login-page-srs-forgot-link"
                  >
                    Forgot Password?
                  </a>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="student-login-page-srs-login-btn"
                disabled={isLoading || (loginType === "phone" && !otpSent)}
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-sign-in-alt"></i>
                )}
                {isLoading
                  ? "Please wait..."
                  : loginType === "email"
                  ? "Login with Email"
                  : "Verify & Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
