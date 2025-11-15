import { useState, useEffect } from "react";

const ManageTests = () => {
  const [tests, setTests] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    numberOfQuestions: "",
    course: "",
    subject: "",
    level: "",
    description: "",
  });

  // Fetch tests on component mount
  useEffect(() => {
    // Dummy test data for now
    const dummyTests = [
      {
        _id: "1",
        title: "JEE Physics Test",
        date: "2025-11-05",
        time: "10:00",
        duration: 60,
        numberOfQuestions: 30,
        course: "JEE",
        subject: "Physics",
        level: "medium",
      },
      {
        _id: "2",
        title: "Chemistry Foundation",
        date: "2025-11-06",
        time: "14:00",
        duration: 45,
        numberOfQuestions: 25,
        course: "Foundation",
        subject: "Chemistry",
        level: "easy",
      },
    ];
    setTests(dummyTests);
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateTest = e => {
    e.preventDefault();

    // Validation
    if (
      !formData.title ||
      !formData.date ||
      !formData.time ||
      !formData.duration ||
      !formData.numberOfQuestions ||
      !formData.course ||
      !formData.subject ||
      !formData.level
    ) {
      alert("Please fill all required fields");
      return;
    }

    const newTest = {
      _id: Date.now().toString(),
      ...formData,
    };

    setTests([...tests, newTest]);

    // Reset form
    setFormData({
      title: "",
      date: "",
      time: "",
      duration: "",
      numberOfQuestions: "",
      course: "",
      subject: "",
      level: "",
      description: "",
    });

    // Hide form and show table
    setShowCreateForm(false);
  };

  const handleDeleteTest = testId => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      setTests(tests.filter(test => test._id !== testId));
    }
  };

  const handleEditTest = testId => {
    console.log("Edit test:", testId);
  };

  return (
    <div className="manage-test-1admin-panel-container">
      {/* Header Section */}
      <div className="manage-test-1admin-panel-header">
        <div className="manage-test-1admin-panel-title-section">
          <h1 className="manage-test-1admin-panel-title">Test Management</h1>
          <p className="manage-test-1admin-panel-subtitle">
            Create and manage your tests
          </p>
        </div>
        {!showCreateForm && (
          <button
            className="manage-test-1admin-panel-btn-create"
            onClick={() => setShowCreateForm(true)}
          >
            <span className="manage-test-1admin-panel-btn-icon">+</span>
            Create a New Test
          </button>
        )}
      </div>

      {/* Create Test Form - Page View */}
      {showCreateForm ? (
        <div className="manage-test-1admin-panel-create-section">
          <div className="manage-test-1admin-panel-form-container">
            <div className="manage-test-1admin-panel-form-header">
              <h2>Create New Test</h2>
              <button
                className="manage-test-1admin-panel-form-back"
                onClick={() => setShowCreateForm(false)}
              >
                ← Back to Tests
              </button>
            </div>

            <form
              onSubmit={handleCreateTest}
              className="manage-test-1admin-panel-form"
            >
              {/* Row 1: Title & Date */}
              <div className="manage-test-1admin-panel-form-row">
                <div className="manage-test-1admin-panel-form-group">
                  <label htmlFor="title">
                    Test Title{" "}
                    <span className="manage-test-1admin-panel-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter test title"
                  />
                </div>
                <div className="manage-test-1admin-panel-form-group">
                  <label htmlFor="date">
                    Date{" "}
                    <span className="manage-test-1admin-panel-required">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Row 2: Time & Duration */}
              <div className="manage-test-1admin-panel-form-row">
                <div className="manage-test-1admin-panel-form-group">
                  <label htmlFor="time">
                    Time{" "}
                    <span className="manage-test-1admin-panel-required">*</span>
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="manage-test-1admin-panel-form-group">
                  <label htmlFor="duration">
                    Duration (minutes){" "}
                    <span className="manage-test-1admin-panel-required">*</span>
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 60"
                  />
                </div>
              </div>

              {/* Row 3: Questions & Course */}
              <div className="manage-test-1admin-panel-form-row">
                <div className="manage-test-1admin-panel-form-group">
                  <label htmlFor="numberOfQuestions">
                    Number of Questions{" "}
                    <span className="manage-test-1admin-panel-required">*</span>
                  </label>
                  <input
                    type="number"
                    id="numberOfQuestions"
                    name="numberOfQuestions"
                    value={formData.numberOfQuestions}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                  />
                </div>
                <div className="manage-test-1admin-panel-form-group">
                  <label htmlFor="course">
                    Course{" "}
                    <span className="manage-test-1admin-panel-required">*</span>
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Course</option>
                    <option value="JEE">JEE</option>
                    <option value="NEET">NEET</option>
                    <option value="Foundation">Foundation</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Subject & Level */}
              <div className="manage-test-1admin-panel-form-row">
                <div className="manage-test-1admin-panel-form-group">
                  <label htmlFor="subject">
                    Subject{" "}
                    <span className="manage-test-1admin-panel-required">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Science">Science</option>
                  </select>
                </div>
                <div className="manage-test-1admin-panel-form-group">
                  <label htmlFor="level">
                    Level{" "}
                    <span className="manage-test-1admin-panel-required">*</span>
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Level</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Description (Full Width) */}
              <div className="manage-test-1admin-panel-form-group manage-test-1admin-panel-form-group-full">
                <label htmlFor="description">Test Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter test description"
                  rows="4"
                ></textarea>
              </div>

              {/* Form Actions */}
              <div className="manage-test-1admin-panel-form-actions">
                <button
                  type="button"
                  className="manage-test-1admin-panel-btn-cancel"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="manage-test-1admin-panel-btn-submit"
                >
                  Create Test
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // Tests List Table View
        <div className="manage-test-1admin-panel-tests-container">
          {tests && tests.length > 0 ? (
            <div className="manage-test-1admin-panel-table-wrapper">
              <table className="manage-test-1admin-panel-table">
                <thead>
                  <tr className="manage-test-1admin-panel-table-header">
                    <th>S.No.</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Questions</th>
                    <th>Course</th>
                    <th>Subject</th>
                    <th>Level</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test, index) => (
                    <tr
                      key={test._id}
                      className="manage-test-1admin-panel-table-row"
                    >
                      <td>{index + 1}</td>
                      <td className="manage-test-1admin-panel-title-cell">
                        {test.title}
                      </td>
                      <td>{test.date}</td>
                      <td>{test.time}</td>
                      <td>{test.duration} min</td>
                      <td>{test.numberOfQuestions}</td>
                      <td>
                        <span className="manage-test-1admin-panel-badge manage-test-1admin-panel-badge-course">
                          {test.course}
                        </span>
                      </td>
                      <td>
                        <span className="manage-test-1admin-panel-badge manage-test-1admin-panel-badge-subject">
                          {test.subject}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`manage-test-1admin-panel-badge manage-test-1admin-panel-level-${test.level}`}
                        >
                          {test.level}
                        </span>
                      </td>
                      <td className="manage-test-1admin-panel-actions-cell">
                        <button
                          className="manage-test-1admin-panel-btn-edit"
                          type="button"
                          title="Edit"
                          onClick={() => handleEditTest(test._id)}
                        >
                          ✎
                        </button>
                        <button
                          className="manage-test-1admin-panel-btn-delete"
                          type="button"
                          onClick={() => handleDeleteTest(test._id)}
                          title="Delete"
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="manage-test-1admin-panel-empty-state">
              <p>No tests created yet</p>
              <button
                className="manage-test-1admin-panel-btn-create"
                onClick={() => setShowCreateForm(true)}
              >
                Create Your First Test
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageTests;
