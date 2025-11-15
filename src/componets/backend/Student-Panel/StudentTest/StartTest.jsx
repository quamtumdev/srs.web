/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/tests";

const StartTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getStudentId = () => {
      const studentData = localStorage.getItem("studentData");
      if (studentData) {
        try {
          const parsed = JSON.parse(studentData);
          if (parsed.id) {
            setStudentId(parsed.id);
            return;
          }
        } catch (error) {
          console.error("Error parsing studentData:", error);
        }
      }
    };
    getStudentId();
  }, []);

  useEffect(() => {
    if (studentId && id) {
      loadTest();
    }
  }, [studentId, id]);

  useEffect(() => {
    let timer;
    if (isTestStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestStarted, timeRemaining]);

  // ✅ loadTest function me ye add karo
  const loadTest = async () => {
    if (!studentId) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/student/${studentId}/tests/${id}`
      );

      if (response.data.success) {
        const testData = response.data.test;

        // ✅ Check if already submitted
        if (testData.isSubmitted || testData.status === "submitted") {
          alert("⚠️ You have already submitted this test!");
          navigate(`/student/tests/${id}/result`);
          return;
        }

        setTest(testData);
        setTimeRemaining(testData.timeLimit * 60);
      }
    } catch (error) {
      console.error("Error loading test:", error);

      // ✅ Handle already submitted error
      if (
        error.response?.status === 400 &&
        error.response?.data?.message?.includes("already submitted")
      ) {
        alert("You have already submitted this test!");
        navigate(`/student/tests/${id}/result`);
        return;
      }

      alert("Error loading test");
      navigate("/student/tests");
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = () => {
    setIsTestStarted(true);
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionJump = index => {
    setCurrentQuestionIndex(index);
  };

  const handleAutoSubmit = () => {
    alert("Time's up! Submitting test automatically.");
    handleSubmitTest();
  };

  const handleSubmitTest = async () => {
    if (!studentId || !id) {
      alert("Invalid student or test ID");
      return;
    }

    if (Object.keys(answers).length === 0) {
      alert("Please answer at least one question!");
      return;
    }

    if (!window.confirm("Are you sure you want to submit the test?")) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedAnswers = Object.entries(answers).map(
        ([index, answer]) => ({
          questionId: test.questions[index]._id,
          answer: answer,
          questionIndex: parseInt(index),
        })
      );

      const submitData = {
        answers: formattedAnswers,
        timeTaken: test.timeLimit * 60 - timeRemaining,
      };

      console.log("Submitting test...");

      const response = await axios.post(
        `${API_BASE_URL}/student/${studentId}/tests/${id}/submit`,
        submitData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);

      if (response.data.success) {
        localStorage.setItem(
          `test_result_${id}`,
          JSON.stringify(response.data.result)
        );
        alert("Test submitted successfully!");
        navigate(`/student/tests/${id}/result`);
      }
    } catch (error) {
      console.error("Submission Error:", error.response?.data);

      // ✅ Handle already submitted error
      if (error.response?.status === 400) {
        const errorMsg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Bad Request";

        if (errorMsg.includes("already submitted")) {
          alert("This test has already been submitted!");
          navigate(`/student/tests/${id}/result`);
          return;
        }

        alert(`${errorMsg}`);
      } else {
        alert("Failed to submit test. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  if (loading) {
    return (
      <div className="srs-educares-test-starts">
        <div className="container-fluid">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div
              className="spinner-border srs-educares-test-starts__spinner"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="srs-educares-test-starts">
        <div className="container-fluid">
          <div className="alert alert-danger">Test not found</div>
        </div>
      </div>
    );
  }

  if (!isTestStarted) {
    return (
      <div className="srs-educares-test-starts">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="srs-educares-test-starts__header">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="srs-educares-test-starts__title-section">
                    <h2 className="srs-educares-test-starts__main-title">
                      <i className="fas fa-clipboard-check me-3"></i>
                      {test.title}
                    </h2>
                    <p className="srs-educares-test-starts__subtitle">
                      Ready to start the test?
                    </p>
                  </div>
                  <button
                    className="btn srs-educares-test-starts__back-btn"
                    onClick={() => navigate(`/student/tests/${id}`)}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back
                  </button>
                </div>
              </div>

              <div className="srs-educares-test-starts__content">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="card srs-educares-test-starts__start-card">
                      <div className="card-header srs-educares-test-starts__start-header text-center">
                        <h5 className="mb-0 text-white">
                          <i className="fas fa-info-circle me-2"></i>
                          Test Instructions
                        </h5>
                      </div>
                      <div className="card-body p-4">
                        <div className="srs-educares-test-starts__test-info mb-4">
                          <div className="row g-3">
                            <div className="col-md-6">
                              <div className="d-flex align-items-center p-3 bg-light rounded">
                                <i className="fas fa-book text-primary fs-3 me-3"></i>
                                <div>
                                  <small className="d-block">Subject</small>
                                  <strong className="fs-6">
                                    {test.subject}
                                  </strong>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="d-flex align-items-center p-3 bg-light rounded">
                                <i className="fas fa-question-circle text-success fs-3 me-3"></i>
                                <div>
                                  <small className="text-muted d-block">
                                    Total Questions
                                  </small>
                                  <strong className="fs-5">
                                    {test.questions?.length || 0}
                                  </strong>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="d-flex align-items-center p-3 bg-light rounded">
                                <i className="fas fa-star text-warning fs-3 me-3"></i>
                                <div>
                                  <small className="text-muted d-block">
                                    Total Marks
                                  </small>
                                  <strong className="fs-5">
                                    {test.totalMarks}
                                  </strong>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="d-flex align-items-center p-3 bg-light rounded">
                                <i className="fas fa-clock text-danger fs-3 me-3"></i>
                                <div>
                                  <small className="text-muted d-block">
                                    Time Limit
                                  </small>
                                  <strong className="fs-5">
                                    {test.timeLimit} minutes
                                  </strong>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {test.instructions && (
                          <div className="alert alert-info mb-4  test-instrustion-starts">
                            <h6 className="alert-heading">
                              <i className="fas fa-info-circle me-2"></i>
                              Instructions
                            </h6>
                            <p className="mb-0 text-dark">
                              {test.instructions}
                            </p>
                          </div>
                        )}

                        <div className="alert alert-warning test-instrustion-starts">
                          <h6 className="alert-heading">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            Important Points
                          </h6>
                          <ul className="mb-0">
                            <li>Once started, the timer cannot be paused</li>
                            <li>Test will auto-submit when time expires</li>
                            <li>You can navigate between questions freely</li>
                            <li>
                              Make sure to review all answers before submitting
                            </li>
                            <li>
                              Internet connection required throughout the test
                            </li>
                          </ul>
                        </div>

                        <div className="text-center mt-4">
                          <button
                            className="btn btn-success btn-lg px-4 py-3"
                            onClick={handleStartTest}
                          >
                            <i className="fas fa-play me-2"></i>
                            Start Test Now
                          </button>
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
  }

  const currentQuestion = test.questions[currentQuestionIndex];

  return (
    <div className="srs-educares-test-starts">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* Timer and Progress Header */}
            <div className="srs-educares-test-starts__test-header sticky-top bg-white shadow-sm py-3 mb-4">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <h6 className="mb-0 pl-2">
                    <i className="fas fa-clipboard-check me-2 text-primary"></i>
                    {test.title}
                  </h6>
                </div>
                <div className="col-md-4 text-center">
                  <div
                    className={`srs-educares-test-starts__timer ${
                      timeRemaining < 300 ? "text-danger" : "text-success"
                    }`}
                  >
                    <i className="fas fa-clock me-2"></i>
                    <strong className="fs-5">
                      {formatTime(timeRemaining)}
                    </strong>
                  </div>
                </div>
                <div className="col-md-4 text-end">
                  <span className="badge bg-info fs-7 px-3 py-2 mr-2">
                    Question {currentQuestionIndex + 1} of{" "}
                    {test.questions.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Question Navigation Sidebar */}
              <div className="col-lg-3 mb-4">
                <div
                  className="card srs-educares-test-starts__nav-card sticky-top"
                  style={{ top: "100px" }}
                >
                  <div className="card-header">
                    <h6 className="mb-0 text-white">
                      <i className="fas fa-list me-2"></i>
                      Questions
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="srs-educares-test-starts__question-grid">
                      {test.questions.map((_, index) => (
                        <button
                          key={index}
                          className={`btn btn-sm ${
                            index === currentQuestionIndex
                              ? "btn-primary"
                              : answers[index]
                              ? "btn-success"
                              : "btn-outline-secondary"
                          }`}
                          onClick={() => handleQuestionJump(index)}
                          style={{ margin: "3px", width: "45px" }}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3">
                      <small className="d-block text-muted mb-2">
                        <i className="fas fa-check-circle text-success me-1"></i>
                        Answered: {getAnsweredCount()} / {test.questions.length}
                      </small>
                      <small className="d-block text-muted">
                        <i className="fas fa-circle text-secondary me-1"></i>
                        Not Answered:{" "}
                        {test.questions.length - getAnsweredCount()}
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Question Area */}
              <div className="col-lg-9">
                <div className="card srs-educares-test-starts__question-card">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 text-white">
                        Question {currentQuestionIndex + 1}
                      </h5>
                      <span className="badge bg-warning text-light">
                        {currentQuestion.marks} marks
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h6 className="srs-educares-test-starts__question-text mb-4">
                      {currentQuestion.question}
                    </h6>

                    {/* Multiple Choice */}
                    {currentQuestion.type === "multiple-choice" && (
                      <div className="srs-educares-test-starts__options">
                        {currentQuestion.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className="form-check mb-3 p-3 border rounded"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`question-${currentQuestionIndex}`}
                              id={`option-${optIndex}`}
                              checked={
                                answers[currentQuestionIndex] ===
                                optIndex.toString()
                              }
                              onChange={() =>
                                handleAnswerChange(
                                  currentQuestionIndex,
                                  optIndex.toString()
                                )
                              }
                            />
                            <label
                              className="form-check-label ms-2"
                              htmlFor={`option-${optIndex}`}
                            >
                              <strong>
                                {String.fromCharCode(65 + optIndex)}.
                              </strong>{" "}
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* True/False */}
                    {currentQuestion.type === "true-false" && (
                      <div className="srs-educares-test-starts__options">
                        {["true", "false"].map(option => (
                          <div
                            key={option}
                            className="form-check mb-3 p-3 border rounded"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`question-${currentQuestionIndex}`}
                              id={`option-${option}`}
                              checked={answers[currentQuestionIndex] === option}
                              onChange={() =>
                                handleAnswerChange(currentQuestionIndex, option)
                              }
                            />
                            <label
                              className="form-check-label ms-2"
                              htmlFor={`option-${option}`}
                            >
                              <strong>
                                {option === "true" ? "True" : "False"}
                              </strong>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Short Answer / Essay */}
                    {(currentQuestion.type === "short-answer" ||
                      currentQuestion.type === "essay") && (
                      <div className="srs-educares-test-starts__text-answer">
                        <textarea
                          className="form-control"
                          rows={currentQuestion.type === "essay" ? 8 : 4}
                          placeholder="Type your answer here..."
                          value={answers[currentQuestionIndex] || ""}
                          onChange={e =>
                            handleAnswerChange(
                              currentQuestionIndex,
                              e.target.value
                            )
                          }
                        ></textarea>
                      </div>
                    )}
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-secondary"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                      >
                        <i className="fas fa-arrow-left me-2"></i>
                        Previous
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={handleSubmitTest}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane me-2"></i>
                            Submit Test
                          </>
                        )}
                      </button>

                      <button
                        className="btn btn-primary"
                        onClick={handleNextQuestion}
                        disabled={
                          currentQuestionIndex === test.questions.length - 1
                        }
                      >
                        Next
                        <i className="fas fa-arrow-right ms-2"></i>
                      </button>
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

export default StartTest;
