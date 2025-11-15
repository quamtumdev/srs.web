/* eslint-disable react/prop-types */
const TestResultTable = ({ data, type }) => {
  if (type === "main") {
    return (
      <div className="trr-table-wrapper">
        <table className="trr-table">
          <thead>
            <tr className="trr-table-header">
              <th>Test Name</th>
              <th>S.R.</th>
              <th>Batch</th>
              <th>S.A.</th>
              <th>T-Mark</th>
              <th>PDF</th>
              <th>CHEM</th>
              <th>MATHS</th>
              <th>NCERT</th>
              <th>Total Marks</th>
              <th>Rank</th>
              <th>Rank</th>
              <th>Sub</th>
            </tr>
          </thead>
          <tbody>
            {data.tests.map((test, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "trr-row-even" : "trr-row-odd"}
              >
                <td className="trr-test-name">{test.testName}</td>
                <td>{test.rank}</td>
                <td>{test.batch}</td>
                <td>-</td>
                <td>{test.tMark}</td>
                <td className="trr-absent">{test.pdf}</td>
                <td>{test.chemistry}</td>
                <td>{test.maths}</td>
                <td>{test.ncert}</td>
                <td>{test.total}</td>
                <td>{test.marks || "-"}</td>
                <td>{test.rank2 || "-"}</td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === "subjective") {
    if (data.noRecordFound) {
      return (
        <div className="trr-no-record">
          <p>No record found</p>
        </div>
      );
    }

    return (
      <div className="trr-table-wrapper">
        <table className="trr-table">
          <thead>
            <tr className="trr-table-header">
              <th>Test Name</th>
              <th>Batch</th>
              <th>S.A.</th>
              <th>ENGLISH</th>
              <th>PHYSICS</th>
              <th>CHEM</th>
              <th>MATHS</th>
              <th>NCERT</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.tests.map((test, index) => (
              <tr key={index}>
                <td>{test.testName}</td>
                <td>{test.batch}</td>
                <td>{test.tMark}</td>
                <td>{test.physics}</td>
                <td>{test.chem}</td>
                <td>{test.maths}</td>
                <td>{test.ncert}</td>
                <td>{test.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default TestResultTable;
