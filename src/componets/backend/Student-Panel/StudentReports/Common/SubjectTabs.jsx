/* eslint-disable react/prop-types */
const SubjectTabs = ({ subjects, activeSubject, onSubjectChange }) => {
  return (
    <div className="reports-student-dashboard-srs-subject-tabs">
      {subjects.map(subject => (
        <button
          key={subject.id}
          className={`reports-student-dashboard-srs-subject-tab ${
            activeSubject === subject.id
              ? "reports-student-dashboard-srs-subject-active"
              : ""
          }`}
          onClick={() => onSubjectChange(subject.id)}
        >
          {subject.label}
        </button>
      ))}
    </div>
  );
};

export default SubjectTabs;
