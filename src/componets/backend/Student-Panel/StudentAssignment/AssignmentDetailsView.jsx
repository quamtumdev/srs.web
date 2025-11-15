/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "../../../../assets/backend/dist/css/studentadmin.css";

const AssignmentDetailsView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subjectId, assignmentId } = useParams();
  const fileInputRef = useRef(null);

  // State management
  const [assignment, setAssignment] = useState(null);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notifications, setNotifications] = useState([]);

  console.log(
    "Details View - Subject ID:",
    subjectId,
    "Assignment ID:",
    assignmentId
  );

  // Initialize student ID
  useEffect(() => {
    const storedStudentData = localStorage.getItem("studentData");
    if (storedStudentData) {
      try {
        const studentData = JSON.parse(storedStudentData);
        setStudentId(studentData.id);
      } catch (err) {
        console.error("Error parsing student data:", err);
        setError("Invalid student data. Please login again.");
      }
    } else {
      setError("No student data found. Please login first.");
    }
  }, []);

  // Fetch assignment details
  useEffect(() => {
    if (!subjectId || !assignmentId || !studentId) {
      setLoading(false);
      return;
    }
    fetchAssignmentDetails();
  }, [subjectId, assignmentId, studentId]);

  // Notification system
  const showNotification = useCallback((type, message, duration = 5000) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, duration);
  }, []);

  // Fetch assignment details from backend
  const fetchAssignmentDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(
        "Fetching assignment details for Student:",
        studentId,
        "Assignment:",
        assignmentId
      );

      const response = await axios.get(
        `http://localhost:5000/api/assignments/student/${studentId}/assignment/${assignmentId}`,
        { timeout: 10000 }
      );

      console.log("Backend Assignment Response:", response.data);

      if (response.data.success) {
        setAssignment(response.data.assignment);

        const backendSubject = {
          id: response.data.assignment.subjectId,
          name: response.data.assignment.subject,
          slug: response.data.assignment.subject.toLowerCase(),
        };
        setCurrentSubject(backendSubject);

        console.log("Assignment loaded:", response.data.assignment.name);
      } else {
        throw new Error(response.data.message || "Assignment not found");
      }
    } catch (error) {
      console.error("Error fetching assignment details:", error);

      let errorMessage = "Failed to load assignment details";
      if (error.response?.status === 404) {
        errorMessage = "Assignment not found or not assigned to you";
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "Request timeout - please try again";
      } else if (error.response?.status >= 500) {
        errorMessage = "Server error - please try again later";
      }

      setError(errorMessage);

      // Fallback to location state
      if (location.state?.assignment) {
        console.log("Using fallback data from navigation state");
        setAssignment(location.state.assignment);
        if (location.state?.subject) {
          setCurrentSubject(location.state.subject);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // File selection with enhanced validation
  const handleFileSelection = useCallback(
    event => {
      const file = event.target.files[0];
      if (!file) {
        setSelectedFile(null);
        return;
      }

      // File size validation (10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        showNotification(
          "error",
          `File size (${(file.size / 1024 / 1024).toFixed(
            2
          )}MB) exceeds 10MB limit`
        );
        event.target.value = "";
        return;
      }

      // File type validation
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];

      if (!allowedTypes.includes(file.type)) {
        showNotification(
          "error",
          "Invalid file type. Please select PDF, DOC, DOCX, TXT, JPG, or PNG files only."
        );
        event.target.value = "";
        return;
      }

      setSelectedFile(file);
      showNotification(
        "success",
        `File "${file.name}" selected successfully`,
        3000
      );
      console.log(
        "File selected:",
        file.name,
        "Size:",
        file.size,
        "Type:",
        file.type
      );
    },
    [showNotification]
  );

  // Assignment submission
  const handleSubmitAssignment = async () => {
    if (!studentId || !assignmentId) {
      showNotification("error", "Missing required information for submission");
      return;
    }

    if (!selectedFile) {
      showNotification("error", "Please select a file to submit");
      return;
    }

    // Check if assignment is already submitted
    if (assignment.status === "submitted") {
      showNotification("warning", "Assignment is already submitted");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      console.log("Submitting assignment:", assignment.name);

      const formData = new FormData();
      formData.append("submissionFile", selectedFile);
      formData.append(
        "notes",
        `Assignment "${assignment.name}" submitted from details view`
      );

      const response = await axios.post(
        `http://localhost:5000/api/assignments/student/${studentId}/assignment/${assignmentId}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000, // Increased timeout for large files
          onUploadProgress: progressEvent => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data.success) {
        // Update assignment state
        setAssignment(prev => ({
          ...prev,
          status: "submitted",
          submissionDate:
            response.data.submissionDate || new Date().toISOString(),
          submissionFile: selectedFile.name,
        }));

        // Clear file selection
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        showNotification("success", "Assignment submitted successfully!", 4000);
        console.log("Assignment submitted successfully!");
      } else {
        throw new Error(response.data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);

      let errorMessage = "Failed to submit assignment";
      if (error.response?.status === 400) {
        errorMessage =
          error.response.data?.message || "Invalid submission data";
      } else if (error.response?.status === 413) {
        errorMessage = "File too large for server";
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "Upload timeout - file may be too large";
      }

      showNotification("error", errorMessage, 6000);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  // Download resources
  const handleDownloadResources = async () => {
    try {
      console.log("Downloading assignment resources for:", assignment.name);

      const response = await axios.get(
        `http://localhost:5000/api/assignments/student/${studentId}/assignment/${assignmentId}/download-resources`,
        {
          responseType: "blob",
          timeout: 30000,
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;

      const filename = `${assignment.name.replace(
        /[^a-z0-9]/gi,
        "_"
      )}_Resources.pdf`;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      showNotification("success", `Resources downloaded: ${filename}`, 3000);
      console.log("Resources downloaded successfully:", filename);
    } catch (error) {
      console.error("Download error:", error);

      let errorMessage = "Failed to download resources";
      if (error.response?.status === 404) {
        errorMessage = "Resources not found for this assignment";
      }

      showNotification("error", errorMessage);
    }
  };

  const handleBack = () => {
    navigate(`/student/assignments/${subjectId}`);
  };

  // Helper functions
  const calculateDaysLeft = lastDate => {
    if (!lastDate) return 0;
    const today = new Date();
    const deadline = new Date(lastDate);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusClass = status => {
    const statusClasses = {
      pending: "warning",
      "not-started": "warning",
      "in-progress": "info",
      submitted: "success",
      graded: "primary",
      overdue: "danger",
    };
    return `bg-${statusClasses[status?.toLowerCase()] || "warning"}`;
  };

  const getPriorityClass = priority => {
    const priorityClasses = {
      high: "danger",
      medium: "warning",
      low: "success",
    };
    return `bg-${priorityClasses[priority?.toLowerCase()] || "warning"}`;
  };

  const formatFileSize = bytes => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Loading state
  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card custom-physics-details-view__card">
              <div className="card-body text-center py-5">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h4>Loading Assignment Details...</h4>
                <p className="text-muted">
                  Please wait while we fetch your assignment information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !assignment) {
    return (
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card custom-physics-details-view__error-card">
              <div className="card-body text-center">
                <i className="fas fa-exclamation-triangle fa-4x text-warning mb-3"></i>
                <h2 className="custom-physics-details-view__error-title">
                  Assignment Not Found
                </h2>
                <p className="custom-physics-details-view__error-message">
                  {error}
                </p>
                <div className="mt-4">
                  <button
                    onClick={handleBack}
                    className="btn btn-secondary me-2"
                  >
                    <i className="fas fa-arrow-left me-2"></i>Back to
                    Assignments
                  </button>
                  <button
                    onClick={fetchAssignmentDetails}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-redo me-2"></i>Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Subject not found
  if (!currentSubject) {
    return (
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card custom-physics-details-view__error-card">
              <div className="card-body text-center">
                <h2 className="custom-physics-details-view__error-title">
                  Subject not found
                </h2>
                <p className="custom-physics-details-view__error-message">
                  The requested subject could not be found.
                </p>
                <button
                  onClick={() => navigate("/student/assignments")}
                  className="btn btn-secondary"
                >
                  <i className="fas fa-arrow-left me-2"></i>Back to Subjects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Assignment not found
  if (!assignment) {
    return (
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card custom-physics-details-view__error-card">
              <div className="card-body text-center">
                <h2 className="custom-physics-details-view__error-title">
                  Assignment not found
                </h2>
                <p className="custom-physics-details-view__error-message">
                  The requested assignment could not be found in{" "}
                  {currentSubject.name}.
                </p>
                <button onClick={handleBack} className="btn btn-secondary">
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to {currentSubject.name} Assignments
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const daysLeft = calculateDaysLeft(assignment.lastDate);
  const isOverdue = daysLeft < 0;
  const isSubmitted =
    assignment.status === "submitted" || assignment.status === "graded";

  return (
    <div className="container-fluid py-4 custom-physics-details-view">
      {/* Notification System */}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`alert alert-${
              notification.type === "error" ? "danger" : notification.type
            } alert-dismissible fade show`}
            role="alert"
            style={{ minWidth: "350px" }}
          >
            <i
              className={`fas fa-${
                notification.type === "success"
                  ? "check-circle"
                  : notification.type === "error"
                  ? "exclamation-triangle"
                  : notification.type === "warning"
                  ? "exclamation-circle"
                  : "info-circle"
              } me-2`}
            ></i>
            {notification.message}
          </div>
        ))}
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-12 col-xl-12">
          <div className="card custom-physics-details-view__card shadow-lg">
            <div className="card-body p-4">
              {/* Error Alert */}
              {error && (
                <div className="row mb-3">
                  <div className="col">
                    <div className="alert alert-warning">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      <strong>Note:</strong> {error}. Showing cached data.
                    </div>
                  </div>
                </div>
              )}

              {/* Back Button */}
              <div className="row mb-4">
                <div className="col">
                  <button
                    className="btn btn-outline-secondary custom-physics-details-view__back-btn btn-sm"
                    onClick={handleBack}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to {currentSubject.name} Assignments
                  </button>
                </div>
              </div>

              {/* Header */}
              <div className="row mb-4">
                <div className="col-md-8">
                  <h1 className="custom-physics-details-view__title mb-0">
                    {assignment.name}
                  </h1>
                  {assignment.submissionDate && (
                    <small className="text-success mt-2 d-block">
                      <i className="fas fa-check-circle me-1"></i>
                      Submitted on:{" "}
                      {new Date(assignment.submissionDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </small>
                  )}
                  {assignment.submissionFile && (
                    <small className="text-info mt-1 d-block">
                      <i className="fas fa-file me-1"></i>
                      Submitted file: {assignment.submissionFile}
                    </small>
                  )}
                </div>
                <div className="col-md-4 text-md-end">
                  <span
                    className={`badge ${getStatusClass(
                      assignment.status
                    )} custom-physics-details-view__status-badge`}
                  >
                    <span className="custom-physics-details-view__status-indicator me-2"></span>
                    {assignment.status?.toUpperCase() || "PENDING"}
                  </span>
                  {isOverdue && !isSubmitted && (
                    <div className="mt-2">
                      <span className="badge bg-danger">
                        <i className="fas fa-clock me-1"></i>
                        OVERDUE
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Meta Information */}
              <div className="row mb-4">
                <div className="col-lg-4 col-md-6 mb-3">
                  <div className="custom-physics-details-view__meta-item">
                    <i className="fas fa-user-tie me-2 text-primary"></i>
                    <span className="fw-bold">Instructor:</span>
                    <span className="ms-2">{assignment.instructor}</span>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                  <div className="custom-physics-details-view__meta-item">
                    <i className="fas fa-star me-2 text-warning"></i>
                    <span className="fw-bold">Marks:</span>
                    <span className="ms-2">{assignment.marks}</span>
                    {assignment.grade && (
                      <span className="badge bg-info ms-2">
                        Grade: {assignment.grade}/{assignment.marks}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 mb-3">
                  <div className="custom-physics-details-view__meta-item">
                    <i className="fas fa-exclamation-triangle me-2 text-danger"></i>
                    <span className="fw-bold">Priority:</span>
                    <span
                      className={`badge ${getPriorityClass(
                        assignment.priority
                      )} ms-2`}
                    >
                      {assignment.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="row mb-4">
                <div className="col">
                  <div className="custom-physics-details-view__dates p-4 rounded">
                    <div className="row text-center text-white">
                      <div className="col-md-4 mb-3 mb-md-0">
                        <div className="custom-physics-details-view__date-item">
                          <div className="custom-physics-details-view__date-label">
                            Assigned Date
                          </div>
                          <div className="custom-physics-details-view__date-value">
                            {new Date(
                              assignment.assignedDate
                            ).toLocaleDateString("en-GB")}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3 mb-md-0">
                        <div className="custom-physics-details-view__date-item">
                          <div className="custom-physics-details-view__date-label">
                            Last Date
                          </div>
                          <div className="custom-physics-details-view__date-value">
                            {new Date(assignment.lastDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="custom-physics-details-view__time-remaining">
                          <span className="custom-physics-details-view__remaining-text">
                            {daysLeft > 0
                              ? `${daysLeft} days remaining`
                              : daysLeft === 0
                              ? "Due Today!"
                              : `${Math.abs(daysLeft)} days overdue`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="row mb-4">
                <div className="col">
                  <div className="custom-physics-details-view__description">
                    <h3 className="custom-physics-details-view__section-title">
                      Assignment Details
                    </h3>
                    <p className="custom-physics-details-view__description-text">
                      {assignment.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* File Upload Section */}
              {!isSubmitted && !isOverdue && (
                <div className="row mb-4">
                  <div className="col">
                    <div className="custom-physics-details-view__file-upload">
                      <h4 className="custom-physics-details-view__section-title">
                        Submit Your Work:
                      </h4>
                      <div className="mb-3">
                        <label htmlFor="assignmentFile" className="form-label">
                          Choose file to submit (PDF, DOC, DOCX, TXT, JPG, PNG -
                          Max 10MB):
                        </label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="form-control"
                          id="assignmentFile"
                          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                          onChange={handleFileSelection}
                          disabled={isSubmitting}
                        />
                        {selectedFile && (
                          <div className="mt-2 p-3 bg-light rounded">
                            <div className="d-flex align-items-center">
                              <i className="fas fa-file text-primary me-2"></i>
                              <div className="flex-grow-1">
                                <div className="fw-medium">
                                  {selectedFile.name}
                                </div>
                                <small className="text-muted">
                                  {formatFileSize(selectedFile.size)}
                                </small>
                              </div>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => {
                                  setSelectedFile(null);
                                  if (fileInputRef.current)
                                    fileInputRef.current.value = "";
                                }}
                                disabled={isSubmitting}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {isSubmitting && uploadProgress > 0 && (
                        <div className="mb-3">
                          <div className="progress" style={{ height: "20px" }}>
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated"
                              role="progressbar"
                              style={{ width: `${uploadProgress}%` }}
                            >
                              {uploadProgress}%
                            </div>
                          </div>
                          <small className="text-muted mt-1">
                            Uploading... Please dont close this page.
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback Section */}
              {assignment.feedback && (
                <div className="row mb-4">
                  <div className="col">
                    <div className="custom-physics-details-view__feedback">
                      <h4 className="custom-physics-details-view__section-title">
                        Instructor Feedback:
                      </h4>
                      <div className="alert alert-info">
                        <i className="fas fa-comment me-2"></i>
                        {assignment.feedback}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="row mb-4">
                <div className="col">
                  <div className="custom-physics-details-view__additional-info">
                    <h4 className="custom-physics-details-view__section-title">
                      Additional Information:
                    </h4>
                    <div className="row">
                      <div className="col-lg-3 col-md-6 mb-3">
                        <div className="custom-physics-details-view__info-item">
                          <span className="custom-physics-details-view__info-label">
                            Subject:
                          </span>
                          <span className="custom-physics-details-view__info-value">
                            {currentSubject.name} - {assignment.topic}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 mb-3">
                        <div className="custom-physics-details-view__info-item">
                          <span className="custom-physics-details-view__info-label">
                            Difficulty Level:
                          </span>
                          <span className="custom-physics-details-view__info-value">
                            {assignment.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 mb-3">
                        <div className="custom-physics-details-view__info-item">
                          <span className="custom-physics-details-view__info-label">
                            Estimated Time:
                          </span>
                          <span className="custom-physics-details-view__info-value">
                            {assignment.estimatedTime}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 mb-3">
                        <div className="custom-physics-details-view__info-item">
                          <span className="custom-physics-details-view__info-label">
                            Assignment ID:
                          </span>
                          <span className="custom-physics-details-view__info-value">
                            #{assignment.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="row">
                <div className="col">
                  <div className="custom-physics-details-view__actions text-center">
                    {!isSubmitted && !isOverdue ? (
                      <button
                        className="btn btn-success btn-sm custom-physics-details-view__btn me-3 mb-2"
                        onClick={handleSubmitAssignment}
                        disabled={isSubmitting || !selectedFile}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Uploading... {uploadProgress}%
                          </>
                        ) : (
                          <>
                            <i className="fas fa-upload me-2"></i>
                            Submit Assignment
                          </>
                        )}
                      </button>
                    ) : isSubmitted ? (
                      <button
                        className="btn btn-success btn-sm custom-physics-details-view__btn me-3 mb-2"
                        disabled
                      >
                        <i className="fas fa-check me-2"></i>
                        Assignment Submitted
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger btn-sm custom-physics-details-view__btn me-3 mb-2"
                        disabled
                      >
                        <i className="fas fa-times me-2"></i>
                        Submission Overdue
                      </button>
                    )}

                    <button
                      className="btn btn-outline-primary btn-sm custom-physics-details-view__btn me-3 mb-2"
                      onClick={handleDownloadResources}
                    >
                      <i className="fas fa-download me-2"></i>
                      Download Resources
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-sm custom-physics-details-view__btn back-assignement-btn-srs mb-2"
                      onClick={handleBack}
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Back to Assignments
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetailsView;
