/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";

const QuestionForm = ({ question, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    correctAnswers: [],
    allowMultipleAnswers: false,
    marks: 1,
    explanation: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (question) {
      setFormData({
        ...question,
        correctAnswers: question.correctAnswers || [],
        allowMultipleAnswers: question.allowMultipleAnswers || false,
      });
    }
  }, [question]);

  const questionTypes = [
    {
      value: "multiple-choice",
      label: "Multiple Choice",
      icon: "fas fa-list-ul",
    },
    { value: "true-false", label: "True/False", icon: "fas fa-check-double" },
    { value: "short-answer", label: "Short Answer", icon: "fas fa-edit" },
    { value: "essay", label: "Essay", icon: "fas fa-file-alt" },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
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

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({
      ...prev,
      options: newOptions,
    }));

    if (errors.options) {
      setErrors(prev => ({
        ...prev,
        options: "",
      }));
    }
  };

  const addOption = () => {
    if (formData.options.length < 8) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, ""],
      }));
    }
  };

  const removeOption = index => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);

      let newCorrectAnswers = formData.correctAnswers
        .filter(ans => parseInt(ans) !== index)
        .map(ans => {
          const ansIndex = parseInt(ans);
          return ansIndex > index ? (ansIndex - 1).toString() : ans;
        });

      let newCorrectAnswer = "";
      if (formData.correctAnswer === index.toString()) {
        newCorrectAnswer = "";
      } else if (parseInt(formData.correctAnswer) > index) {
        newCorrectAnswer = (parseInt(formData.correctAnswer) - 1).toString();
      } else {
        newCorrectAnswer = formData.correctAnswer;
      }

      setFormData(prev => ({
        ...prev,
        options: newOptions,
        correctAnswer: newCorrectAnswer,
        correctAnswers: newCorrectAnswers,
      }));
    }
  };

  const handleSingleCorrectAnswer = index => {
    setFormData(prev => ({
      ...prev,
      correctAnswer: index.toString(),
      correctAnswers: [index.toString()],
    }));

    if (errors.correctAnswer) {
      setErrors(prev => ({
        ...prev,
        correctAnswer: "",
      }));
    }
  };

  const handleMultipleCorrectAnswers = index => {
    const indexStr = index.toString();
    setFormData(prev => {
      const newCorrectAnswers = prev.correctAnswers.includes(indexStr)
        ? prev.correctAnswers.filter(ans => ans !== indexStr)
        : [...prev.correctAnswers, indexStr];

      return {
        ...prev,
        correctAnswers: newCorrectAnswers,
        correctAnswer: newCorrectAnswers[0] || "",
      };
    });

    if (errors.correctAnswer) {
      setErrors(prev => ({
        ...prev,
        correctAnswer: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.question.trim()) {
      newErrors.question = "Question text is required";
    }

    if (!formData.marks || formData.marks <= 0) {
      newErrors.marks = "Marks must be greater than 0";
    }

    if (formData.type === "multiple-choice") {
      const filledOptions = formData.options.filter(
        opt => opt && opt.trim() !== ""
      );

      if (filledOptions.length < 2) {
        newErrors.options = `Please add at least 2 options. Currently you have ${filledOptions.length} option(s) filled.`;
      }

      if (formData.allowMultipleAnswers) {
        const validCorrectAnswers = formData.correctAnswers.filter(ans => {
          const index = parseInt(ans);
          return (
            formData.options[index] && formData.options[index].trim() !== ""
          );
        });

        if (validCorrectAnswers.length === 0) {
          newErrors.correctAnswer =
            "Please select at least one correct answer from the filled options";
        }
      } else {
        if (
          !formData.correctAnswer ||
          !formData.options[parseInt(formData.correctAnswer)] ||
          formData.options[parseInt(formData.correctAnswer)].trim() === ""
        ) {
          newErrors.correctAnswer =
            "Please select a correct answer from the filled options";
        }
      }
    }

    if (formData.type === "true-false" && !formData.correctAnswer) {
      newErrors.correctAnswer = "Please select the correct answer";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      // Clean up data before saving
      const cleanedOptions = formData.options.filter(
        opt => opt && opt.trim() !== ""
      );

      const cleanedData = {
        ...formData,
        options: cleanedOptions,
        correctAnswers: formData.correctAnswers
          .filter(ans => {
            const index = parseInt(ans);
            return (
              formData.options[index] && formData.options[index].trim() !== ""
            );
          })
          .map(ans => {
            const originalIndex = parseInt(ans);
            let newIndex = 0;
            for (let i = 0; i <= originalIndex; i++) {
              if (formData.options[i] && formData.options[i].trim() !== "") {
                if (i === originalIndex) break;
                newIndex++;
              }
            }
            return newIndex.toString();
          }),
      };

      if (cleanedData.correctAnswers.length > 0) {
        cleanedData.correctAnswer = cleanedData.correctAnswers[0];
      }

      console.log("QuestionForm - Saving question:", cleanedData);

      // Pass cleaned data to parent component
      // Parent component will handle backend API call
      onSave(cleanedData);
    }
  };

  const renderQuestionTypeSpecificFields = () => {
    switch (formData.type) {
      case "multiple-choice":
        return (
          <div className="test-module-SRS__options-section">
            <div className="mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="allowMultipleAnswers"
                  checked={formData.allowMultipleAnswers}
                  onChange={e =>
                    handleChange("allowMultipleAnswers", e.target.checked)
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor="allowMultipleAnswers"
                >
                  <strong>Allow Multiple Correct Answers</strong>
                  <small className="text-muted d-block">
                    Enable this if question has more than one correct answer
                  </small>
                </label>
              </div>
            </div>

            <label className="form-label test-module-SRS__label">
              Answer Options <span className="text-danger">*</span>
              <small className="text-muted d-block">
                {formData.allowMultipleAnswers
                  ? "Check all correct answers (minimum 2 options required)"
                  : "Select one correct answer (minimum 2 options required)"}
              </small>
            </label>

            {formData.options.map((option, index) => (
              <div key={index} className="test-module-SRS__option-row mb-2">
                <div className="input-group">
                  <div className="input-group-text">
                    {formData.allowMultipleAnswers ? (
                      <input
                        type="checkbox"
                        checked={formData.correctAnswers.includes(
                          index.toString()
                        )}
                        onChange={() => handleMultipleCorrectAnswers(index)}
                        disabled={!option || option.trim() === ""}
                      />
                    ) : (
                      <input
                        type="radio"
                        name="correctAnswer"
                        value={index}
                        checked={formData.correctAnswer === index.toString()}
                        onChange={() => handleSingleCorrectAnswer(index)}
                        disabled={!option || option.trim() === ""}
                      />
                    )}
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Option ${String.fromCharCode(
                      65 + index
                    )} (required)`}
                    value={option}
                    onChange={e => handleOptionChange(index, e.target.value)}
                  />
                  {formData.options.length > 2 && (
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => removeOption(index)}
                      title="Remove this option"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
                {formData.correctAnswers.includes(index.toString()) &&
                  option.trim() && (
                    <small className="text-success">
                      <i className="fas fa-check-circle me-1"></i>
                      Correct Answer
                    </small>
                  )}
              </div>
            ))}

            {formData.options.length < 8 && (
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={addOption}
              >
                <i className="fas fa-plus me-2"></i>Add Option
              </button>
            )}

            <div className="mt-2">
              <small className="text-info">
                <i className="fas fa-info-circle me-1"></i>
                Filled options:{" "}
                {
                  formData.options.filter(opt => opt && opt.trim() !== "")
                    .length
                }{" "}
                / {formData.options.length}
              </small>
            </div>

            {formData.allowMultipleAnswers &&
              formData.correctAnswers.length > 0 && (
                <div className="alert alert-success mt-3">
                  <strong>Selected Correct Answers:</strong>
                  <ul className="mb-0 mt-2">
                    {formData.correctAnswers
                      .filter(
                        ansIndex =>
                          formData.options[parseInt(ansIndex)] &&
                          formData.options[parseInt(ansIndex)].trim()
                      )
                      .map(ansIndex => (
                        <li key={ansIndex}>
                          <strong>
                            {String.fromCharCode(65 + parseInt(ansIndex))}.
                          </strong>{" "}
                          {formData.options[parseInt(ansIndex)]}
                        </li>
                      ))}
                  </ul>
                </div>
              )}

            {errors.options && (
              <div className="alert alert-warning mt-2">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {errors.options}
              </div>
            )}
            {errors.correctAnswer && (
              <div className="alert alert-danger mt-2">
                <i className="fas fa-times-circle me-2"></i>
                {errors.correctAnswer}
              </div>
            )}
          </div>
        );

      case "true-false":
        return (
          <div className="test-module-SRS__true-false-section">
            <label className="form-label test-module-SRS__label">
              Correct Answer <span className="text-danger">*</span>
            </label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="correctAnswer"
                  value="true"
                  checked={formData.correctAnswer === "true"}
                  onChange={e => handleChange("correctAnswer", e.target.value)}
                />
                <label className="form-check-label">True</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="correctAnswer"
                  value="false"
                  checked={formData.correctAnswer === "false"}
                  onChange={e => handleChange("correctAnswer", e.target.value)}
                />
                <label className="form-check-label">False</label>
              </div>
            </div>
            {errors.correctAnswer && (
              <div className="text-danger mt-2">{errors.correctAnswer}</div>
            )}
          </div>
        );

      case "short-answer":
      case "essay":
        return (
          <div className="test-module-SRS__answer-section">
            <label className="form-label test-module-SRS__label">
              Sample Answer (Optional)
            </label>
            <textarea
              className="form-control"
              rows={formData.type === "essay" ? 4 : 2}
              placeholder="Enter a sample answer for reference..."
              value={formData.correctAnswer}
              onChange={e => handleChange("correctAnswer", e.target.value)}
            ></textarea>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="test-module-SRS__question-form">
      <div className="card">
        <div className="card-header">
          <h6 className="mb-0">
            <i className="fas fa-edit me-2"></i>
            {question ? "Edit Question" : "Add New Question"}
          </h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8 mb-3">
                <label className="form-label test-module-SRS__label">
                  Question Type <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  value={formData.type}
                  onChange={e => handleChange("type", e.target.value)}
                >
                  {questionTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label test-module-SRS__label">
                  Marks <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.marks ? "is-invalid" : ""}`}
                  value={formData.marks}
                  onChange={e =>
                    handleChange("marks", parseInt(e.target.value) || "")
                  }
                  min="1"
                />
                {errors.marks && (
                  <div className="invalid-feedback">{errors.marks}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label test-module-SRS__label">
                Question Text <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control ${
                  errors.question ? "is-invalid" : ""
                }`}
                rows="3"
                placeholder="Enter your question here..."
                value={formData.question}
                onChange={e => handleChange("question", e.target.value)}
              ></textarea>
              {errors.question && (
                <div className="invalid-feedback">{errors.question}</div>
              )}
            </div>

            {renderQuestionTypeSpecificFields()}

            <div className="mb-3">
              <label className="form-label test-module-SRS__label">
                Explanation (Optional)
              </label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Add explanation that will be shown after the test..."
                value={formData.explanation}
                onChange={e => handleChange("explanation", e.target.value)}
              ></textarea>
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn test-module-SRS__save-question-btn"
              >
                <i className="fas fa-check me-2"></i>
                {question ? "Update Question" : "Add Question"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-cancel-srs-test"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
