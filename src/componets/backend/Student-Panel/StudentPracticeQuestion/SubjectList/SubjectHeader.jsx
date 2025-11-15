/* eslint-disable react/prop-types */
const SubjectHeader = ({ title, subtitle, icon = "📚" }) => {
  return (
    <div className="student_practice_srs_header">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12 text-center">
          <h1 className="student_practice_srs_main_title">
            <span className="student_practice_srs_title_icon">{icon}</span>
            {title}
          </h1>
          <p className="student_practice_srs_subtitle">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default SubjectHeader;
