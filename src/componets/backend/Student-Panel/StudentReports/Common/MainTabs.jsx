/* eslint-disable react/prop-types */
const MainTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "scoreCard", label: "SCORE CARD" },
    { id: "subjectReport", label: "SUBJECT REPORT" },
    { id: "topicReport", label: "TOPIC REPORT" },
    { id: "solutionReport", label: "SOLUTION REPORT" },
    { id: "questionReport", label: "QUESTION REPORT" },
    { id: "compareYourself", label: "COMPARE YOUR SELF" },
  ];

  return (
    <div className="reports-student-dashboard-srs-main-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`reports-student-dashboard-srs-main-tab ${
            activeTab === tab.id
              ? "reports-student-dashboard-srs-main-tab-active"
              : ""
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default MainTabs;
