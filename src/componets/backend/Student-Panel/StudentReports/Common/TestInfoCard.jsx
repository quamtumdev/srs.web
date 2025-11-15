/* eslint-disable react/prop-types */
const TestInfoCard = ({ testData }) => {
  return (
    <div className="reports-student-dashboard-srs-test-info-card">
      <div className="reports-student-dashboard-srs-test-header">
        <div className="reports-student-dashboard-srs-test-title">
          <h2>
            {testData.name}{" "}
            <span className="reports-student-dashboard-srs-test-code">
              ({testData.code})
            </span>
          </h2>
          <p>{testData.date}</p>
        </div>
        <div className="reports-student-dashboard-srs-test-mode">
          <span>
            Test Mode: <strong>{testData.mode}</strong>
          </span>
        </div>
      </div>

      <div className="reports-student-dashboard-srs-test-stats">
        <div className="reports-student-dashboard-srs-stat-item">
          <span className="reports-student-dashboard-srs-stat-label">
            Total Candidates
          </span>
          <span className="reports-student-dashboard-srs-stat-value">
            {testData.totalCandidates}
          </span>
        </div>
        <div className="reports-student-dashboard-srs-stat-item">
          <span className="reports-student-dashboard-srs-stat-label">
            Total Questions
          </span>
          <span className="reports-student-dashboard-srs-stat-value">
            {testData.totalQuestions}
          </span>
        </div>
        <div className="reports-student-dashboard-srs-stat-item">
          <span className="reports-student-dashboard-srs-stat-label">
            Maximum Marks
          </span>
          <span className="reports-student-dashboard-srs-stat-value">
            {testData.maximumMarks}
          </span>
        </div>
        <div className="reports-student-dashboard-srs-stat-item">
          <span className="reports-student-dashboard-srs-stat-label">
            Total Time
          </span>
          <span className="reports-student-dashboard-srs-stat-value reports-student-dashboard-srs-time-badge">
            {testData.totalTime} (mins)
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestInfoCard;
