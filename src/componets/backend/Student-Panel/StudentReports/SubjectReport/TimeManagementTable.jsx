/* eslint-disable react/prop-types */
const TimeManagementTable = ({ data }) => {
  return (
    <div className="reports-student-dashboard-srs-table-wrapper">
      <table className="reports-student-dashboard-srs-table">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Attempted</th>
            <th>Correct Ques.</th>
            <th>Incorrect Ques.</th>
            <th>Percentage</th>
            <th>Score</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={
                row.subjectName === "Total Summary"
                  ? "reports-student-dashboard-srs-summary-row"
                  : ""
              }
            >
              <td>
                <strong>{row.subjectName}</strong>
              </td>
              <td>{row.attempted}</td>
              <td className="reports-student-dashboard-srs-correct-value">
                {row.correctQues}
              </td>
              <td className="reports-student-dashboard-srs-incorrect-value">
                {row.incorrectQues}
              </td>
              <td>{row.percentage}</td>
              <td
                className={
                  row.score < 0
                    ? "reports-student-dashboard-srs-negative-value"
                    : ""
                }
              >
                <strong>{row.score}</strong>
              </td>
              <td className="reports-student-dashboard-srs-time-value">
                {row.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeManagementTable;
