import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TestBasicInfo from "./TestBasicInfo";
import QuestionManager from "./QuestionManager";
import TestPreview from "./TestPreview";

const API_BASE_URL = "http://localhost:5000/api/tests";

const EditTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [testData, setTestData] = useState({
    title: "",
    subject: "",
    instructions: "",
    totalMarks: "",
    timeLimit: "",
    questions: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get studentId from localStorage
  useEffect(() => {
    const getStudentId = () => {
      const studentData = localStorage.getItem("studentData");
      if (studentData) {
        try {
          const parsed = JSON.parse(studentData);
          if (parsed.id) {
            setStudentId(parsed.id);
            console.log("EditTest - StudentId found:", parsed.id);
            return;
          }
        } catch (error) {
          console.error("Error parsing studentData:", error);
        }
      }
      console.error("EditTest - StudentId not found!");
    };

    getStudentId();
  }, []);

  // Load test data from backend
  useEffect(() => {
    if (studentId && id) {
      loadTestData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, studentId]);

  const loadTestData = async () => {
    if (!studentId) {
      console.log("EditTest - Waiting for studentId...");
      return;
    }

    setLoading(true);
    try {
      console.log("EditTest - Loading test:", { studentId, testId: id });

      const response = await axios.get(
        `${API_BASE_URL}/student/${studentId}/tests/${id}`
      );

      console.log("EditTest - Test loaded:", response.data);

      if (response.data.success) {
        const test = response.data.test;

        // Transform backend data to match frontend format
        const transformedData = {
          title: test.title,
          subject: test.subject,
          instructions: test.instructions || "",
          totalMarks: test.totalMarks,
          timeLimit: test.timeLimit,
          questions: test.questions || [],
        };

        setTestData(transformedData);
        setOriginalData(transformedData);
      }
    } catch (error) {
      console.error("Error loading test:", error);
      if (error.response) {
        console.error("Error details:", error.response.data);
        alert(error.response.data.message || "Error loading test");
      } else {
        alert("Error loading test. Please check your connection.");
      }
      navigate("/student/tests");
    } finally {
      setLoading(false);
    }
  };

  const handleBasicInfoChange = (field, value) => {
    setTestData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleQuestionsChange = questions => {
    setTestData(prev => ({
      ...prev,
      questions,
    }));
  };

  const validateBasicInfo = () => {
    const newErrors = {};

    if (!testData.title.trim()) {
      newErrors.title = "Test title is required";
    }

    if (!testData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!testData.totalMarks || testData.totalMarks <= 0) {
      newErrors.totalMarks = "Total marks must be greater than 0";
    }

    if (!testData.timeLimit || testData.timeLimit <= 0) {
      newErrors.timeLimit = "Time limit must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateBasicInfo()) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    if (!studentId) {
      alert("Student authentication required. Please refresh and try again.");
      return;
    }

    if (testData.questions.length === 0) {
      alert("Please add at least one question to the test.");
      return;
    }

    try {
      setIsUpdating(true);

      console.log("EditTest - Updating test:", {
        studentId,
        testId: id,
        testData,
      });

      const response = await axios.put(
        `${API_BASE_URL}/student/${studentId}/tests/${id}`,
        {
          title: testData.title,
          subject: testData.subject,
          instructions: testData.instructions,
          totalMarks: parseInt(testData.totalMarks),
          timeLimit: parseInt(testData.timeLimit),
          questions: testData.questions,
        }
      );

      console.log("EditTest - Update response:", response.data);

      if (response.data.success) {
        alert("Test updated successfully!");
        navigate(`/student/tests/${id}/view`);
      }
    } catch (error) {
      console.error("Error updating test:", error);
      if (error.response) {
        console.error("Error details:", error.response.data);
        alert(
          error.response.data.message ||
            "Error updating test. Please try again."
        );
      } else {
        alert("Error updating test. Please check your connection.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    navigate(`/student/tests/${id}/view`);
  };

  const handleResetToOriginal = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all changes? This will restore the original test content."
      )
    ) {
      setTestData(originalData);
      setCurrentStep(1);
      setErrors({});
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <TestBasicInfo
            testData={testData}
            errors={errors}
            onChange={handleBasicInfoChange}
          />
        );
      case 2:
        return (
          <QuestionManager
            questions={testData.questions}
            onChange={handleQuestionsChange}
          />
        );
      case 3:
        return <TestPreview testData={testData} />;
      default:
        return null;
    }
  };

  const colorbtn = {
    color: isHovered ? "#000" : "#222",
    border: "1px solid #222",
  };
  if (loading) {
    return (
      <div className="test-module-SRS">
        <div className="container-fluid">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div
              className="spinner-border test-module-SRS__spinner"
              role="status"
            >
              <span className="visually-hidden">Loading test data...</span>
            </div>
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
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="test-module-SRS__title-section">
                  <h2 className="test-module-SRS__main-title">
                    <i className="fas fa-edit me-3"></i>
                    Edit Test: {testData.title}
                  </h2>
                  <p className="test-module-SRS__subtitle">
                    Modify your test details and questions
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-warning"
                    onClick={handleResetToOriginal}
                    title="Reset to original"
                    disabled={isUpdating}
                  >
                    <i className="fas fa-undo me-2"></i>
                    Reset
                  </button>
                  <button
                    className="btn test-module-SRS__back-btn"
                    onClick={handleCancel}
                    disabled={isUpdating}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to View
                  </button>
                </div>
              </div>
            </div>

            <div className="test-module-SRS__content">
              <div className="test-module-SRS__edit-test">
                <div className="card test-module-SRS__edit-card">
                  <div className="card-header test-module-SRS__edit-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="mb-0 text-white">
                        <i className="fas fa-pencil-alt me-3"></i>
                        Editing Test
                      </h4>
                    </div>
                  </div>

                  <div className="card-body">
                    {/* Progress Steps */}
                    <div className="test-module-SRS__steps mb-4">
                      <div className="row">
                        <div className="col-4">
                          <div
                            className={`test-module-SRS__step ${
                              currentStep >= 1 ? "active" : ""
                            }`}
                          >
                            <div className="test-module-SRS__step-number">
                              1
                            </div>
                            <div className="test-module-SRS__step-title">
                              Basic Info
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div
                            className={`test-module-SRS__step ${
                              currentStep >= 2 ? "active" : ""
                            }`}
                          >
                            <div className="test-module-SRS__step-number">
                              2
                            </div>
                            <div className="test-module-SRS__step-title">
                              Questions
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div
                            className={`test-module-SRS__step ${
                              currentStep >= 3 ? "active" : ""
                            }`}
                          >
                            <div className="test-module-SRS__step-number">
                              3
                            </div>
                            <div className="test-module-SRS__step-title">
                              Preview
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Edit Info Alert */}
                    <div className="alert alert-info test-module-SRS__edit-alert mb-4">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-info-circle me-3 fa-lg"></i>
                        <div>
                          <h6 className="mb-1">
                            You are editing an existing test
                          </h6>
                          <small>
                            Original test:{" "}
                            <strong>{originalData?.title}</strong> | Questions:{" "}
                            <strong>
                              {originalData?.questions?.length || 0}
                            </strong>
                          </small>
                        </div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="test-module-SRS__step-content">
                      {renderStepContent()}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="test-module-SRS__navigation mt-4">
                      <div className="d-flex justify-content-between">
                        <div>
                          {currentStep > 1 && (
                            <button
                              type="button"
                              className="btn test-module-SRS__prev-btn"
                              onClick={handlePrevious}
                              disabled={isUpdating}
                            >
                              <i className="fas fa-arrow-left me-2"></i>
                              Previous
                            </button>
                          )}
                        </div>

                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleCancel}
                            disabled={isUpdating}
                            style={colorbtn}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-warning"
                            onClick={handleResetToOriginal}
                            disabled={isUpdating}
                          >
                            <i className="fas fa-undo me-2"></i>
                            Reset
                          </button>

                          {currentStep < 3 ? (
                            <button
                              type="button"
                              className="btn test-module-SRS__next-btn"
                              onClick={handleNext}
                              disabled={isUpdating}
                            >
                              Next
                              <i className="fas fa-arrow-right ms-2"></i>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn test-module-SRS__update-btn"
                              onClick={handleSave}
                              disabled={isUpdating}
                            >
                              {isUpdating ? (
                                <>
                                  <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  Updating...
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-save me-2"></i>
                                  Update Test
                                </>
                              )}
                            </button>
                          )}
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

export default EditTest;
