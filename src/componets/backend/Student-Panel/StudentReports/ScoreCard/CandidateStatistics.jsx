/* eslint-disable react/prop-types */
const CandidateStatistics = ({ data }) => {
  return (
    <div className="reports-student-dashboard-srs-stat-card">
      <h3 className="reports-student-dashboard-srs-stat-card-title">
        Candidate Statistics
      </h3>

      <div className="reports-student-dashboard-srs-stat-highlights">
        <div className="reports-student-dashboard-srs-highlight-item">
          <span className="reports-student-dashboard-srs-highlight-value">
            {data.myMarks}
          </span>
          <span className="reports-student-dashboard-srs-highlight-label">
            My Marks
          </span>
        </div>
        <div className="reports-student-dashboard-srs-highlight-item">
          <span className="reports-student-dashboard-srs-highlight-value">
            {data.myPercentage}
          </span>
          <span className="reports-student-dashboard-srs-highlight-label">
            My Percentage
          </span>
        </div>
        <div className="reports-student-dashboard-srs-highlight-item">
          <span className="reports-student-dashboard-srs-highlight-value">
            {data.myPercentile}
          </span>
          <span className="reports-student-dashboard-srs-highlight-label">
            My Percentile
          </span>
        </div>
      </div>

      <div className="reports-student-dashboard-srs-stat-details">
        <div className="reports-student-dashboard-srs-detail-row">
          <span className="reports-student-dashboard-srs-detail-label">
            Right Question Marks
          </span>
          <span className="reports-student-dashboard-srs-detail-value">
            {data.rightQuestionMarks}
          </span>
        </div>
        <div className="reports-student-dashboard-srs-detail-row">
          <span className="reports-student-dashboard-srs-detail-label">
            Negative Question Marks
          </span>
          <span className="reports-student-dashboard-srs-detail-value">
            {data.negativeQuestionMarks}
          </span>
        </div>
        <div className="reports-student-dashboard-srs-detail-row">
          <span className="reports-student-dashboard-srs-detail-label">
            Left Question Marks
          </span>
          <span className="reports-student-dashboard-srs-detail-value">
            {data.leftQuestionMarks}
          </span>
        </div>
      </div>

      <div className="reports-student-dashboard-srs-stat-details">
        <div className="reports-student-dashboard-srs-detail-row">
          <span className="reports-student-dashboard-srs-detail-label">
            Attempted Questions
          </span>
          <span className="reports-student-dashboard-srs-detail-value">
            {data.attemptedQuestions}
          </span>
        </div>
        <div className="reports-student-dashboard-srs-detail-row">
          <span className="reports-student-dashboard-srs-detail-label">
            Time On Question
          </span>
          <span className="reports-student-dashboard-srs-detail-value">
            {data.timeOnQuestion}
          </span>
        </div>
        <div className="reports-student-dashboard-srs-detail-row">
          <span className="reports-student-dashboard-srs-detail-label">
            Avg. Speed (Sec/Ques)
          </span>
          <span className="reports-student-dashboard-srs-detail-value">
            {data.avgSpeedSecQues}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CandidateStatistics;
