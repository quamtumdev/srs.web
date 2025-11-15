/* eslint-disable react/prop-types */
import { useSubjectChapters } from "./hooks/useSubjectChapters";
import ChapterCard from "./common/ChapterCard"; // Same folder में है
import "../../../../assets/backend/dist/css/studentadmin.css";

const SubjectChapters = ({
  subjectName,
  displayName,
  subjectRoute,
  emoji = "",
}) => {
  const { chapters, loading, error } = useSubjectChapters(subjectName);

  console.log(`${subjectName} component rendered`);

  if (loading) {
    return (
      <section className="content">
        <div className="container-fluid">
          <h5 className="mb-3 pt-3">
            {emoji} {displayName} Chapters
          </h5>
          <div className="text-center">
            <div className="spinner-border" role="status"></div>
            <p className="mt-2">Loading chapters...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="content">
        <div className="container-fluid">
          <h5 className="mb-3 pt-3">
            {emoji} {displayName} Chapters
          </h5>
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
            <button
              className="btn btn-outline-danger btn-sm ms-3"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="content">
      <div className="container-fluid">
        <h5 className="mb-3 pt-3">
          {emoji} {displayName} Chapters
        </h5>
        <div className="row">
          {chapters.length === 0 ? (
            <div className="col-12">
              <div className="text-center py-4">
                <i className="fas fa-book fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">No Chapters Found</h5>
                <p className="text-muted">
                  No chapters available for {displayName}.
                </p>
              </div>
            </div>
          ) : (
            chapters.map((chapter, index) => (
              <ChapterCard
                key={chapter.chapterNumber || index}
                chapter={chapter}
                subjectRoute={subjectRoute}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SubjectChapters;
