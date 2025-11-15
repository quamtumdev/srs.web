import { Link } from "react-router-dom";

import { IoMdLogIn } from "react-icons/io";
import styles from "../Login-UI/login.module.css";
import { useState, useRef } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import firebase from "../../componets/firebase/firebase";
import { toast } from "react-toastify";

export const MobileLogin = () => {
  const [showModal, setShowModal] = useState(false); // To show/hide login modal
  const [showRegisterModal, setShowRegisterModal] = useState(false); // To show/hide register modal
  const [loginMethod, setLoginMethod] = useState("email");

  const toggleLoginModal = () => {
    setShowModal(prev => !prev);
    setShowRegisterModal(false); // Hide register modal when login modal is toggled
  };

  const toggleRegisterModal = () => {
    console.log("Toggling Register Modal", showRegisterModal);
    setShowRegisterModal(true); // Show the register modal
    setShowModal(false); // Hide the login modal when register modal is opened
  };
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    otp: "",
    city: "",
    password: "",
  });
  const [secondModalData, setSecondModalData] = useState({
    class: "",
    stream: "",
    course: "",
  });
  const [currentStep, setCurrentStep] = useState(1); // Track current step (1 for registration, 2 for stream/course)

  const recaptchaRef = useRef(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = () => {
    if (!phoneNumber) {
      toast.error("Please enter a phone number!"); // Show error toast if phone number is not entered
      return;
    }

    recaptchaRef.current.innerHTML = '<div id="recaptcha-container"></div>';
    const verifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, verifier)
      .then(confirmationResult => {
        setVerificationId(confirmationResult.verificationId);
        setIsOtpSent(true);
        toast.success("OTP sent to your phone!"); // Success toast when OTP is sent
      })
      .catch(error => {
        console.error("Error sending OTP:", error);
        toast.error("Error sending OTP, please try again."); // Error toast on failure
      });
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      toast.error("Please enter the OTP!"); // Show error toast if OTP is not entered
      return;
    }

    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        toast.success("Phone number verified successfully!"); // Success toast after OTP verification
      })
      .catch(error => {
        console.error("Error verifying OTP:", error);
        toast.error("Invalid OTP!"); // Error toast on failed OTP verification
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isOtpSent && otp) {
      handleVerifyOtp();
      // Transition to the second step (Stream & Course)
      setCurrentStep(2); // Show Stream & Course selection

      toast.success("Registration Successful!"); // Success toast for successful registration

      // Close the modal automatically
      const modal = new bootstrap.Modal(
        document.getElementById("registerModal")
      );
      modal.hide();
    } else {
      toast.error("Please complete the OTP verification."); // Error toast if OTP verification is incomplete
    }
  };

  // Handle second modal input change
  const handleSecondModalChange = e => {
    setSecondModalData({ ...secondModalData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className={`container ${styles.container}`}>
        <div className="row">
          <div>
            {/* Modal trigger link */}
            <div>
              <Link
                className="nav-link  login-btn-mobile-view"
                to="#"
                onClick={toggleLoginModal}
              >
                <IoMdLogIn className="fs-5" /> Login / Register
              </Link>
            </div>

            {/* Login Modal */}
            {showModal && (
              <div
                className="modal fade show"
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
                aria-modal="true"
                style={{
                  display: "block",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <div
                  className={`modal-dialog ${styles.modalDialog}`}
                  role="document"
                >
                  <div className="modal-content bg-light">
                    <div className={`modal-header ${styles.modalHeader}`}>
                      <h5 className={`modal-title ${styles.modalTitle}`}>
                        LOGꞮN YOUR ACCOUNT
                      </h5>
                      <button
                        type="button"
                        className="close"
                        onClick={toggleLoginModal}
                        aria-label="Close"
                      >
                        <IoIosCloseCircleOutline
                          className={`${styles.modalCloseIcon}`}
                        />
                      </button>
                    </div>
                    <div className="modal-body">
                      <form action="#">
                        <div
                          className={`login-method-toggle ${styles.loginMethodToggle}`}
                        >
                          <Link
                            to="#"
                            className={`btn-toggle text-blue ${
                              loginMethod === "email" ? styles.active : ""
                            }`}
                            onClick={() => setLoginMethod("email")}
                          >
                            Login with Email
                          </Link>
                          <Link
                            to="#"
                            className={`btn-toggle text-orange login-font-size ${
                              loginMethod === "mobile" ? styles.active : ""
                            }`}
                            onClick={() => setLoginMethod("mobile")}
                          >
                            &nbsp; Or Login with Mobile
                          </Link>
                        </div>

                        {loginMethod === "email" && (
                          <>
                            <div className={`input-block ${styles.inputBlock}`}>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email address"
                                required
                              />
                            </div>
                            <div className={`input-block ${styles.inputBlock}`}>
                              <input
                                type="password"
                                className="form-control pass-input"
                                placeholder="Enter your password"
                                required
                              />
                            </div>
                          </>
                        )}

                        {loginMethod === "mobile" && (
                          <>
                            <div className={`input-block ${styles.inputBlock}`}>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your mobile number"
                                required
                              />
                            </div>
                            <div className={`input-block ${styles.inputBlock}`}>
                              <input
                                type="password"
                                className="form-control pass-input"
                                placeholder="Enter your password"
                                required
                              />
                            </div>
                          </>
                        )}
                        <div className="forgot">
                          <span>
                            <Link className="forgot-link" to="#">
                              Forgot Password?
                            </Link>
                          </span>
                        </div>

                        <div className="remember-me">
                          <label className="custom_check mr-2 mb-0 d-inline-flex remember-me">
                            Remember me
                            <input type="checkbox" name="radio" />
                            <span className="checkmark"></span>
                          </label>
                        </div>

                        <div className="d-grid">
                          <button type="submit" className="btn submit-btn">
                            Log In Now
                          </button>
                        </div>
                      </form>

                      <div className="mb-0 pt-3 text-center">
                        Don&apos;t have an account?{" "}
                        <Link
                          to="#"
                          className="text-blue"
                          onClick={toggleRegisterModal} // Open register modal
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Register Modal */}
            {showRegisterModal && (
              // First Modal - Registration Form
              <div
                className="modal fade show"
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
                aria-modal="true"
                style={{
                  display: "block",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <div className="modal-dialog">
                  <div className="modal-content bg-light modal-content-register-custom">
                    <div className="modal-header">
                      <h5
                        className="modal-title modal-register-title"
                        id="registerModalLabel"
                      >
                        REGISTER NOW
                      </h5>
                      <button
                        type="button"
                        className="close"
                        onClick={() => setShowRegisterModal(false)} // Close register modal
                        aria-label="Close"
                      >
                        <IoIosCloseCircleOutline className="REGISTERCLOSEIcon" />
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        {/* Step 1: Registration Fields */}
                        {currentStep === 1 && (
                          <>
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Your Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div ref={recaptchaRef}></div>
                            <div className="custom-mb-phone">
                              <input
                                type="tel"
                                className="form-control"
                                name="mobile"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                placeholder="+91XXXXXXXXXX"
                                required
                              />
                            </div>

                            <button
                              type="button"
                              className="btn btn-secondary btn-sm otp-btn-register"
                              onClick={handleSendOtp}
                            >
                              Send OTP
                            </button>

                            {isOtpSent && (
                              <div className="mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="otp"
                                  value={otp}
                                  onChange={e => setOtp(e.target.value)}
                                  required
                                  placeholder="Enter OTP"
                                />
                              </div>
                            )}

                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter Your City"
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Your Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="d-grid">
                              <button type="submit" className="btn submit-btn">
                                Continue Now
                              </button>
                            </div>
                          </>
                        )}

                        {/* Step 2: Stream & Course Selection */}
                        {currentStep === 2 && (
                          <>
                            <div className="mb-3">
                              <select
                                className="form-select"
                                name="class"
                                value={secondModalData.class}
                                onChange={handleSecondModalChange}
                                required
                              >
                                <option value="">Select Class</option>
                                <option value="5th">5th</option>
                                <option value="6th">6th</option>
                                <option value="7th">7th</option>
                                <option value="8th">8th</option>
                                <option value="9th">9th</option>
                                <option value="10th">10th</option>
                                <option value="11th">11th</option>
                                <option value="12th">12th</option>
                              </select>
                            </div>

                            <div className="mb-3">
                              <select
                                className="form-select"
                                name="stream"
                                value={secondModalData.stream}
                                onChange={handleSecondModalChange}
                                required
                              >
                                <option value="">Select Stream</option>
                                <option value="Medical(NEET)">
                                  Medical(NEET)
                                </option>
                                <option value="JEE(Main + Advanced)">
                                  JEE(Main + Advanced)
                                </option>
                                <option value="Foundation (Class IX & X)">
                                  Foundation (Class IX & X)
                                </option>
                              </select>
                            </div>

                            <div className="mb-3">
                              <select
                                className="form-select"
                                name="course"
                                value={secondModalData.course}
                                onChange={handleSecondModalChange}
                                required
                              >
                                <option value="">Select Course</option>
                                <option value="Medical(NEET)">
                                  Medical(NEET)
                                </option>
                                <option value="JEE(Main + Advanced)">
                                  JEE(Main + Advanced)
                                </option>
                                <option value="Foundation (Class IX & X)">
                                  Foundation (Class IX & X)
                                </option>
                              </select>
                            </div>

                            <div className="d-grid">
                              <button type="submit" className="btn submit-btn">
                                Submit
                              </button>
                            </div>
                          </>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
