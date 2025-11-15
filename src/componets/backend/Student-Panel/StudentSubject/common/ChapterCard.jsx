/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ChapterCard = ({ chapter, subjectRoute }) => {
  console.log("ChapterCard rendered:", chapter, subjectRoute);

  // Add slash between chapter and number
  const chapterUrl = `/student/${subjectRoute}/chapter/${chapter.chapterNumber}`;
  console.log("Generated URL:", chapterUrl);

  return (
    <div className="col-md-3 mb-4">
      <div className="card card-navy physicssubject-card">
        <div className="card-header">
          <h3 className="card-title">Chapter {chapter.chapterNumber}</h3>
        </div>
        <div className="card-body physicssubject-body">
          <p>{chapter.chapterTitle}</p>
          <Link
            to={chapterUrl} //  Use generated URL
            className="btn btn-primary-subject physciSubjectBtn btn-sm"
            onClick={() => console.log("Clicking link to:", chapterUrl)}
          >
            View Notes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChapterCard;
