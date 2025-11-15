/* eslint-disable react/prop-types */

const AssignmentFilters = ({
  activeFilter,
  setActiveFilter,
  assignmentsData,
}) => {
  const filterOptions = [
    { key: "all", label: "All Assignments", icon: "list" },
    { key: "pending", label: "Pending", icon: "clock" },
    { key: "in-progress", label: "In Progress", icon: "play-circle" },
    { key: "submitted", label: "Submitted", icon: "check-circle" },
    { key: "overdue", label: "Overdue", icon: "exclamation-triangle" },
  ];

  const getCount = status => {
    if (status === "all") return assignmentsData.length;
    return assignmentsData.filter(a => a.status === status).length;
  };

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="assignment-student-srs-filters">
          <div className="d-flex flex-wrap gap-2">
            {filterOptions.map(option => (
              <button
                key={option.key}
                className={`btn assignment-student-srs-filter-btn ${
                  activeFilter === option.key ? "active" : ""
                }`}
                onClick={() => setActiveFilter(option.key)}
              >
                <i className={`fas fa-${option.icon} me-2`}></i>
                {option.label}
                <span className="badge ms-2">{getCount(option.key)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentFilters;
