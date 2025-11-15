/* eslint-disable react/prop-types */
const TopicTable = ({ topicData, summaryData }) => {
  return (
    <div className="reports-student-dashboard-srs-table-wrapper">
      <table className="reports-student-dashboard-srs-table">
        <thead>
          <tr>
            <th>S No.</th>
            <th>Topics</th>
            <th>Sub Topics</th>
            <th>Total Question</th>
            <th>Topic Max Marks</th>
            <th>Correct/Incorrect Question</th>
            <th>Right/Negative Marks</th>
            <th>Question/Left Unanswer</th>
            <th>Marks Scored</th>
            <th>Highest Marks</th>
            <th>Toppers Timing</th>
            <th>Avg. Marks</th>
          </tr>
        </thead>
        <tbody>
          {topicData.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                <strong>{row.topic}</strong>
              </td>
              <td>{row.subTopic}</td>
              <td>{row.totalQuestion}</td>
              <td>{row.topicMaxMarks}</td>
              <td>
                <span className="reports-student-dashboard-srs-fraction-text">
                  {row.correctIncorrect}
                </span>
              </td>
              <td>
                <span className="reports-student-dashboard-srs-fraction-text">
                  {row.rightNegativeMarks}
                </span>
              </td>
              <td>{row.questionLeft}</td>
              <td>
                <strong>{row.marksScored}</strong>
              </td>
              <td>{row.highestMarks}</td>
              <td>{row.toppersTiming}</td>
              <td>{row.avgMarks}</td>
            </tr>
          ))}

          {/* Total Row */}
          <tr className="reports-student-dashboard-srs-total-row">
            <td colSpan="2">
              <strong>Rotation</strong>
            </td>
            <td>Calculation of...</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>

          {/* TOTAL Summary Row */}
          <tr className="reports-student-dashboard-srs-summary-row">
            <td colSpan="2">
              <strong>TOTAL</strong>
            </td>
            <td>-</td>
            <td>
              <strong>{summaryData.totalQuestions}</strong>
            </td>
            <td>
              <strong>{summaryData.totalMarks}</strong>
            </td>
            <td>
              <strong>{summaryData.correctIncorrect}</strong>
            </td>
            <td>
              <strong>{summaryData.rightNegative}</strong>
            </td>
            <td>
              <strong>{summaryData.questionLeft}</strong>
            </td>
            <td>
              <strong className="reports-student-dashboard-srs-negative-value">
                {summaryData.marksScored}
              </strong>
            </td>
            <td>
              <strong>{summaryData.highestMarks}</strong>
            </td>
            <td>-</td>
            <td>
              <strong>{summaryData.avgMarks}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TopicTable;
