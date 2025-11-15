/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import SubjectImage from "./SubjectImage";

const SubjectCard = ({ subject }) => {
  return (
    <div className="subject-card text-center">
      <SubjectImage image={subject.image} alt={subject.alt} />

      <h6 className="subject-title">{subject.name}</h6>

      <Link
        to={`/student/assignments/${subject.id}`}
        className="btn btn-outline-primary"
      >
        <i className="fas fa-eye me-1"></i>
        View Details
      </Link>
    </div>
  );
};

export default SubjectCard;
