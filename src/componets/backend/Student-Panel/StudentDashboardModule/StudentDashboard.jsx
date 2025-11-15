const StudentDashboard = () => {
  return (
    <>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <h5 className="mb-3 pt-3 ">Student Dashboard</h5>
          <div className="row">
            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-navy">
                  <i className="fa fa-book"></i>
                </span>

                <div className="info-box-content">
                  <span className="info-box-text">My Courses</span>
                  <span className="info-box-number">1</span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-navy">
                  <i className="fa fa-book-open"></i>
                </span>

                <div className="info-box-content">
                  <span className="info-box-text">Subjects</span>
                  <span className="info-box-number">110</span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-navy">
                  <i className="fa fa-sticky-note"></i>
                </span>

                <div className="info-box-content">
                  <span className="info-box-text">Notes</span>
                  <span className="info-box-number">3</span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-navy">
                  <i className="fa fa-video"></i>
                </span>

                <div className="info-box-content">
                  <span className="info-box-text">Videos</span>
                  <span className="info-box-number">10</span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-navy">
                  <i className="fa fa-tasks"></i>
                </span>

                <div className="info-box-content">
                  <span className="info-box-text">Test Created</span>
                  <span className="info-box-number">10</span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-navy">
                  <i className="fa fa-file-text"></i>
                </span>

                <div className="info-box-content">
                  <span className="info-box-text">Assignments</span>
                  <span className="info-box-number">20</span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-navy">
                  <i className="fa fa-brain"></i>
                </span>

                <div className="info-box-content">
                  <span className="info-box-text">Practice Questions</span>
                  <span className="info-box-number">100+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentDashboard;
