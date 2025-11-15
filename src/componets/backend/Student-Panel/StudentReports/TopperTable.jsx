/* eslint-disable react/prop-types */
const TopperTable = ({ toppers }) => {
  return (
    <div className="reports-student-dashboard-srs-topper-section">
      <div className="reports-student-dashboard-srs-table-wrapper">
        <table className="reports-student-dashboard-srs-table">
          <thead>
            <tr>
              <th>Topper Name</th>
              <th>Rank</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Test Model</th>
              <th>Time</th>
              <th>Total Ques.</th>
              <th>Right Ques.</th>
              <th>Wrong Ques.</th>
              <th>Left Ques.</th>
            </tr>
          </thead>
          <tbody>
            {toppers.map((topper, index) => (
              <tr
                key={index}
                className={
                  topper.rank === 263
                    ? "reports-student-dashboard-srs-current-student"
                    : ""
                }
              >
                <td>
                  <div className="reports-student-dashboard-srs-topper-info">
                    <img
                      src={`https://via.placeholder.com/40?text=${topper.topperName.charAt(
                        0
                      )}`}
                      alt={topper.topperName}
                      className="reports-student-dashboard-srs-topper-avatar"
                    />
                    <span>{topper.topperName}</span>
                  </div>
                </td>
                <td>
                  <span className="reports-student-dashboard-srs-rank-badge">
                    {topper.rank}
                  </span>
                </td>
                <td>
                  <strong>{topper.score}</strong>
                </td>
                <td>{topper.percentage}</td>
                <td>
                  <span className="reports-student-dashboard-srs-badge reports-student-dashboard-srs-badge-info">
                    {topper.testModel}
                  </span>
                </td>
                <td className="reports-student-dashboard-srs-time-text">
                  {topper.time}
                </td>
                <td>{topper.totalQuestions}</td>
                <td className="reports-student-dashboard-srs-right-text">
                  {topper.rightQuestions}
                </td>
                <td className="reports-student-dashboard-srs-wrong-text">
                  {topper.wrongQuestions}
                </td>
                <td>{topper.leftQuestions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopperTable;
