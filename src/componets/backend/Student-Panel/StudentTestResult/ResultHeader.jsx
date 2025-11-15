const ResultHeader = () => {
  return (
    <div className="trr-header">
      <div className="trr-header-left">
        {/* <div className="trr-logo">
          <h3>ALLEN DIGITAL</h3>
        </div> */}
      </div>
      <div className="trr-header-center">
        <div className="trr-title-info">
          <h4>Student Performance Report</h4>
          <p>(Academic Session - 2022-2023)</p>
        </div>
      </div>
      <div className="trr-header-right">
        <div className="trr-student-meta">
          <p>SIKAR(RAJASTHAN)</p>
          <p>Student Type: LIVE</p>
          <p className="trr-date">DATE : 01 Aug 2023</p>
        </div>
      </div>
    </div>
  );
};

export default ResultHeader;
