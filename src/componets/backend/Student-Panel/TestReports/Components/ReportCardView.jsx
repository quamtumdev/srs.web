const ReportCardView = () => {
  const objectiveTests = [
    {
      testName: "SCORE FULL TEST",
      date: "03 Apr-23 (EE80017)",
      phy: 3840,
      rank: 12 / 24,
      sa: 323,
      tMarks: "ABSENT",
      chem: "",
      maths: "",
      total: "",
      image: "",
      scale: "",
      rank2: "",
      asa: "",
    },
    {
      testName: "SCORE FULL TEST",
      date: "31 Mar-23 (ST80003)",
      phy: 3840,
      rank: 12 / 24,
      sa: 519,
      tMarks: "ABSENT",
      chem: "",
      maths: "",
      total: "",
      image: "",
      scale: "",
      rank2: "",
      asa: "",
    },
  ];

//   const subjectiveTests = [
//     {
//       testName: "Test Name",
//       batch: "",
//       sa: "",
//       totalMarks: "",
//       image: "",
//       scale: "",
//       rank: "",
//       asa: "",
//     },
//   ];

  const handleDownload = () => {
    console.log("Download report card");
  };

  return (
    <div className="admin-test-reports-srs-report-card-container">
      {/* Student Info Header */}
      <div className="admin-test-reports-srs-student-info-header">
        <div className="admin-test-reports-srs-student-details">
          <p>
            <strong>2 of 2</strong> - Test Pattern
          </p>
          <p>
            <strong>48</strong> - Student Appeared
          </p>
        </div>
        <button
          className="admin-test-reports-srs-download-btn"
          onClick={handleDownload}
        >
          {" "}
          Download
        </button>
      </div>

      {/* Objective Test Table */}
      <div className="admin-test-reports-srs-report-section">
        <div className="admin-test-reports-srs-section-header admin-test-reports-srs-header-blue">
          OBJECTIVE TEST
        </div>
        <div className="admin-test-reports-srs-table-wrapper">
          <table className="admin-test-reports-srs-report-table">
            <thead>
              <tr>
                <th rowSpan="2">Test Name</th>
                <th rowSpan="2">Phy</th>
                <th rowSpan="2">Rank</th>
                <th rowSpan="2">S.A.</th>
                <th rowSpan="2">T.Marks</th>
                <th rowSpan="2">Chem</th>
                <th rowSpan="2">Maths</th>
                <th rowSpan="2">Total Marks</th>
                <th rowSpan="2">Image</th>
                <th rowSpan="2">Scale</th>
                <th rowSpan="2">Rank</th>
                <th rowSpan="2">ASA</th>
              </tr>
            </thead>
            <tbody>
              {objectiveTests.map((test, index) => (
                <tr key={index}>
                  <td>
                    <strong>{test.testName}</strong>
                    <br />
                    <span className="admin-test-reports-srs-test-date">
                      {test.date}
                    </span>
                  </td>
                  <td>{test.phy}</td>
                  <td>{test.rank}</td>
                  <td>{test.sa}</td>
                  <td>
                    <span className="admin-test-reports-srs-absent-badge">
                      ABSENT
                    </span>
                  </td>
                  <td>{test.chem || "-"}</td>
                  <td>{test.maths || "-"}</td>
                  <td>{test.total || "-"}</td>
                  <td>{test.image || "-"}</td>
                  <td>{test.scale || "-"}</td>
                  <td>{test.rank2 || "-"}</td>
                  <td>
                    <span className="admin-test-reports-srs-asa-badge">
                      ASA
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subjective Test Table */}
      <div className="admin-test-reports-srs-report-section">
        <div className="admin-test-reports-srs-section-header admin-test-reports-srs-header-yellow">
          SUBJECTIVE TEST
        </div>
        <div className="admin-test-reports-srs-table-wrapper">
          <table className="admin-test-reports-srs-report-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Batch</th>
                <th>S.A.</th>
                <th>Total Marks</th>
                <th>Image</th>
                <th>Scale</th>
                <th>Rank</th>
                <th>ASA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8" className="admin-test-reports-srs-no-record">
                  No record found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportCardView;
