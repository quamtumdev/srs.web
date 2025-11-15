/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const SubjectCard = ({ subject }) => {
  // Helper function to get correct route for subject
  const getSubjectRoute = subjectName => {
    // Convert subject name to correct route
    const routeMapping = {
      Physics: "physics",
      Chemistry: "chemistry",
      Mathematics: "maths",
      Maths: "maths",
    };

    return `/student/${routeMapping[subjectName] || subjectName.toLowerCase()}`;
  };

  return (
    <div className="col-md-3 col-sm-6 col-12">
      <div className="subject-card text-center">
        <div className="subject-image-container">
          <img
            src={subject.subjectImage}
            alt={subject.subjectName}
            className="subject-image"
          />
        </div>
        <h6 className="subject-title">{subject.subjectName}</h6>
        <Link
          to={getSubjectRoute(subject.subjectName)}
          className="btn btn-outline-primary"
        >
          <i className="fas fa-eye me-1"></i>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default SubjectCard;
