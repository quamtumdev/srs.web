/* eslint-disable react/prop-types */
const TestTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "myTest", label: "MY TEST" },
    { id: "improve", label: "IMPROVE" },
    { id: "change", label: "CHANGE" },
  ];

  return (
    <div className="test-admin-srs-1-tabs-container">
      <div className="test-admin-srs-1-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`test-admin-srs-1-tab ${
              activeTab === tab.id ? "test-admin-srs-1-tab-active" : ""
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button className="test-admin-srs-1-filter-btn">
        <span className="test-admin-srs-1-filter-icon">⚙️</span>
        Filter
      </button>
    </div>
  );
};

export default TestTabs;
