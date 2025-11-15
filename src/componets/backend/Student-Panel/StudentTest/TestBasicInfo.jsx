/* eslint-disable react/prop-types */

const TestBasicInfo = ({ testData, errors, onChange }) => {
  const subjects = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "English",
    "Hindi",
    "Computer Science",
    "Economics",
    "History",
    "Geography",
    "Political Science",
    "Sociology",
    "Psychology",
    "Business Studies",
    "Accountancy",
  ];

  // Debug: Log testData changes
  const handleChange = (field, value) => {
    console.log(`TestBasicInfo - Field changed: ${field} =`, value);
    onChange(field, value);
  };

  return (
    <div className="test-module-SRS__basic-info">
      <div className="row">
        <div className="col-12 mb-4">
          <h5 className="test-module-SRS__section-title">
            <i className="fas fa-info-circle me-2"></i>
            Test Basic Information
          </h5>
          <p className="text-muted">Fill in the basic details for your test</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 mb-3">
          <label className="form-label test-module-SRS__label">
            Test Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control test-module-SRS__input ${
              errors.title ? "is-invalid" : ""
            }`}
            placeholder="Enter test title (e.g., Physics Chapter 1 Test)"
            value={testData.title}
            onChange={e => handleChange("title", e.target.value)}
            maxLength={100}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
          <div className="form-text">
            <small className="text-muted">
              {testData.title.length}/100 characters
            </small>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label test-module-SRS__label">
            Subject <span className="text-danger">*</span>
          </label>
          <select
            className={`form-select test-module-SRS__select ${
              errors.subject ? "is-invalid" : ""
            }`}
            value={testData.subject}
            onChange={e => handleChange("subject", e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject && (
            <div className="invalid-feedback">{errors.subject}</div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label test-module-SRS__label">
            Total Marks <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className={`form-control test-module-SRS__input ${
              errors.totalMarks ? "is-invalid" : ""
            }`}
            placeholder="Enter total marks"
            value={testData.totalMarks}
            onChange={e =>
              handleChange("totalMarks", parseInt(e.target.value) || "")
            }
            min="1"
            max="1000"
          />
          {errors.totalMarks && (
            <div className="invalid-feedback">{errors.totalMarks}</div>
          )}
          <div className="form-text">
            <small className="text-muted">
              <i className="fas fa-info-circle me-1"></i>
              Total marks for the entire test
            </small>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label test-module-SRS__label">
            Time Limit (minutes) <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className={`form-control test-module-SRS__input ${
              errors.timeLimit ? "is-invalid" : ""
            }`}
            placeholder="Enter time in minutes"
            value={testData.timeLimit}
            onChange={e =>
              handleChange("timeLimit", parseInt(e.target.value) || "")
            }
            min="1"
            max="300"
          />
          {errors.timeLimit && (
            <div className="invalid-feedback">{errors.timeLimit}</div>
          )}
          <div className="form-text">
            <small className="text-muted">
              <i className="fas fa-clock me-1"></i>
              Time allowed: {testData.timeLimit || 0} minutes
              {testData.timeLimit >= 60 &&
                ` (${Math.floor(testData.timeLimit / 60)} hour${
                  Math.floor(testData.timeLimit / 60) > 1 ? "s" : ""
                } ${
                  testData.timeLimit % 60 > 0
                    ? `${testData.timeLimit % 60} min`
                    : ""
                })`}
            </small>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-3">
          <label className="form-label test-module-SRS__label">
            Instructions
          </label>
          <textarea
            className="form-control test-module-SRS__textarea"
            rows="4"
            placeholder="Enter test instructions for students..."
            value={testData.instructions}
            onChange={e => handleChange("instructions", e.target.value)}
            maxLength={500}
          ></textarea>
          <div className="form-text d-flex justify-content-between">
            <span>
              <i className="fas fa-info-circle me-1"></i>
              Provide clear instructions that students should follow during the
              test
            </span>
            <small className="text-muted">
              {testData.instructions.length}/500 characters
            </small>
          </div>
        </div>
      </div>

      <div className="test-module-SRS__info-summary mt-4">
        <div className="alert alert-info">
          <h6 className="mb-3">
            <i className="fas fa-lightbulb me-2"></i>Quick Summary
          </h6>
          <div className="row">
            <div className="col-md-3 col-6 mb-2">
              <strong>Title:</strong>
              <div className="text-truncate" title={testData.title}>
                {testData.title || "Not set"}
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2">
              <strong>Subject:</strong>
              <div>{testData.subject || "Not selected"}</div>
            </div>
            <div className="col-md-3 col-6 mb-2">
              <strong>Marks:</strong>
              <div>{testData.totalMarks || 0}</div>
            </div>
            <div className="col-md-3 col-6 mb-2">
              <strong>Time:</strong>
              <div>{testData.timeLimit || 0} minutes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestBasicInfo;
