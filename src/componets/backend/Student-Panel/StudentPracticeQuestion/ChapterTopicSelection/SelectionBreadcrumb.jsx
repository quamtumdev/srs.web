/* eslint-disable react/prop-types */
const SelectionBreadcrumb = ({ subject, chapter, onBackToSubjects }) => {
  const containerStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    border: "2px solid rgba(255, 255, 255, 0.25)",
  };
  return (
    <div
      className="student_practice_srs_breadcrumb  mt-3"
      style={containerStyle}
    >
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="student_practice_srs_breadcrumb_list">
              <li className="student_practice_srs_breadcrumb_item">
                <button
                  onClick={onBackToSubjects}
                  className="student_practice_srs_breadcrumb_link"
                >
                  📚 Subjects
                </button>
              </li>
              <li className="student_practice_srs_breadcrumb_item active">
                <span>
                  {subject?.icon} {subject?.name}
                </span>
              </li>
              {chapter && (
                <li className="student_practice_srs_breadcrumb_item active">
                  <span>
                    {chapter.icon} {chapter.name}
                  </span>
                </li>
              )}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SelectionBreadcrumb;
