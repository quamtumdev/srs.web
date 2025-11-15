/* eslint-disable react/prop-types */
const QuestionFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: "all", label: "All (90)", count: 90 },
    { id: "correct", label: "Correct (14)", count: 14 },
    { id: "incorrect", label: "Incorrect (8)", count: 8 },
    { id: "skip", label: "Skip (67)", count: 67 },
    { id: "bonus", label: "Bonus (1)", count: 1 },
    { id: "unattempted", label: "Unattempted (8)", count: 8 },
  ];

  return (
    <div className="reports-student-dashboard-srs-filter-buttons">
      {filters.map(filter => (
        <button
          key={filter.id}
          className={`reports-student-dashboard-srs-filter-btn ${
            activeFilter === filter.id
              ? "reports-student-dashboard-srs-filter-active"
              : ""
          }`}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default QuestionFilter;
