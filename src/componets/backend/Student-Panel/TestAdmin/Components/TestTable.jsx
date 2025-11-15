/* eslint-disable react/prop-types */
const TestTable = ({ tests }) => {
  const getStatusClass = status => {
    switch (status) {
      case "Start Test":
        return "test-admin-srs-1-status-start";
      case "Resumed":
        return "test-admin-srs-1-status-resumed";
      case "Missed":
      default:
        return "test-admin-srs-1-status-missed";
    }
  };

  return (
    <div className="test-admin-srs-1-table-wrapper">
      <table className="test-admin-srs-1-table">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Test Name</th>
            <th>Start Date</th>
            <th>Test Window</th>
            <th>Duration</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tests.map(test => (
            <tr key={test.sNo}>
              <td>{test.sNo}</td>
              <td>
                <div className="test-admin-srs-1-test-name">
                  <strong>{test.testName}</strong>
                  <span className="test-admin-srs-1-test-code">
                    {test.testCode}
                  </span>
                </div>
              </td>
              <td>{test.startDate}</td>
              <td className="test-admin-srs-1-test-window">
                {test.testWindow}
              </td>
              <td>{test.duration}</td>
              <td>
                <span
                  className={`test-admin-srs-1-status-badge ${getStatusClass(
                    test.status
                  )}`}
                >
                  {test.status}
                </span>
              </td>
              <td>
                <button className="test-admin-srs-1-menu-btn">⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestTable;
