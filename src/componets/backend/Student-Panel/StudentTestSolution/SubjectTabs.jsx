/* eslint-disable react/prop-types */
const SubjectTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tsm-tabs">
      {tabs.map(tab => (
        <button
          key={tab}
          className={`tsm-tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SubjectTabs;
