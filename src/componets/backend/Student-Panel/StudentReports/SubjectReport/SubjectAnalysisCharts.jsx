/* eslint-disable react/prop-types */
const SubjectAnalysisCharts = ({ data }) => {
  // Calculate percentages for pie chart
  const calculatePercentages = subject => {
    const total = subject.notAttempted + subject.correct + subject.incorrect;
    return {
      notAttempted: ((subject.notAttempted / total) * 100).toFixed(1),
      correct: ((subject.correct / total) * 100).toFixed(1),
      incorrect: ((subject.incorrect / total) * 100).toFixed(1),
    };
  };

  return (
    <div className="reports-student-dashboard-srs-charts-grid">
      {data.map((subject, index) => {
        const percentages = calculatePercentages(subject);

        return (
          <div key={index} className="reports-student-dashboard-srs-chart-card">
            <h4 className="reports-student-dashboard-srs-chart-title">
              {subject.subject}
            </h4>

            {/* Pie Chart Placeholder */}
            <div className="reports-student-dashboard-srs-pie-chart-container">
              <svg
                viewBox="0 0 200 200"
                className="reports-student-dashboard-srs-pie-svg"
              >
                {/* Blue - Not Attempted */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#4cb3e5"
                  strokeWidth="60"
                  strokeDasharray={`${percentages.notAttempted * 5.03} 502`}
                  transform="rotate(-90 100 100)"
                />
                {/* Green - Correct */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#28a745"
                  strokeWidth="60"
                  strokeDasharray={`${percentages.correct * 5.03} 502`}
                  strokeDashoffset={`-${percentages.notAttempted * 5.03}`}
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
                  strokeDasharray={`${percentages.incorrect * 5.03} 502`}
                  strokeDashoffset={`-${
                    (parseFloat(percentages.notAttempted) +
                      parseFloat(percentages.correct)) *
                    5.03
                  }`}
                  transform="rotate(-90 100 100)"
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="reports-student-dashboard-srs-chart-legend">
              <div className="reports-student-dashboard-srs-legend-item">
                <span className="reports-student-dashboard-srs-legend-dot reports-student-dashboard-srs-dot-blue"></span>
                <span>Not Attempted {subject.notAttempted}</span>
              </div>
              <div className="reports-student-dashboard-srs-legend-item">
                <span className="reports-student-dashboard-srs-legend-dot reports-student-dashboard-srs-dot-green"></span>
                <span>Correct {subject.correct}</span>
              </div>
              <div className="reports-student-dashboard-srs-legend-item">
                <span className="reports-student-dashboard-srs-legend-dot reports-student-dashboard-srs-dot-red"></span>
                <span>Incorrect {subject.incorrect}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="reports-student-dashboard-srs-chart-stats">
              <p>
                Scored Marks: <strong>{subject.scoredMarks}</strong>
              </p>
              <p>
                Percentage: <strong>{subject.percentage}</strong>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubjectAnalysisCharts;
