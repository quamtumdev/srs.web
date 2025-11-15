/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/tests";

const ViewTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState(null);

  // Get studentId from localStorage
  useEffect(() => {
    const getStudentId = () => {
      const studentData = localStorage.getItem("studentData");
      if (studentData) {
        try {
          const parsed = JSON.parse(studentData);
          if (parsed.id) {
            setStudentId(parsed.id);
            console.log("ViewTest - StudentId found:", parsed.id);
            return;
          }
        } catch (error) {
          console.error("ViewTest - Error parsing studentData:", error);
        }
      }
      console.error("ViewTest - StudentId not found!");
    };

    getStudentId();
  }, []);

  // Load test when studentId is available
  useEffect(() => {
    if (studentId && id) {
      loadTest();
    }
  }, [studentId, id]);

  const loadTest = async () => {
    if (!studentId) {
      console.log("ViewTest - Cannot load test, studentId missing");
      return;
    }

    setLoading(true);
    try {
      console.log("ViewTest - Loading test:", { studentId, testId: id });

      const response = await axios.get(
        `${API_BASE_URL}/student/${studentId}/tests/${id}`
      );

      console.log("ViewTest - Test loaded:", response.data);

      if (response.data.success) {
        setTest(response.data.test);
      }
    } catch (error) {
      console.error("ViewTest - Error loading test:", error);
      if (error.response) {
        console.error("ViewTest - Error details:", error.response.data);
        alert(error.response.data.message || "Error loading test");
      } else {
        alert("Error loading test. Please check your connection.");
      }
      navigate("/student/tests");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    console.log("ViewTest - Navigating back to tests");
    navigate("/student/tests");
  };

  const handleEdit = () => {
    console.log("ViewTest - Navigating to edit:", id);
    navigate(`/student/tests/${id}/edit`);
  };

  const handleStartTest = () => {
    console.log("ViewTest - Starting test:", id);
    navigate(`/student/tests/${id}/start`);
  };

  const handleDelete = async () => {
    if (!studentId) {
      alert("Student authentication required. Please refresh and try again.");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to delete the test "${test.title}"?`
      )
    ) {
      console.log("ViewTest - Delete cancelled");
      return;
    }

    try {
      console.log("ViewTest - Deleting test:", id);

      const response = await axios.delete(
        `${API_BASE_URL}/student/${studentId}/tests/${id}`
      );

      console.log("ViewTest - Delete response:", response.data);

      if (response.data.success) {
        alert("Test deleted successfully!");
        navigate("/student/tests");
      }
    } catch (error) {
      console.error("ViewTest - Error deleting test:", error);
      if (error.response) {
        console.error("ViewTest - Error details:", error.response.data);
        alert(error.response.data.message || "Error deleting test");
      } else {
        alert("Error deleting test. Please check your connection.");
      }
    }
  };

  const handleTogglePublish = async () => {
    if (!studentId) {
      alert("Student authentication required. Please refresh and try again.");
      return;
    }

    try {
      console.log("ViewTest - Toggling publish status:", id);

      const response = await axios.patch(
        `${API_BASE_URL}/student/${studentId}/tests/${id}/publish`
      );

      console.log("ViewTest - Publish toggle response:", response.data);

      if (response.data.success) {
        setTest(response.data.test);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("ViewTest - Error toggling publish:", error);
      if (error.response) {
        console.error("ViewTest - Error details:", error.response.data);
        alert(error.response.data.message || "Error updating test status");
      } else {
        alert("Error updating test. Please check your connection.");
      }
    }
  };

  const formatDate = dateValue => {
    if (!dateValue) return "N/A";
    try {
      return new Date(dateValue).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };

  if (loading) {
    return (
      <div className="test-module-SRS">
        <div className="container-fluid">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div
              className="spinner-border test-module-SRS__spinner"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading test details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="test-module-SRS">
        <div className="container-fluid">
          <div className="text-center" style={{ padding: "100px 0" }}>
            <i className="fas fa-exclamation-triangle fa-4x text-warning mb-4"></i>
            <h4>Test Not Found</h4>
            <p className="text-muted">
              The test you are looking for does not exist or has been deleted.
            </p>
            <button className="btn btn-primary mt-3" onClick={handleBack}>
              <i className="fas fa-arrow-left me-2"></i>
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="test-module-SRS">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="test-module-SRS__header">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <div className="test-module-SRS__title-section mb-2 mb-md-0">
                  <h2 className="test-module-SRS__main-title">
                    <i className="fas fa-eye me-3"></i>
                    {test.title}
                  </h2>
                  <p className="test-module-SRS__subtitle mb-0">
                    Review test details and questions
                  </p>
                </div>
                <div className="d-flex gap-2">
                  {/* {test.isPublished ? (
                    <span className="badge bg-success fs-6 px-3 py-2">
                      <i className="fas fa-check-circle me-2"></i>
                      Published
                    </span>
                  ) : (
                    <span className="badge bg-warning text-dark fs-6 px-3 py-2">
                      <i className="fas fa-pencil-alt me-2"></i>
                      Draft
                    </span>
                  )} */}
                  <button
                    className="btn test-module-SRS__back-btn"
                    onClick={handleBack}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Tests
                  </button>
                </div>
              </div>
            </div>

            <div className="test-module-SRS__content">
              <div className="test-module-SRS__view-test">
                {/* Test Details Card */}
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card test-module-SRS__view-details-card">
                      <div className="card-header test-module-SRS__view-card-header">
                        <h4 className="mb-0 text-white">
                          <i className="fas fa-clipboard-list me-3"></i>
                          Test Information
                        </h4>
                      </div>
                      <div className="card-body">
                        <div className="row g-3">
                          <div className="col-md-3 col-6">
                            <div className="test-module-SRS__detail-item">
                              <i className="fas fa-book text-primary me-2"></i>
                              <strong>Subject:</strong>
                              <div className="ms-4">{test.subject}</div>
                            </div>
                          </div>
                          <div className="col-md-3 col-6">
                            <div className="test-module-SRS__detail-item">
                              <i className="fas fa-star text-warning me-2"></i>
                              <strong>Total Marks:</strong>
                              <div className="ms-4">{test.totalMarks}</div>
                            </div>
                          </div>
                          <div className="col-md-3 col-6">
                            <div className="test-module-SRS__detail-item">
                              <i className="fas fa-clock text-info me-2"></i>
                              <strong>Time Limit:</strong>
                              <div className="ms-4">
                                {test.timeLimit} minutes
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-6">
                            <div className="test-module-SRS__detail-item">
                              <i className="fas fa-question-circle text-success me-2"></i>
                              <strong>Questions:</strong>
                              <div className="ms-4">
                                {test.questionsCount ||
                                  test.questions?.length ||
                                  0}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-6">
                            <div className="test-module-SRS__detail-item">
                              <i className="fas fa-calendar text-secondary me-2"></i>
                              <strong>Created:</strong>
                              <div className="ms-4">
                                {formatDate(test.createdAt || test.createdDate)}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-6">
                            <div className="test-module-SRS__detail-item">
                              <i className="fas fa-edit text-primary me-2"></i>
                              <strong>Last Updated:</strong>
                              <div className="ms-4">
                                {formatDate(test.updatedAt)}
                              </div>
                            </div>
                          </div>
                        </div>

                        {test.instructions && (
                          <div className="mt-4">
                            <h6 className="test-module-SRS__instruction-title">
                              <i className="fas fa-info-circle me-2"></i>
                              Test Instructions
                            </h6>
                            <div className="test-module-SRS__instruction-content p-3 bg-light rounded">
                              {test.instructions}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="mb-3">
                          <i className="fas fa-cog me-2"></i>
                          Actions
                        </h6>
                        <div className="d-flex flex-wrap gap-2">
                          <button
                            className="btn btn-success btn-lg"
                            onClick={handleStartTest}
                          >
                            <i className="fas fa-play me-2"></i>
                            Start Test
                          </button>
                          <button
                            className="btn btn-primary btn-lg"
                            onClick={handleEdit}
                          >
                            <i className="fas fa-edit me-2"></i>
                            Edit Test
                          </button>
                          <button
                            className={`btn btn-lg ${
                              test.isPublished
                                ? "btn-warning"
                                : "btn-outline-success"
                            }`}
                            onClick={handleTogglePublish}
                          >
                            <i
                              className={`fas ${
                                test.isPublished ? "fa-eye-slash" : "fa-eye"
                              } me-2`}
                            ></i>
                            {test.isPublished ? "Unpublish" : "Publish"}
                          </button>

                          {/* <button
                            className="btn btn-outline-danger btn-lg"
                            onClick={handleDelete}
                          >
                            <i className="fas fa-trash me-2"></i>
                            Delete
                          </button> */}
                        </div>
                      </div>
                    </div>
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

export default ViewTest;
