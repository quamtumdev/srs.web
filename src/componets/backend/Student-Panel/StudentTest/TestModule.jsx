/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TestList from "./TestList";

const API_BASE_URL = "http://localhost:5000/api/tests";

const TestModule = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const navigate = useNavigate();

  // Get studentId from localStorage
  useEffect(() => {
    const getStudentId = () => {
      const studentData = localStorage.getItem("studentData");
      if (studentData) {
        try {
          const parsed = JSON.parse(studentData);
          if (parsed.id) {
            setStudentId(parsed.id);
            console.log("TestModule - StudentId found:", parsed.id);
            return;
          }
        } catch (error) {
          console.error("TestModule - Error parsing studentData:", error);
        }
      }
      console.error("TestModule - StudentId not found!");
    };

    getStudentId();
  }, []);

  // Load tests when studentId is available
  useEffect(() => {
    if (studentId) {
      loadTests();
    }
  }, [studentId]);

  const loadTests = async () => {
    if (!studentId) {
      console.log("TestModule - Cannot load tests, studentId missing");
      return;
    }

    setLoading(true);
    try {
      console.log("TestModule - Loading tests for student:", studentId);

      const response = await axios.get(
        `${API_BASE_URL}/student/${studentId}/tests`
      );

      console.log("TestModule - Tests loaded:", response.data);

      if (response.data.success) {
        setTests(response.data.tests);
      }
    } catch (error) {
      console.error("TestModule - Error loading tests:", error);
      if (error.response) {
        console.error("TestModule - Error details:", error.response.data);
      }
      alert("Error loading tests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTest = () => {
    navigate("/student/tests/create");
  };

  const handleViewTest = testId => {
    navigate(`/student/tests/${testId}/view`);
  };

  const handleEditTest = testId => {
    navigate(`/student/tests/${testId}/edit`);
  };

  const handleDeleteTest = async testId => {
    if (!studentId) {
      alert("Student authentication required. Please refresh and try again.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this test?")) {
      return;
    }

    try {
      console.log("TestModule - Deleting test:", testId);

      const response = await axios.delete(
        `${API_BASE_URL}/student/${studentId}/tests/${testId}`
      );

      console.log("TestModule - Delete response:", response.data);

      if (response.data.success) {
        // Remove test from state
        setTests(prev => prev.filter(test => test._id !== testId));
        alert("Test deleted successfully!");
      }
    } catch (error) {
      console.error("TestModule - Error deleting test:", error);
      if (error.response) {
        console.error("TestModule - Error details:", error.response.data);
        alert(error.response.data.message || "Error deleting test");
      } else {
        alert("Error deleting test. Please check your connection.");
      }
    }
  };

  const handleStartTest = testId => {
    navigate(`/student/tests/${testId}/start`);
  };

  const handleRefresh = () => {
    loadTests();
  };

  return (
    <div className="test-module-SRS">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* Header Section */}
            <div className="test-module-SRS__header">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <div className="test-module-SRS__title-section mb-2 mb-md-0">
                  <h2 className="test-module-SRS__main-title">
                    <i className="fas fa-clipboard-list me-3"></i>
                    Test Management
                  </h2>
                  <p className="test-module-SRS__subtitle mb-0">
                    Create and manage tests for your studies
                  </p>
                </div>
                <button
                  className="btn test-module-SRS__create-btn"
                  onClick={handleCreateTest}
                  disabled={!studentId}
                >
                  <i className="fas fa-plus me-2"></i>
                  Create New Test
                </button>
              </div>

              {!studentId && (
                <div className="alert alert-warning mb-3">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  <strong>Authentication Required:</strong> Please log in to
                  access tests.
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="test-module-SRS__content">
              {studentId ? (
                <TestList
                  tests={tests}
                  loading={loading}
                  onEdit={handleEditTest}
                  onDelete={handleDeleteTest}
                  onView={handleViewTest}
                  onStart={handleStartTest}
                  onRefresh={handleRefresh}
                />
              ) : (
                <div className="alert alert-warning text-center">
                  <i className="fas fa-lock me-2"></i>
                  Please authenticate to view and manage tests.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestModule;
