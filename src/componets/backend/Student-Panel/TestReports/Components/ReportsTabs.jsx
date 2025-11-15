/* eslint-disable react/prop-types */
const ReportsTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "testReports", label: "TEST REPORTS" },
    { id: "topicAnalysis", label: "TOPIC ANALYSIS" },
    { id: "reportCard", label: "REPORT CARD" },
  ];

  return (
    <div className="test-reports-srs-tabs-container">
      <div className="test-reports-srs-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`test-reports-srs-tab ${
              activeTab === tab.id ? "test-reports-srs-tab-active" : ""
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportsTabs;
