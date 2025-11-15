/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const QuestionManager = ({ questions, onChange }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Debug: Log when questions change
  useEffect(() => {
    console.log("QuestionManager - Questions updated:", {
      count: questions.length,
      questions: questions,
    });
  }, [questions]);

  const handleAddQuestion = questionData => {
    console.log("QuestionManager - Adding new question:", questionData);

    const newQuestion = {
      id: Date.now(), // Temporary ID for frontend
      ...questionData,
    };

    const updatedQuestions = [...questions, newQuestion];
    console.log("QuestionManager - Updated questions list:", updatedQuestions);

    onChange(updatedQuestions);
    setShowAddForm(false);
  };

  const handleEditQuestion = (questionId, questionData) => {
    console.log("QuestionManager - Editing question:", {
      questionId,
      questionData,
    });

    const updatedQuestions = questions.map(q =>
      q.id === questionId ? { ...q, ...questionData } : q
    );

    console.log("QuestionManager - After edit:", updatedQuestions);

    onChange(updatedQuestions);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = questionId => {
    console.log("QuestionManager - Deleting question ID:", questionId);

    const updatedQuestions = questions.filter(q => q.id !== questionId);

    console.log("QuestionManager - After delete:", {
      remaining: updatedQuestions.length,
      questions: updatedQuestions,
    });

    onChange(updatedQuestions);
  };

  const handleMoveQuestion = (fromIndex, toIndex) => {
    console.log("QuestionManager - Moving question:", {
      from: fromIndex,
      to: toIndex,
    });

    const updatedQuestions = [...questions];
    const [movedQuestion] = updatedQuestions.splice(fromIndex, 1);
    updatedQuestions.splice(toIndex, 0, movedQuestion);

    console.log("QuestionManager - After move:", updatedQuestions);

    onChange(updatedQuestions);
  };

  const handleCancelForm = () => {
    console.log("QuestionManager - Cancelling form");
    setShowAddForm(false);
    setEditingQuestion(null);
  };

  const handleStartEdit = question => {
    console.log("QuestionManager - Starting edit:", question);
    setEditingQuestion(question);
    setShowAddForm(false);
  };

  return (
    <div className="test-module-SRS__question-manager">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="mb-2 mb-md-0">
              <h5 className="test-module-SRS__section-title">
                <i className="fas fa-question-circle me-2"></i>
                Test Questions ({questions.length})
              </h5>
              <p className="text-muted mb-0">
                Add and manage questions for your test
              </p>
            </div>
            <button
              type="button"
              className="btn test-module-SRS__add-question-btn"
              onClick={() => {
                console.log("QuestionManager - Opening add question form");
                setShowAddForm(true);
                setEditingQuestion(null);
              }}
              disabled={showAddForm || editingQuestion}
            >
              <i className="fas fa-plus me-2"></i>
              Add Question
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Question Form */}
      {(showAddForm || editingQuestion) && (
        <div className="mb-4">
          <QuestionForm
            question={editingQuestion}
            onSave={
              editingQuestion
                ? data => handleEditQuestion(editingQuestion.id, data)
                : handleAddQuestion
            }
            onCancel={handleCancelForm}
          />
        </div>
      )}

      {/* Question List */}
      {questions.length > 0 ? (
        <QuestionList
          questions={questions}
          onEdit={handleStartEdit}
          onDelete={handleDeleteQuestion}
          onMove={handleMoveQuestion}
        />
      ) : (
        <div className="test-module-SRS__no-questions">
          <div className="text-center py-5">
            <i className="fas fa-question-circle test-module-SRS__empty-icon mb-3"></i>
            <h5>No Questions Added Yet</h5>
            <p className="text-muted mb-3">
              Click Add Question button to start building your test
            </p>
            <button
              type="button"
              className="btn test-module-SRS__add-question-btn"
              onClick={() => {
                console.log(
                  "QuestionManager - Opening add question form (empty state)"
                );
                setShowAddForm(true);
              }}
            >
              <i className="fas fa-plus me-2"></i>
              Add Your First Question
            </button>
          </div>
        </div>
      )}

      {/* Question Summary */}
      {questions.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="alert alert-info">
              <div className="d-flex align-items-center">
                <i className="fas fa-info-circle me-3 fa-lg"></i>
                <div className="flex-grow-1">
                  <strong>Test Summary:</strong>
                  <div className="mt-1">
                    <small>
                      Total Questions: <strong>{questions.length}</strong> |
                      Total Marks:{" "}
                      <strong>
                        {questions.reduce((sum, q) => sum + (q.marks || 0), 0)}
                      </strong>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionManager;
