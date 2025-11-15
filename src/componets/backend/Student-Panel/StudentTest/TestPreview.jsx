/* eslint-disable react/prop-types */

import { useEffect } from "react";

const TestPreview = ({ testData }) => {
  // Debug: Log test data
  useEffect(() => {
    console.log("TestPreview - Test data:", testData);
    console.log("TestPreview - Questions count:", testData.questions.length);
  }, [testData]);

  const totalMarks = testData.questions.reduce(
    (sum, q) => sum + (q.marks || 0),
    0
  );

  const getQuestionTypeLabel = type => {
    const labels = {
      "multiple-choice": "Multiple Choice",
      "true-false": "True/False",
      "short-answer": "Short Answer",
      essay: "Essay",
    };
    return labels[type] || type;
  };

  const questionTypeStats = testData.questions.reduce((stats, question) => {
    stats[question.type] = (stats[question.type] || 0) + 1;
    return stats;
  }, {});

  console.log("TestPreview - Question type stats:", questionTypeStats);
  console.log("TestPreview - Total marks:", totalMarks);

  // Calculate average time per question
  const avgTimePerQuestion =
    testData.questions.length > 0
      ? (testData.timeLimit / testData.questions.length).toFixed(1)
      : 0;

  return (
    <div className="test-module-SRS__test-preview">
      <div className="row">
        <div className="col-12 mb-4">
          <h5 className="test-module-SRS__section-title">
            <i className="fas fa-eye me-2"></i>
            Test Preview
          </h5>
          <p className="text-muted">Review your test before saving</p>
        </div>
      </div>

      {/* Test Overview */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card test-module-SRS__preview-overview">
            <div className="card-header">
              <h6 className="mb-0">
                <i className="fas fa-info-circle me-2"></i>
                Test Overview
              </h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <table className="table table-sm table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Title:</strong>
                        </td>
                        <td>{testData.title || "Not set"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Subject:</strong>
                        </td>
                        <td>{testData.subject || "Not selected"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Total Questions:</strong>
                        </td>
                        <td>{testData.questions.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <table className="table table-sm table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Expected Marks:</strong>
                        </td>
                        <td>{testData.totalMarks || 0}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Actual Marks:</strong>
                        </td>
                        <td>
                          {totalMarks}
                          {totalMarks !== parseInt(testData.totalMarks) && (
                            <span className="badge bg-warning text-dark ms-2">
                              Mismatch
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Time Limit:</strong>
                        </td>
                        <td>{testData.timeLimit} minutes</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Avg. Time/Question:</strong>
                        </td>
                        <td>{avgTimePerQuestion} minutes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {testData.instructions && (
                <div className="mt-3">
                  <strong>
                    <i className="fas fa-clipboard-list me-2"></i>
                    Instructions:
                  </strong>
                  <div className="mt-2 p-3 bg-light rounded">
                    {testData.instructions}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Question Type Statistics */}
      {testData.questions.length > 0 && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card test-module-SRS__preview-stats">
              <div className="card-header">
                <h6 className="mb-0">
                  <i className="fas fa-chart-pie me-2"></i>
                  Question Distribution
                </h6>
              </div>
              <div className="card-body">
                <div className="row">
                  {Object.entries(questionTypeStats).map(([type, count]) => (
                    <div key={type} className="col-md-3 col-6 mb-3">
                      <div className="test-module-SRS__stat-box text-center p-3 border rounded">
                        <div className="test-module-SRS__stat-number h3 mb-2 text-primary">
                          {count}
                        </div>
                        <div className="test-module-SRS__stat-label small text-muted">
                          {getQuestionTypeLabel(type)}
                        </div>
                        <div className="small text-success">
                          {((count / testData.questions.length) * 100).toFixed(
                            1
                          )}
                          %
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Questions Preview */}
      <div className="row">
        <div className="col-12">
          <div className="card test-module-SRS__preview-questions">
            <div className="card-header">
              <h6 className="mb-0">
                <i className="fas fa-list me-2"></i>
                Questions Preview ({testData.questions.length})
              </h6>
            </div>
            <div className="card-body">
              {testData.questions.length === 0 ? (
                <div className="text-center text-muted py-5">
                  <i className="fas fa-exclamation-triangle fa-3x mb-3 text-warning"></i>
                  <h5>No Questions Added</h5>
                  <p>
                    Please go back to Step 2 and add questions to your test.
                  </p>
                </div>
              ) : (
                <div className="test-module-SRS__questions-preview-list">
                  {testData.questions.map((question, index) => (
                    <div
                      key={question.id || index}
                      className="test-module-SRS__preview-question mb-4 pb-4 border-bottom"
                    >
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h6 className="test-module-SRS__preview-question-number mb-0">
                          <span className="badge bg-secondary me-2">
                            Q{index + 1}
                          </span>
                          {question.question}
                        </h6>
                        <div className="d-flex gap-2 flex-shrink-0 ms-3">
                          <span className="badge bg-primary">
                            {getQuestionTypeLabel(question.type)}
                          </span>
                          <span className="badge bg-success">
                            {question.marks} marks
                          </span>
                        </div>
                      </div>

                      {question.type === "multiple-choice" &&
                        question.options && (
                          <div className="test-module-SRS__preview-options ms-4">
                            {question.options.map((option, optIndex) =>
                              option && option.trim() ? (
                                <div
                                  key={optIndex}
                                  className={`test-module-SRS__preview-option p-2 mb-2 rounded ${
                                    (question.correctAnswers &&
                                      question.correctAnswers.includes(
                                        optIndex.toString()
                                      )) ||
                                    question.correctAnswer ===
                                      optIndex.toString()
                                      ? "bg-success bg-opacity-10 border border-success"
                                      : "bg-light"
                                  }`}
                                >
                                  <span className="badge bg-secondary me-2">
                                    {String.fromCharCode(65 + optIndex)}
                                  </span>
                                  {option}
                                  {((question.correctAnswers &&
                                    question.correctAnswers.includes(
                                      optIndex.toString()
                                    )) ||
                                    question.correctAnswer ===
                                      optIndex.toString()) && (
                                    <i className="fas fa-check-circle text-success ms-2"></i>
                                  )}
                                </div>
                              ) : null
                            )}
                            {/* Multiple answers indicator */}
                            {question.allowMultipleAnswers &&
                              question.correctAnswers &&
                              question.correctAnswers.length > 1 && (
                                <div className="alert alert-info mt-2 py-2">
                                  <small>
                                    <i className="fas fa-info-circle me-1"></i>
                                    <strong>
                                      Multiple correct answers:
                                    </strong>{" "}
                                    {question.correctAnswers.length} options
                                  </small>
                                </div>
                              )}
                          </div>
                        )}

                      {question.type === "true-false" && (
                        <div className="test-module-SRS__preview-true-false ms-4">
                          <span className="badge bg-info">
                            Correct Answer:{" "}
                            {question.correctAnswer === "true"
                              ? "True"
                              : "False"}
                          </span>
                        </div>
                      )}

                      {(question.type === "short-answer" ||
                        question.type === "essay") &&
                        question.correctAnswer && (
                          <div className="test-module-SRS__preview-sample-answer ms-4">
                            <div className="alert alert-secondary">
                              <small>
                                <strong>
                                  <i className="fas fa-lightbulb me-1"></i>
                                  Sample Answer:
                                </strong>
                              </small>
                              <div className="mt-2">
                                {question.correctAnswer}
                              </div>
                            </div>
                          </div>
                        )}

                      {question.explanation && (
                        <div className="test-module-SRS__preview-explanation ms-4 mt-3">
                          <div className="alert alert-warning py-2">
                            <small>
                              <i className="fas fa-info-circle me-1"></i>
                              <strong>Explanation:</strong>{" "}
                              {question.explanation}
                            </small>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Final Validation Alert */}
      <div className="row mt-4">
        <div className="col-12">
          {testData.questions.length === 0 ? (
            <div className="alert alert-danger">
              <i className="fas fa-exclamation-circle me-2"></i>
              <strong>Cannot Save:</strong> Your test does not have any
              questions. Please go back to Step 2 and add at least one question.
            </div>
          ) : totalMarks !== parseInt(testData.totalMarks) ? (
            <div className="alert alert-warning">
              <i className="fas fa-exclamation-triangle me-2"></i>
              <strong>Marks Mismatch:</strong> The sum of question marks (
              {totalMarks}) does not match the total marks you specified (
              {testData.totalMarks}). Please verify this is intentional before
              saving.
            </div>
          ) : (
            <div className="alert alert-success">
              <i className="fas fa-check-circle me-2"></i>
              <strong>Ready to Save:</strong> Your test is properly configured
              with {testData.questions.length} questions totaling {totalMarks}{" "}
              marks. Click Save Test to proceed!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPreview;
