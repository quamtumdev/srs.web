import { useState, useEffect } from "react";

const ManageQuestions = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());

  // Fetch tests on component mount
  useEffect(() => {
    const dummyTests = [
      { _id: "1", title: "JEE Physics Test", course: "JEE", class: "Class 10" },
      {
        _id: "2",
        title: "Chemistry Foundation",
        course: "Foundation",
        class: "Class 10",
      },
      {
        _id: "3",
        title: "NEET Biology Test",
        course: "NEET",
        class: "Class 12",
      },
      {
        _id: "4",
        title: "Mathematics Advanced",
        course: "JEE",
        class: "Class 12",
      },
    ];
    setTests(dummyTests);
  }, []);

  // Fetch questions when test is selected
  useEffect(() => {
    if (selectedTest) {
      const dummyQuestions = [
        {
          _id: "1",
          title: "What is the SI unit of force?",
          type: "MCQ",
          subject: "Physics",
          difficulty: "Easy",
          class: "Class 10",
          testId: "1",
        },
        {
          _id: "2",
          title: "Newton's first law of motion states that...",
          type: "MCQ",
          subject: "Physics",
          difficulty: "Medium",
          class: "Class 10",
          testId: "1",
        },
        {
          _id: "3",
          title: "Define velocity",
          type: "Short Answer",
          subject: "Physics",
          difficulty: "Easy",
          class: "Class 10",
          testId: "1",
        },
        {
          _id: "4",
          title: "What is chemical bonding?",
          type: "MCQ",
          subject: "Chemistry",
          difficulty: "Hard",
          class: "Class 10",
          testId: "2",
        },
        {
          _id: "5",
          title: "Explain photosynthesis process",
          type: "Essay",
          subject: "Biology",
          difficulty: "Medium",
          class: "Class 12",
          testId: "3",
        },
        {
          _id: "6",
          title: "Solve quadratic equation",
          type: "MCQ",
          subject: "Mathematics",
          difficulty: "Hard",
          class: "Class 12",
          testId: "4",
        },
      ];
      setQuestions(dummyQuestions.filter(q => q.testId === selectedTest));
      setSelectedQuestions(new Set());
    } else {
      setQuestions([]);
    }
  }, [selectedTest]);

  const handleCheckboxChange = questionId => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedQuestions(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedQuestions.size === questions.length) {
      setSelectedQuestions(new Set());
    } else {
      setSelectedQuestions(new Set(questions.map(q => q._id)));
    }
  };

  const selectedTest_data = tests.find(t => t._id === selectedTest);

  return (
    <div className="manage-question-admin-1-form-container">
      {/* Header Section */}
      <div className="manage-question-admin-1-form-header">
        <div className="manage-question-admin-1-form-header-content">
          <h1 className="manage-question-admin-1-form-title">
            📚 Manage Questions
          </h1>
          <p className="manage-question-admin-1-form-subtitle">
            View and organize test questions efficiently
          </p>
        </div>
      </div>

      {/* Select Test Section */}
      <div className="manage-question-admin-1-form-test-select-section">
        <div className="manage-question-admin-1-form-select-wrapper">
          <div className="manage-question-admin-1-form-filter-group">
            <label
              htmlFor="testSelect"
              className="manage-question-admin-1-form-label"
            >
              <span className="manage-question-admin-1-form-label-icon">
                🎯
              </span>
              Select Test
            </label>
            <select
              id="testSelect"
              value={selectedTest}
              onChange={e => setSelectedTest(e.target.value)}
              className="manage-question-admin-1-form-select"
            >
              <option value="">-- Choose a Test --</option>
              {tests.map(test => (
                <option key={test._id} value={test._id}>
                  {test.title} ({test.class})
                </option>
              ))}
            </select>
          </div>

          {selectedTest_data && (
            <div className="manage-question-admin-1-form-test-info">
              <div className="manage-question-admin-1-form-badge manage-question-admin-1-form-badge-test">
                <span className="manage-question-admin-1-form-badge-icon">
                  📖
                </span>
                {selectedTest_data.title}
              </div>
              <div className="manage-question-admin-1-form-badge manage-question-admin-1-form-badge-course">
                <span className="manage-question-admin-1-form-badge-icon">
                  🏆
                </span>
                {selectedTest_data.course}
              </div>
              <div className="manage-question-admin-1-form-badge manage-question-admin-1-form-badge-class">
                <span className="manage-question-admin-1-form-badge-icon">
                  👨‍🎓
                </span>
                {selectedTest_data.class}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Questions Table */}
      <div className="manage-question-admin-1-form-questions-container">
        {selectedTest && questions.length > 0 ? (
          <>
            <div className="manage-question-admin-1-form-table-header-info">
              <span className="manage-question-admin-1-form-question-count">
                Total Questions: <strong>{questions.length}</strong>
              </span>
              {selectedQuestions.size > 0 && (
                <span className="manage-question-admin-1-form-selected-count">
                  Selected: <strong>{selectedQuestions.size}</strong>
                </span>
              )}
            </div>
            <div className="manage-question-admin-1-form-table-wrapper">
              <table className="manage-question-admin-1-form-table">
                <thead>
                  <tr className="manage-question-admin-1-form-table-header">
                    <th className="manage-question-admin-1-form-checkbox-col">
                      <input
                        type="checkbox"
                        checked={
                          selectedQuestions.size === questions.length &&
                          questions.length > 0
                        }
                        onChange={handleSelectAll}
                        className="manage-question-admin-1-form-checkbox"
                        title="Select all"
                      />
                    </th>
                    <th>S.No.</th>
                    <th>Question Title</th>
                    <th>Type</th>
                    <th>Subject</th>
                    <th>Level</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question, index) => (
                    <tr
                      key={question._id}
                      className={`manage-question-admin-1-form-table-row ${
                        selectedQuestions.has(question._id) ? "selected" : ""
                      }`}
                    >
                      <td className="manage-question-admin-1-form-checkbox-col">
                        <input
                          type="checkbox"
                          checked={selectedQuestions.has(question._id)}
                          onChange={() => handleCheckboxChange(question._id)}
                          className="manage-question-admin-1-form-checkbox"
                        />
                      </td>
                      <td className="manage-question-admin-1-form-cell-sno">
                        <span className="manage-question-admin-1-form-sno-badge">
                          {index + 1}
                        </span>
                      </td>
                      <td className="manage-question-admin-1-form-title-cell">
                        {question.title}
                      </td>
                      <td>
                        <span
                          className={`manage-question-admin-1-form-badge manage-question-admin-1-form-badge-type manage-question-admin-1-form-badge-type-${question.type
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                        >
                          {question.type}
                        </span>
                      </td>
                      <td>
                        <span className="manage-question-admin-1-form-badge manage-question-admin-1-form-badge-subject">
                          {question.subject}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`manage-question-admin-1-form-badge manage-question-admin-1-form-difficulty-${question.difficulty.toLowerCase()}`}
                        >
                          {question.difficulty}
                        </span>
                      </td>
                      <td>
                        <span className="manage-question-admin-1-form-badge manage-question-admin-1-form-badge-class">
                          {question.class}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : selectedTest ? (
          <div className="manage-question-admin-1-form-empty-state">
            <div className="manage-question-admin-1-form-empty-icon"></div>
            <p>No questions available for this test</p>
          </div>
        ) : (
          <div className="manage-question-admin-1-form-empty-state">
            <div className="manage-question-admin-1-form-empty-icon"></div>
            <p>Please select a test to view questions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageQuestions;
