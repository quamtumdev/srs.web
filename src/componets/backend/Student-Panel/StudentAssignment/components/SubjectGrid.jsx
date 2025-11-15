/* eslint-disable react/prop-types */
import SubjectCard from "./SubjectCard";

const SubjectGrid = ({ subjects }) => {
  return (
    <div className="row">
      {subjects.map(subject => (
        <div key={subject.id} className="col-md-3 col-sm-6 col-12">
          <SubjectCard subject={subject} />
        </div>
      ))}
    </div>
  );
};

export default SubjectGrid;
