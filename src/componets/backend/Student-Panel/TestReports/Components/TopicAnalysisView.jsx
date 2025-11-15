const TopicAnalysisView = () => {
  const subjectData = [
    {
      subject: "PHYSICS",
      incorrect: 33,
      correct: 35,
      left: 58,
      totalQuestions: 60,
      correctQuestions: 35,
      incorrectQuestions: 17,
      leftQuestions: 28,
      maxMarks: 240,
      marksScored: 9,
    },
    {
      subject: "CHEMISTRY",
      incorrect: 48,
      correct: 31,
      left: 35,
      totalQuestions: 60,
      correctQuestions: 17,
      incorrectQuestions: 28,
      leftQuestions: 15,
      maxMarks: 240,
      marksScored: 44,
    },
    {
      subject: "MATHS",
      incorrect: 88,
      correct: 7,
      left: 36,
      totalQuestions: 30,
      correctQuestions: 1,
      incorrectQuestions: 0,
      leftQuestions: 29,
      maxMarks: 240,
      marksScored: 4,
    },
  ];

  const getBarHeight = value => {
    const maxValue = 100;
    return (value / maxValue) * 100;
  };

  return (
    <div className="admin-test-reports-srs-topic-analysis-container">
      {/* Bar Charts */}
      <div className="admin-test-reports-srs-charts-section">
        {subjectData.map((subject, index) => (
          <div key={index} className="admin-test-reports-srs-chart-box">
            <h4 className="admin-test-reports-srs-chart-subject-title">
              {subject.subject}
            </h4>

            <div className="admin-test-reports-srs-bar-chart">
              {/* Incorrect Bar (Red) */}
              <div className="admin-test-reports-srs-bar-wrapper">
                <div
                  className="admin-test-reports-srs-bar admin-test-reports-srs-bar-incorrect"
                  style={{ height: `${getBarHeight(subject.incorrect)}%` }}
                >
                  <span className="admin-test-reports-srs-bar-value">
                    {subject.incorrect}%
                  </span>
                </div>
              </div>

              {/* Correct Bar (Green) */}
              <div className="admin-test-reports-srs-bar-wrapper">
                <div
                  className="admin-test-reports-srs-bar admin-test-reports-srs-bar-correct"
                  style={{ height: `${getBarHeight(subject.correct)}%` }}
                >
                  <span className="admin-test-reports-srs-bar-value">
                    {subject.correct}%
                  </span>
                </div>
              </div>

              {/* Left Bar (Gray) */}
              <div className="admin-test-reports-srs-bar-wrapper">
                <div
                  className="admin-test-reports-srs-bar admin-test-reports-srs-bar-left"
                  style={{ height: `${getBarHeight(subject.left)}%` }}
                >
                  <span className="admin-test-reports-srs-bar-value">
                    {subject.left}%
                  </span>
                </div>
              </div>
            </div>

            <div className="admin-test-reports-srs-chart-label">
              {subject.subject}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="admin-test-reports-srs-legend">
        <div className="admin-test-reports-srs-legend-item">
          <span className="admin-test-reports-srs-legend-box admin-test-reports-srs-legend-incorrect"></span>
          <span>Incorrect</span>
        </div>
        <div className="admin-test-reports-srs-legend-item">
          <span className="admin-test-reports-srs-legend-box admin-test-reports-srs-legend-correct"></span>
          <span>Correct</span>
        </div>
        <div className="admin-test-reports-srs-legend-item">
          <span className="admin-test-reports-srs-legend-box admin-test-reports-srs-legend-left"></span>
          <span>Left</span>
        </div>
      </div>

      {/* Summary Table */}
      <div className="admin-test-reports-srs-summary-table-wrapper">
        <table className="admin-test-reports-srs-summary-table">
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Total Question</th>
              <th>Correct Question</th>
              <th>Incorrect Question</th>
              <th>Left Question</th>
              <th>Max Marks</th>
              <th>Marks Scored</th>
            </tr>
          </thead>
          <tbody>
            {subjectData.map((subject, index) => (
              <tr key={index}>
                <td>
                  <strong>{subject.subject}</strong>
                </td>
                <td>{subject.totalQuestions}</td>
                <td className="admin-test-reports-srs-correct-cell">
                  {subject.correctQuestions}
                </td>
                <td className="admin-test-reports-srs-incorrect-cell">
                  {subject.incorrectQuestions}
                </td>
                <td className="admin-test-reports-srs-left-cell">
                  {subject.leftQuestions}
                </td>
                <td>{subject.maxMarks}</td>
                <td>
                  <strong>{subject.marksScored}</strong>
                </td>
              </tr>
            ))}
            <tr className="admin-test-reports-srs-summary-row">
              <td>
                <strong>Summary</strong>
              </td>
              <td>
                <strong>180</strong>
              </td>
              <td className="admin-test-reports-srs-correct-cell">
                <strong>27</strong>
              </td>
              <td className="admin-test-reports-srs-incorrect-cell">
                <strong>42</strong>
              </td>
              <td className="admin-test-reports-srs-left-cell">
                <strong>111</strong>
              </td>
              <td>
                <strong>720</strong>
              </td>
              <td>
                <strong>66</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopicAnalysisView;
