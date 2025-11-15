/* eslint-disable react/prop-types */
const StudentInfoCard = ({ student }) => {
  return (
    <div className="trr-student-card">
      {/* Photo Section */}
      <div className="trr-student-photo">
        <img src={student.photo} alt={student.name} />
      </div>

      {/* Info Section */}
      <div className="trr-student-info">
        <div className="trr-info-row">
          <label>Name :</label>
          <span>{student.name}</span>
        </div>
        <div className="trr-info-row">
          <label>F.P.:</label>
          <span>{student.father}</span>
        </div>
        <div className="trr-info-row">
          <label>Class :</label>
          <span>{student.class}</span>
        </div>
        <div className="trr-info-row">
          <label>Father Name :</label>
          <span>{student.father}</span>
        </div>
        <div className="trr-info-row">
          <label>Mother Name :</label>
          <span>{student.mother}</span>
        </div>
        <div className="trr-info-row">
          <label>Programme Name :</label>
          <span>{student.programme}</span>
        </div>
        <div className="trr-info-row">
          <label>Target Batch :</label>
          <span>{student.targetBatch}</span>
        </div>
        <div className="trr-info-row">
          <label>S.A. :</label>
          <span>{student.studentAppeared}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;
