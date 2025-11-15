/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../../assets/backend/dist/css/studentadmin.css";

const AssignmentCard = ({ assignment, subject }) => {
  const navigate = useNavigate();

  //  Backend state management
  const [isSubmitted, setIsSubmitted] = useState(
    assignment.status === "submitted"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionData, setSubmissionData] = useState({
    submissionDate: assignment.submissionDate || null,
    submissionFile: assignment.submissionFile || null,
    grade: assignment.grade || null,
    feedback: assignment.feedback || null,
  });

  // Get student ID from localStorage
  const getStudentId = () => {
    const storedStudentData = localStorage.getItem("studentData");
    if (storedStudentData) {
      const studentData = JSON.parse(storedStudentData);
      return studentData.id;
    }
    return null;
  };

  console.log("Card rendering with:", {
    assignment: assignment?.name || "MISSING",
    subject: subject?.name || "MISSING",
    assignmentId: assignment?.id,
    subjectId: subject?.id,
  });

  const getStatusConfig = status => {
    const configs = {
      pending: { class: "warning", icon: "clock", text: "Pending" },
      "not-started": { class: "warning", icon: "clock", text: "Pending" },
      "in-progress": {
        class: "info",
        icon: "play-circle",
        text: "In Progress",
      },
      submitted: { class: "success", icon: "check-circle", text: "Submitted" },
      overdue: {
        class: "danger",
        icon: "exclamation-triangle",
        text: "Overdue",
      },
    };
    return configs[status] || configs.pending;
  };

  const getPriorityConfig = priority => {
    const configs = {
      high: { class: "danger", icon: "arrow-up" },
      medium: { class: "warning", icon: "minus" },
      low: { class: "success", icon: "arrow-down" },
    };
    return configs[priority] || configs.medium;
  };

  const calculateDaysLeft = lastDate => {
    const today = new Date();
    const deadline = new Date(lastDate);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewDetails = () => {
    navigate(
      `/student/assignments/${subject.id}/assignment-details/${assignment.id}`,
      {
        state: { assignment, subject },
      }
    );
  };

  // ✅ Backend assignment submission handler
  const handleSubmitAssignment = async () => {
    const studentId = getStudentId();

    if (!studentId) {
      alert("Student information not found. Please login again.");
      return;
    }

    if (!assignment?.id) {
      alert("Assignment information is missing.");
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ Real backend API call for assignment submission
      const response = await axios.post(
        `http://localhost:5000/api/assignments/student/${studentId}/assignment/${assignment.id}/submit`,
        {
          submissionFile: null, // File upload will be handled separately in file upload component
          notes: `Assignment "${assignment.name}" submitted via web interface`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout
        }
      );

      console.log(" Backend Response:", response.data);

      if (response.data.success) {
        // Update local state with submission data
        setIsSubmitted(true);
        setSubmissionData({
          submissionDate:
            response.data.submissionDate || new Date().toISOString(),
          submissionFile: null,
          grade: null,
          feedback: null,
        });

        console.log(` Assignment "${assignment.name}" submitted successfully!`);

        // Show success notification
        if (Notification.permission === "granted") {
          new Notification("Assignment Submitted!", {
            body: `${assignment.name} has been submitted successfully.`,
            icon: "/favicon.ico",
          });
        } else if (Notification.permission !== "denied") {
          // Request notification permission
          Notification.requestPermission().then(permission => {
            if (permission === "granted") {
              new Notification("Assignment Submitted!", {
                body: `${assignment.name} has been submitted successfully.`,
                icon: "/favicon.ico",
              });
            }
          });
        }

        // Optional: Show in-app success message
        const successAlert = document.createElement("div");
        successAlert.className = "alert alert-success position-fixed";
        successAlert.style.cssText =
          "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
        successAlert.innerHTML = `
          <i class="fas fa-check-circle me-2"></i>
          <strong>Success!</strong> ${assignment.name} submitted successfully.
        `;
        document.body.appendChild(successAlert);

        // Remove success message after 3 seconds
        setTimeout(() => {
          if (document.body.contains(successAlert)) {
            document.body.removeChild(successAlert);
          }
        }, 3000);
      } else {
        throw new Error(response.data.message || "Submission failed");
      }
    } catch (error) {
      console.error(" Error submitting assignment:", error);

      let errorMessage = "Failed to submit assignment. Please try again.";

      if (error.response) {
        // Backend returned an error response
        errorMessage = error.response.data?.message || errorMessage;
        console.error("Backend Error:", error.response.data);
      } else if (error.request) {
        // Network error
        errorMessage = "Network error. Please check your connection.";
        console.error("Network Error:", error.request);
      } else {
        // Other error
        console.error("Submission Error:", error.message);
      }

      // Show error message to user
      const errorAlert = document.createElement("div");
      errorAlert.className = "alert alert-danger position-fixed";
      errorAlert.style.cssText =
        "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
      errorAlert.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        <strong>Error!</strong> ${errorMessage}
      `;
      document.body.appendChild(errorAlert);

      // Remove error message after 5 seconds
      setTimeout(() => {
        if (document.body.contains(errorAlert)) {
          document.body.removeChild(errorAlert);
        }
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  //  Use local submission state, fallback to original status
  const currentStatus = isSubmitted ? "submitted" : assignment.status;
  const statusConfig = getStatusConfig(currentStatus);
  const priorityConfig = getPriorityConfig(assignment.priority);
  const daysLeft = calculateDaysLeft(assignment.lastDate);

  return (
    <div className={`assignment-student-srs-card ${currentStatus}`}>
      {/* Card Header */}
      <div className="assignment-student-srs-card-header">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <span
            className={`badge bg-${statusConfig.class} assignment-student-srs-status-badge`}
          >
            <i className={`fas fa-${statusConfig.icon} me-1`}></i>
            {statusConfig.text}
          </span>
          <div className="assignment-student-srs-priority-indicator">
            <span className={`badge bg-${priorityConfig.class} rounded-pill`}>
              <i className={`fas fa-${priorityConfig.icon} me-1`}></i>
              {assignment.priority.charAt(0).toUpperCase() +
                assignment.priority.slice(1)}
            </span>
          </div>
        </div>

        <h4 className="assignment-student-srs-title">{assignment.name}</h4>
        <div className="assignment-student-srs-meta">
          <span className="instructor">
            <i className="fas fa-user-tie me-2"></i>
            {assignment.instructor}
          </span>
          <span className="marks">
            <i className="fas fa-star me-2"></i>
            {assignment.marks} marks
          </span>
          <span className="difficulty">
            <i className="fas fa-layer-group me-2"></i>
            {assignment.difficulty || "Intermediate"}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="assignment-student-srs-card-body">
        <p className="assignment-student-srs-description">
          {assignment.description}
        </p>

        {/* Topic and Estimated Time */}
        <div className="assignment-student-srs-extra-info mb-3">
          <div className="row">
            <div className="col-6">
              <small className="text-muted">
                <i className="fas fa-bookmark me-1"></i>
                Topic: {assignment.topic}
              </small>
            </div>
            <div className="col-6">
              <small className="text-muted">
                <i className="fas fa-clock me-1"></i>
                Est. Time: {assignment.estimatedTime || "2-4 hours"}
              </small>
            </div>
          </div>
        </div>

        <div className="assignment-student-srs-dates-container">
          <div className="date-row">
            <div className="date-item">
              <i className="fas fa-calendar-plus text-primary"></i>
              <div className="date-info">
                <span className="date-label">Assigned Date</span>
                <span className="date-value">
                  {new Date(assignment.assignedDate).toLocaleDateString(
                    "en-GB"
                  )}
                </span>
              </div>
            </div>
            <div className="date-item">
              <i className="fas fa-calendar-times text-danger"></i>
              <div className="date-info">
                <span className="date-label">Last Date</span>
                <span className="date-value">
                  {new Date(assignment.lastDate).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Submission Info (if submitted) */}
        {(isSubmitted || submissionData.submissionDate) && (
          <div className="assignment-student-srs-submission-info mt-3 p-2 bg-light rounded">
            <div className="row">
              <div className="col-6">
                <small className="text-success">
                  <i className="fas fa-check-circle me-1"></i>
                  Submitted:{" "}
                  {submissionData.submissionDate
                    ? new Date(
                        submissionData.submissionDate
                      ).toLocaleDateString("en-GB")
                    : "Just now"}
                </small>
              </div>
              {submissionData.grade && (
                <div className="col-6">
                  <small className="text-primary">
                    <i className="fas fa-star me-1"></i>
                    Grade: {submissionData.grade}/{assignment.marks}
                  </small>
                </div>
              )}
            </div>
            {submissionData.feedback && (
              <div className="mt-2">
                <small className="text-muted">
                  <i className="fas fa-comment me-1"></i>
                  Feedback: {submissionData.feedback}
                </small>
              </div>
            )}
          </div>
        )}

        <div className="assignment-student-srs-countdown">
          {daysLeft > 0 ? (
            <div className="days-left success">
              <i className="fas fa-clock me-2"></i>
              <span>{daysLeft} days remaining</span>
            </div>
          ) : daysLeft === 0 ? (
            <div className="days-left warning">
              <i className="fas fa-exclamation-triangle me-2"></i>
              <span>Due Today!</span>
            </div>
          ) : (
            <div className="days-left danger">
              <i className="fas fa-exclamation-circle me-2"></i>
              <span>{Math.abs(daysLeft)} days overdue</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="assignment-student-srs-card-footer">
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={handleViewDetails}
          >
            <i className="fas fa-eye me-1"></i>
            View Details
          </button>

          {/*  Dynamic submit button with backend integration */}
          {currentStatus !== "submitted" && daysLeft >= 0 ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSubmitAssignment}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="fas fa-upload me-1"></i>
                  Submit Assignment
                </>
              )}
            </button>
          ) : currentStatus === "submitted" ? (
            <button className="btn btn-success btn-sm" disabled>
              <i className="fas fa-check me-1"></i>
              Submitted
            </button>
          ) : (
            <button className="btn btn-danger btn-sm" disabled>
              <i className="fas fa-times me-1"></i>
              Overdue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
