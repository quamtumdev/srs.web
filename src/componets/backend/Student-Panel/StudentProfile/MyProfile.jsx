/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  validateStudentProfile,
  getApiErrorMessage,
} from "../../../../utils/validateStudentProfile";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentPhone: "",
    course: "",
    qualification: "",
    fatherName: "",
    motherName: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [profileId, setProfileId] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [errors, setErrors] = useState({});

  // Password states
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [existingPasswordLength, setExistingPasswordLength] = useState(0);

  // Image upload states
  const [profileImage, setProfileImage] = useState(
    "/assets/backend-img/user.png"
  );
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Student data from localStorage
  const [studentInfo, setStudentInfo] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  // Helper function to get full image URL
  const getImageUrl = imagePath => {
    if (!imagePath) return "/assets/backend-img/user.png";
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("/assets")) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  // Load student data from localStorage and API
  useEffect(() => {
    const loadStudentData = async () => {
      try {
        setDataLoading(true);

        // Check if user is logged in
        const token = localStorage.getItem("studentToken");
        const storedStudentData = localStorage.getItem("studentData");

        if (!token) {
          navigate("/student-login");
          return;
        }

        if (!storedStudentData) {
          setMessage("No student data found. Please login again.");
          setMessageType("error");
          setTimeout(() => {
            navigate("/student-login");
          }, 2000);
          return;
        }

        const studentData = JSON.parse(storedStudentData);
        console.log("Loaded student data from localStorage:", studentData);
        setStudentInfo(studentData);
        setProfileId(studentData.id); // Set the student ID as profileId

        // Fetch complete student registration data from API using student ID
        const response = await axios.get(
          `http://localhost:5000/api/auth/studentRegistration/profile/${studentData.id}`
        );

        if (response.data.success && response.data.student) {
          const completeStudentData = response.data.student;
          console.log("Complete student data from API:", completeStudentData);

          // Auto-populate form with student registration data
          setFormData({
            studentName: completeStudentData.studentName || "",
            studentEmail: completeStudentData.studentEmail || "",
            studentPhone: completeStudentData.studentPhone || "",
            course: completeStudentData.course || "",
            qualification: completeStudentData.qualification || "",
            fatherName: completeStudentData.fatherName || "",
            motherName: completeStudentData.motherName || "",
            state: completeStudentData.state || "",
            city: completeStudentData.city || "",
            pincode: completeStudentData.pincode || "",
            address: completeStudentData.address || "",
            password: "",
          });

          // Set profile image if exists
          if (completeStudentData.studentprofileImage) {
            setProfileImage(completeStudentData.studentprofileImage);
          }

          // Set password length indicator
          setExistingPasswordLength(8); // Default length for existing passwords

          setMessage("Profile data loaded successfully!");
          setMessageType("success");

          // Clear message after 3 seconds
          setTimeout(() => {
            setMessage("");
            setMessageType("");
          }, 3000);
        }
      } catch (error) {
        console.error("Error loading student data:", error);
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("studentToken");
          localStorage.removeItem("studentData");
          setMessage("Session expired. Please login again.");
          setMessageType("error");
          setTimeout(() => {
            navigate("/student-login");
          }, 2000);
        } else if (error.response?.status === 404) {
          setMessage("Student profile not found. Please contact support.");
          setMessageType("error");
        } else {
          setMessage("Error loading profile data. Please try again.");
          setMessageType("error");
        }
      } finally {
        setDataLoading(false);
      }
    };

    loadStudentData();
  }, [navigate]);

  // Handle input changes
  const handleInputChange = e => {
    const { id, value } = e.target;

    let processedValue = value;

    // Special handling for phone number (only 10 digits)
    if (id === "studentPhone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length <= 10) {
        processedValue = digits;
      } else {
        return;
      }
    }

    // Special handling for pincode (only 6 digits)
    if (id === "pincode") {
      const digits = value.replace(/\D/g, "");
      if (digits.length <= 6) {
        processedValue = digits;
      } else {
        return;
      }
    }

    // Special handling for password
    if (id === "password") {
      if (value.length > 128) {
        return;
      }
      setIsPasswordChanged(value.length > 0);
    }

    setFormData(prevState => ({
      ...prevState,
      [id]: processedValue,
    }));

    // Clear error when user types
    if (errors[id]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  const handleEditClick = () => {
    if (profileId) {
      navigate(`/student/profile/edit/${profileId}`);
    } else {
      navigate("/student/profile/edit");
    }
  };

  // Generate dots based on existing password length
  const getPasswordDots = () => {
    if (existingPasswordLength > 0) {
      return "•".repeat(existingPasswordLength);
    }
    return "••••••••";
  };

  // Handle password field click
  const handlePasswordClick = () => {
    setShowPasswordInput(true);
    setTimeout(() => {
      const passwordInput = document.querySelector('input[id="password"]');
      if (passwordInput) {
        passwordInput.focus();
      }
    }, 50);
  };

  // Handle cancel password edit
  const handleCancelPasswordEdit = () => {
    setShowPasswordInput(false);
    setIsPasswordChanged(false);
    setFormData(prev => ({
      ...prev,
      password: "",
    }));
  };

  // Handle image upload
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setMessage("Please select a valid image file (JPEG, PNG, GIF)");
        setMessageType("error");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage("Image size should be less than 5MB");
        setMessageType("error");
        return;
      }

      setSelectedImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input
  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  // Remove selected image
  const removeSelectedImage = () => {
    setSelectedImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Upload image to server
  const uploadImage = async file => {
    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      // Use the updated route with student ID
      const response = await axios.post(
        `http://localhost:5000/api/auth/studentRegistration/upload-image/${profileId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Create validation data (conditional password validation)
    let dataToValidate = { ...formData };

    // If password wasn't changed, remove it from validation
    if (!isPasswordChanged) {
      delete dataToValidate.password;
    }

    // Validation check
    const validationErrors = validateStudentProfile(
      dataToValidate,
      !isPasswordChanged
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage("Please fix the errors below and try again.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      let imageUrl = profileImage;

      // Upload image if selected
      if (selectedImageFile) {
        try {
          imageUrl = await uploadImage(selectedImageFile);
          setProfileImage(imageUrl);
        } catch (imageError) {
          console.error("Image upload failed:", imageError);
          setMessage(
            "Profile saved but image upload failed. Please try uploading image again."
          );
          setMessageType("warning");
        }
      }

      // Prepare form data with conditional password
      const submissionData = {
        ...formData,
        studentprofileImage: imageUrl,
      };

      // Only include password if it was changed
      if (!isPasswordChanged) {
        delete submissionData.password;
      }

      let response;

      // Always update existing profile using student ID
      response = await axios.put(
        `http://localhost:5000/api/auth/studentRegistration/profile/${profileId}`,
        submissionData
      );

      setMessage("Profile updated successfully!");
      setMessageType("success");

      // Reset password states after success
      setIsPasswordChanged(false);
      setShowPasswordInput(false);
      setFormData(prev => ({ ...prev, password: "" }));

      // Reset image states after success
      setSelectedImageFile(null);
      setImagePreview(null);

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage(getApiErrorMessage(error));
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");
    navigate("/student-login");
  };

  // Loading screen
  if (dataLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-start my-profile-SRS-container">
        <div className="col-md-9">
          {/* Show message if exists */}
          {message && (
            <div
              className={`alert ${
                messageType === "success"
                  ? "alert-success"
                  : messageType === "error"
                  ? "alert-danger"
                  : messageType === "warning"
                  ? "alert-warning"
                  : "alert-info"
              } alert-dismissible fade show mb-3`}
            >
              <i
                className={`fas ${
                  messageType === "success"
                    ? "fa-check-circle"
                    : messageType === "error"
                    ? "fa-exclamation-triangle"
                    : messageType === "warning"
                    ? "fa-exclamation-circle"
                    : "fa-info-circle"
                } me-2`}
              ></i>
              {message}
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setMessage("");
                  setMessageType("");
                }}
              ></button>
            </div>
          )}

          {/* Box Comment */}
          <div className="card card-widget shadow">
            <div className="card-header position-relative text-center my-profile-SRS-card-header">
              {/* Profile Image with Upload */}
              <div className="widget-user-image position-absolute start-50 translate-middle my-profile-SRS-widget-user-image">
                <div className="position-relative d-inline-block">
                  <img
                    className="img-circle elevation-2 my-profile-SRS-user-avatar"
                    src={imagePreview || getImageUrl(profileImage)}
                    alt="User Avatar"
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border: "4px solid #fff",
                    }}
                    onClick={triggerImageUpload}
                    onError={e => {
                      console.error("Image failed to load:", e.target.src);
                      e.target.src = "/assets/backend-img/user.png";
                    }}
                  />

                  {/* Image upload overlay */}
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      borderRadius: "50%",
                      cursor: "pointer",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                    onClick={triggerImageUpload}
                    onMouseEnter={e => (e.target.style.opacity = 1)}
                    onMouseLeave={e => (e.target.style.opacity = 0)}
                  >
                    <i
                      className="fas fa-camera text-white"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </div>

                  {/* Remove image button */}
                  {(selectedImageFile || imagePreview) && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute"
                      style={{
                        top: "-5px",
                        right: "-5px",
                        borderRadius: "50%",
                        width: "25px",
                        height: "25px",
                        padding: "0",
                        fontSize: "12px",
                      }}
                      onClick={removeSelectedImage}
                      title="Remove Image"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>

              {/* Edit Button */}
              <div className="card-tools position-absolute my-profile-SRS-card-tools">
                <button
                  type="button"
                  className="btn btn-tool bg-primary text-white"
                  data-toggle="tooltip"
                  title="Edit Profile"
                  onClick={handleEditClick}
                >
                  Edit &nbsp; <i className="fa fa-edit"></i>
                </button>
              </div>
            </div>

            {/* Form - Rest of the form remains the same */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="card-body mt-4">
                {/* Image upload info */}
                {selectedImageFile && (
                  <div className="row mb-3">
                    <div className="col-12">
                      <div className="alert alert-info">
                        <i className="fas fa-info-circle me-2"></i>
                        <strong>Image Upload:</strong> Click on profile image to
                        change it.
                        <div className="mt-2">
                          <small className="text-success">
                            <i className="fas fa-check me-1"></i>
                            Selected: {selectedImageFile.name}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="row">
                  {/* Student Name */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="studentName" className="form-label">
                      Student Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.studentName ? "is-invalid" : ""
                      }`}
                      id="studentName"
                      placeholder="Student Name"
                      value={formData.studentName}
                      onChange={handleInputChange}
                    />
                    {errors.studentName && (
                      <div className="invalid-feedback">
                        {errors.studentName}
                      </div>
                    )}
                  </div>

                  {/* Student Email */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="studentEmail" className="form-label">
                      Student Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.studentEmail ? "is-invalid" : ""
                      }`}
                      id="studentEmail"
                      placeholder="student@example.com"
                      value={formData.studentEmail}
                      onChange={handleInputChange}
                    />
                    {errors.studentEmail && (
                      <div className="invalid-feedback">
                        {errors.studentEmail}
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="password" className="form-label">
                      {showPasswordInput
                        ? "New Password"
                        : "Password (Current)"}
                      {showPasswordInput && (
                        <span className="text-danger"> *</span>
                      )}
                    </label>

                    {!showPasswordInput ? (
                      // Show dots display with edit option
                      <div style={{ position: "relative" }}>
                        <div
                          className="form-control d-flex align-items-center justify-content-between"
                          style={{
                            backgroundColor: "#f8f9fa",
                            cursor: "pointer",
                            fontFamily: "Verdana, sans-serif",
                            letterSpacing: "0.2em",
                            fontSize: "16px",
                            color: "#495057",
                            minHeight: "38px",
                          }}
                          onClick={handlePasswordClick}
                        >
                          <span>{getPasswordDots()}</span>
                          <small
                            style={{
                              fontSize: "12px",
                              color: "#6c757d",
                              letterSpacing: "normal",
                              fontFamily: "inherit",
                            }}
                          >
                            Click to edit
                          </small>
                        </div>
                      </div>
                    ) : (
                      // Show password input with cancel option
                      <div style={{ position: "relative" }}>
                        <input
                          type="password"
                          className={`form-control ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          id="password"
                          placeholder="Enter new password (minimum 6 characters)"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary position-absolute"
                          style={{
                            right: "8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: "12px",
                            padding: "2px 8px",
                          }}
                          onClick={handleCancelPasswordEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    {errors.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Student Phone */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="studentPhone" className="form-label">
                      Student Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${
                        errors.studentPhone ? "is-invalid" : ""
                      }`}
                      id="studentPhone"
                      placeholder="+91 234 567 8900"
                      value={formData.studentPhone}
                      onChange={handleInputChange}
                      maxLength="10"
                    />
                    {errors.studentPhone && (
                      <div className="invalid-feedback">
                        {errors.studentPhone}
                      </div>
                    )}
                  </div>

                  {/* Course */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="course" className="form-label">
                      Course <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.course ? "is-invalid" : ""
                      }`}
                      id="course"
                      placeholder="Enter course"
                      value={formData.course}
                      onChange={handleInputChange}
                    />
                    {errors.course && (
                      <div className="invalid-feedback">{errors.course}</div>
                    )}
                  </div>

                  {/* Qualification */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="qualification" className="form-label">
                      Qualification <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.qualification ? "is-invalid" : ""
                      }`}
                      id="qualification"
                      placeholder="Enter qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                    />
                    {errors.qualification && (
                      <div className="invalid-feedback">
                        {errors.qualification}
                      </div>
                    )}
                  </div>

                  {/* Father Name */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fatherName" className="form-label">
                      Father Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.fatherName ? "is-invalid" : ""
                      }`}
                      id="fatherName"
                      placeholder="Enter father's name"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                    />
                    {errors.fatherName && (
                      <div className="invalid-feedback">
                        {errors.fatherName}
                      </div>
                    )}
                  </div>

                  {/* Mother Name */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="motherName" className="form-label">
                      Mother Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.motherName ? "is-invalid" : ""
                      }`}
                      id="motherName"
                      placeholder="Enter mother's name"
                      value={formData.motherName}
                      onChange={handleInputChange}
                    />
                    {errors.motherName && (
                      <div className="invalid-feedback">
                        {errors.motherName}
                      </div>
                    )}
                  </div>

                  {/* State */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="state" className="form-label">
                      State <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.state ? "is-invalid" : ""
                      }`}
                      id="state"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                    {errors.state && (
                      <div className="invalid-feedback">{errors.state}</div>
                    )}
                  </div>

                  {/* City */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="city" className="form-label">
                      City <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.city ? "is-invalid" : ""
                      }`}
                      id="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city}</div>
                    )}
                  </div>

                  {/* Pincode */}
                  <div className="col-md-12 mb-3">
                    <label htmlFor="pincode" className="form-label">
                      Pincode <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.pincode ? "is-invalid" : ""
                      }`}
                      id="pincode"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      maxLength="6"
                    />
                    {errors.pincode && (
                      <div className="invalid-feedback">{errors.pincode}</div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="col-12 mb-3">
                    <label htmlFor="address" className="form-label">
                      Address <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className={`form-control ${
                        errors.address ? "is-invalid" : ""
                      }`}
                      id="address"
                      rows="3"
                      placeholder="Enter full address"
                      value={formData.address}
                      onChange={handleInputChange}
                    ></textarea>
                    {errors.address && (
                      <div className="invalid-feedback">{errors.address}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="card-footer d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  <i className="fa fa-save me-2"></i>
                  {loading ? "Saving..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
