/* eslint-disable react/prop-types */
const QuestionStatistics = ({ data }) => {
  return (
    <div className="reports-student-dashboard-srs-stat-card">
      <h3 className="reports-student-dashboard-srs-stat-card-title">
        Question Statistics
      </h3>

      <div className="reports-student-dashboard-srs-pie-chart">
        <svg
          viewBox="0 0 200 200"
          className="reports-student-dashboard-srs-pie-svg"
        >
          {/* Blue - Correct */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#4cb3e5"
            strokeWidth="60"
            strokeDasharray="351 628"
            transform="rotate(-90 100 100)"
          />
          {/* Green - Left */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#28a745"
            strokeWidth="60"
            strokeDasharray="264 628"
            strokeDashoffset="-351"
            transform="rotate(-90 100 100)"
          />
          {/* Red - Incorrect */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#dc3545"
            strokeWidth="60"
            strokeDasharray="56 628"
            strokeDashoffset="-615"
            transform="rotate(-90 100 100)"
          />
          <text
            x="100"
            y="95"
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            fill="#1c1b1b"
          >
            {data.accuracy}
          </text>
          <text
            x="100"
            y="112"
            textAnchor="middle"
            fontSize="12"
            fill="#6c757d"
          >
            Accuracy
          </text>
        </svg>
      </div>

      <div className="reports-student-dashboard-srs-legend">
        <div className="reports-student-dashboard-srs-legend-item">
          <span className="reports-student-dashboard-srs-legend-dot reports-student-dashboard-srs-dot-blue"></span>
          <span>Correct Questions: {data.correctQuestions}</span>
        </div>
        <div className="reports-student-dashboard-srs-legend-item">
          <span className="reports-student-dashboard-srs-legend-dot reports-student-dashboard-srs-dot-green"></span>
          <span>Left Questions: {data.leftQuestions}</span>
        </div>
        <div className="reports-student-dashboard-srs-legend-item">
          <span className="reports-student-dashboard-srs-legend-dot reports-student-dashboard-srs-dot-red"></span>
          <span>Incorrect Questions: {data.incorrectQuestions}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionStatistics;
