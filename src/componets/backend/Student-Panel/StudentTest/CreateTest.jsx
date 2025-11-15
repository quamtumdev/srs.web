import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TestBasicInfo from "./TestBasicInfo";
import QuestionManager from "./QuestionManager";
import TestPreview from "./TestPreview";

const CreateTest = () => {
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
  const navigate = useNavigate();

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
    if (testData.questions.length === 0) {
      alert("Please add at least one question to the test.");
      return;
    }

    try {
      // Here you would normally save to API
      console.log("Saving test:", testData);

      // Show success message
      alert("Test created successfully!");

      // Navigate back to tests list
      navigate("/student/tests");
    } catch (error) {
      console.error("Error saving test:", error);
      alert("Error saving test. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/student/tests");
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

  return (
    <div className="test-module-SRS">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="test-module-SRS__header">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="test-module-SRS__title-section">
                  <h2 className="test-module-SRS__main-title">
                    <i className="fas fa-plus-circle me-3"></i>
                    Create New Test
                  </h2>
                  <p className="test-module-SRS__subtitle">
                    Build your test step by step
                  </p>
                </div>
                <button
                  className="btn test-module-SRS__back-btn"
                  onClick={handleCancel}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Tests
                </button>
              </div>
            </div>

            <div className="test-module-SRS__content">
              <div className="test-module-SRS__create-test">
                <div className="card test-module-SRS__create-card">
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
                            >
                              <i className="fas fa-arrow-left me-2"></i>
                              Previous
                            </button>
                          )}
                        </div>

                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-cancel-srs-test"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>

                          {currentStep < 3 ? (
                            <button
                              type="button"
                              className="btn test-module-SRS__next-btn"
                              onClick={handleNext}
                            >
                              Next
                              <i className="fas fa-arrow-right ms-2"></i>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn test-module-SRS__save-btn"
                              onClick={handleSave}
                            >
                              <i className="fas fa-save me-2"></i>
                              Save Test
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

export default CreateTest;
