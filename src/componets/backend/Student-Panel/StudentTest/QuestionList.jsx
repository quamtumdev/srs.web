/* eslint-disable react/prop-types */

const QuestionList = ({ questions, onEdit, onDelete, onMove }) => {
  const getQuestionTypeIcon = type => {
    const icons = {
      "multiple-choice": "fas fa-list-ul",
      "true-false": "fas fa-check-double",
      "short-answer": "fas fa-edit",
      essay: "fas fa-file-alt",
    };
    return icons[type] || "fas fa-question";
  };

  const getQuestionTypeLabel = type => {
    const labels = {
      "multiple-choice": "Multiple Choice",
      "true-false": "True/False",
      "short-answer": "Short Answer",
      essay: "Essay",
    };
    return labels[type] || type;
  };

  // Debug: Log questions when component renders
  console.log("QuestionList - Rendering questions:", {
    count: questions.length,
    questions: questions,
  });

  // Handle empty state
  if (!questions || questions.length === 0) {
    return (
      <div className="test-module-SRS__question-list">
        <div className="alert alert-info text-center">
          <i className="fas fa-info-circle me-2"></i>
          No questions added yet.
        </div>
      </div>
    );
  }

  return (
    <div className="test-module-SRS__question-list">
      <div className="row">
        {questions.map((question, index) => {
          // Debug: Log individual question
          console.log(`QuestionList - Question ${index + 1}:`, question);

          return (
            <div key={question.id || index} className="col-12 mb-3">
              <div className="card test-module-SRS__question-card">
                <div className="card-header test-module-SRS__question-card-header">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-center flex-wrap">
                      <span className="test-module-SRS__question-number me-3">
                        Q{index + 1}
                      </span>
                      <div className="test-module-SRS__question-type-badge me-3">
                        <i
                          className={`${getQuestionTypeIcon(
                            question.type
                          )} me-2`}
                        ></i>
                        {getQuestionTypeLabel(question.type)}
                        {question.allowMultipleAnswers && (
                          <span className="badge bg-info ms-2">
                            <i className="fas fa-check-double me-1"></i>
                            Multi-Answer
                          </span>
                        )}
                      </div>
                      <span className="test-module-SRS__question-marks">
                        <i className="fas fa-star me-1"></i>
                        {question.marks} marks
                      </span>
                    </div>
                    <div className="test-module-SRS__question-actions">
                      <div className="btn-group">
                        {index > 0 && (
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {
                              console.log(
                                `QuestionList - Moving question ${index} up`
                              );
                              onMove(index, index - 1);
                            }}
                            title="Move Up"
                          >
                            <i className="fas fa-arrow-up"></i>
                          </button>
                        )}
                        {index < questions.length - 1 && (
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {
                              console.log(
                                `QuestionList - Moving question ${index} down`
                              );
                              onMove(index, index + 1);
                            }}
                            title="Move Down"
                          >
                            <i className="fas fa-arrow-down"></i>
                          </button>
                        )}
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            console.log(
                              "QuestionList - Editing question:",
                              question
                            );
                            onEdit(question);
                          }}
                          title="Edit Question"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            console.log(
                              "QuestionList - Deleting question ID:",
                              question.id
                            );
                            if (
                              window.confirm(
                                `Are you sure you want to delete Question ${
                                  index + 1
                                }?`
                              )
                            ) {
                              onDelete(question.id);
                            }
                          }}
                          title="Delete Question"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body test-module-SRS__question-card-body">
                  <div className="test-module-SRS__question-text mb-3">
                    {question.question}
                  </div>

                  {question.type === "multiple-choice" && question.options && (
                    <div className="test-module-SRS__question-options">
                      {question.options.map((option, optIndex) => {
                        // Check if this option is correct
                        const isCorrect =
                          (question.correctAnswers &&
                            Array.isArray(question.correctAnswers) &&
                            question.correctAnswers.includes(
                              optIndex.toString()
                            )) ||
                          question.correctAnswer === optIndex.toString();

                        return option && option.trim() ? (
                          <div
                            key={optIndex}
                            className={`test-module-SRS__option-item ${
                              isCorrect ? "correct" : ""
                            }`}
                          >
                            <span className="test-module-SRS__option-label">
                              {String.fromCharCode(65 + optIndex)}.
                            </span>
                            {option}
                            {isCorrect && (
                              <i className="fas fa-check-circle text-success ms-2"></i>
                            )}
                          </div>
                        ) : null;
                      })}

                      {/* Multiple correct answers summary */}
                      {question.allowMultipleAnswers &&
                        question.correctAnswers &&
                        Array.isArray(question.correctAnswers) &&
                        question.correctAnswers.length > 1 && (
                          <div className="alert alert-success mt-3">
                            <small>
                              <strong>
                                <i className="fas fa-info-circle me-2"></i>
                                Multiple Correct Answers:
                              </strong>
                              {question.correctAnswers.map((ansIndex, i) => (
                                <span key={ansIndex}>
                                  {i > 0 && ", "}
                                  <strong>
                                    {String.fromCharCode(
                                      65 + parseInt(ansIndex)
                                    )}
                                  </strong>
                                </span>
                              ))}
                            </small>
                          </div>
                        )}
                    </div>
                  )}

                  {question.type === "true-false" && (
                    <div className="test-module-SRS__true-false-answer">
                      <span className="badge bg-success">
                        Correct Answer:{" "}
                        {question.correctAnswer === "true" ? "True" : "False"}
                      </span>
                    </div>
                  )}

                  {(question.type === "short-answer" ||
                    question.type === "essay") &&
                    question.correctAnswer && (
                      <div className="test-module-SRS__sample-answer">
                        <small className="text-muted">Sample Answer:</small>
                        <div className="mt-1">{question.correctAnswer}</div>
                      </div>
                    )}

                  {question.explanation && (
                    <div className="test-module-SRS__question-explanation mt-3">
                      <small className="text-muted">
                        <i className="fas fa-info-circle me-1"></i>Explanation:
                      </small>
                      <div className="mt-1">{question.explanation}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionList;
