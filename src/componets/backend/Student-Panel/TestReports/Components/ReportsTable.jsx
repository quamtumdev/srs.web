const ReportsTable = () => {
  const reportsData = [
    {
      sNo: 1,
      testName: "MINOR TEST - 06",
      testCode: "(EG19834)",
      testDate: "18 Feb-23",
      testMode: "Obj. CBT",
      score: 47,
      rank: 263,
      sA: 329,
      percent: "15.67",
      right: 14,
      wrong: 9,
      left: 67,
    },
    {
      sNo: 2,
      testName: "MINOR TEST - 05",
      testCode: "(EG86681)",
      testDate: "31 Dec-22",
      testMode: "Obj. CBT",
      score: 190,
      rank: 366,
      sA: 406,
      percent: "8.33",
      right: 13,
      wrong: 33,
      left: 44,
    },
    {
      sNo: 3,
      testName: "PYP-JM 24/1/23 MCR",
      testCode: "(BK6810)",
      testDate: "06 Apr-23",
      testMode: "Obj. CPLT/UM",
      score: 44,
      rank: 1342,
      sA: "14.67",
      percent: "----",
      right: 12,
      wrong: 4,
      left: 74,
    },
  ];

  return (
    <div className="test-reports-srs-table-wrapper">
      <table className="test-reports-srs-table">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Test Name</th>
            <th>Test Date</th>
            <th>Test Mode</th>
            <th>Score</th>
            <th>Rank</th>
            <th>S.A.</th>
            <th>% age</th>
            <th colSpan="3" className="test-reports-srs-attempted-header">
              Attempted
              <div className="test-reports-srs-attempted-sub-headers">
                <span>Right</span>
                <span>Wrong</span>
                <span>Left</span>
              </div>
            </th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map(report => (
            <tr key={report.sNo}>
              <td>{report.sNo}</td>
              <td>
                <div className="test-reports-srs-test-name">
                  <strong>{report.testName}</strong>
                  <span className="test-reports-srs-test-code">
                    {report.testCode}
                  </span>
                </div>
              </td>
              <td>{report.testDate}</td>
              <td>
                <span className="test-reports-srs-test-mode-badge">
                  {report.testMode}
                </span>
              </td>
              <td>
                <strong>
                  {typeof report.score === "number"
                    ? report.score.toLocaleString()
                    : report.score}
                </strong>
              </td>
              <td>{report.rank}</td>
              <td>{report.sA}</td>
              <td>{report.percent}</td>
              <td className="test-reports-srs-right-count">{report.right}</td>
              <td className="test-reports-srs-wrong-count">{report.wrong}</td>
              <td className="test-reports-srs-left-count">{report.left}</td>
              <td>
                <button className="test-reports-srs-menu-btn">⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
