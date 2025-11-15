/* eslint-disable react/prop-types */
const RankOverview = ({ data }) => {
  return (
    <div className="reports-student-dashboard-srs-stat-card reports-student-dashboard-srs-rank-card">
      <h3 className="reports-student-dashboard-srs-stat-card-title">
        Rank Overview
      </h3>

      <div className="reports-student-dashboard-srs-rank-center">
        <div className="reports-student-dashboard-srs-rank-circle">
          <span className="reports-student-dashboard-srs-rank-number">
            {data.batchRank}
          </span>
          <span className="reports-student-dashboard-srs-rank-label">
            Batch Rank
          </span>
        </div>
      </div>

      <div className="reports-student-dashboard-srs-rank-details">
        <div className="reports-student-dashboard-srs-rank-item">
          <span className="reports-student-dashboard-srs-rank-value">
            {data.testRank}
          </span>
          <span className="reports-student-dashboard-srs-rank-text">
            Test Rank
          </span>
        </div>
        <div className="reports-student-dashboard-srs-rank-item">
          <span className="reports-student-dashboard-srs-rank-value">
            {data.campusRank}
          </span>
          <span className="reports-student-dashboard-srs-rank-text">
            Campus Rank
          </span>
        </div>
      </div>
    </div>
  );
};

export default RankOverview;
