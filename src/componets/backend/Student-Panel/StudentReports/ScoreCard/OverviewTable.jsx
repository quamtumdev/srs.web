/* eslint-disable react/prop-types */
const OverviewTable = ({ data }) => {
  return (
    <div className="reports-student-dashboard-srs-overview-section">
      <h3 className="reports-student-dashboard-srs-section-title">Overview</h3>

      <div className="reports-student-dashboard-srs-table-wrapper">
        <table className="reports-student-dashboard-srs-table">
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Maximum Marks</th>
              <th>Mark Scored</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.map((subject, index) => (
              <tr key={index}>
                <td>
                  <strong>{subject.subject}</strong>
                </td>
                <td>{subject.maximumMarks}</td>
                <td
                  className={
                    subject.markScored < 0
                      ? "reports-student-dashboard-srs-negative-value"
                      : ""
                  }
                >
                  {subject.markScored}
                </td>
                <td>{subject.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverviewTable;
