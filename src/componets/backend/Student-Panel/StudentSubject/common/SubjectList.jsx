import { useParams } from "react-router-dom";
import { useSubjects } from "../hooks/useSubjects";
import SubjectCard from "./SubjectCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import "../../../../../assets/backend/dist/css/studentadmin.css";

const SubjectList = () => {
  const { courseId } = useParams();
  const { subjects, loading, error, retryLoading } = useSubjects(courseId);

  return (
    <section className="content">
      <div className="container-fluid">
        <h5 className="pt-4 mb-3">Subjects</h5>

        {loading && <LoadingSpinner message="Loading subjects..." />}

        {error && <ErrorMessage error={error} onRetry={retryLoading} />}

        {!loading && !error && (
          <div className="row">
            {subjects.length === 0 ? (
              <EmptyState
                title="No Subjects Found"
                message="No subjects available for this course."
              />
            ) : (
              subjects.map((subject, index) => (
                <SubjectCard key={index} subject={subject} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubjectList;
