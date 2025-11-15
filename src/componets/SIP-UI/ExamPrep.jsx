import "../../custom.css";

const ExamPrep = () => {
  return (
    <section className="topcategory-sec mb-5">
      <div className="container">
        <div className="section-header-title  home-three-head  section-title-center section-header-titler ">
          <h2 className="text-capitalize">
            {" "}
            Your one-stop solution for all competitive exam preparations.
          </h2>
        </div>
        <div className="top-category-group">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex">
              <div className="categories-item flex-fill box-exam-prep">
                <div className="categories-icon">
                  <img
                    src="assets/img/jee-icon.jpg"
                    alt="Angular Development"
                  />
                </div>
                <div className="categories-content">
                  <h3>JEE</h3>
                  <p className="jee-exam-prep">
                    An in-depth preparatory program for JEE Main + Advanced, &
                    other engineering exams
                  </p>
                </div>
                <p className="onward-exam-prep text-blue">
                  <b>Class XI onwards</b>
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex">
              <div className="categories-item flex-fill box-exam-prep">
                <div className="categories-icon">
                  <img
                    src="assets/img/neet-icon.png"
                    alt="Python Development"
                  />
                </div>
                <div className="categories-content">
                  <h3>NEET</h3>
                  <p className="jee-exam-prep">
                    Join our rigorous NEET and medical entrance prep program for
                    assured exam success.
                  </p>
                </div>
                <p className="onward-exam-prep text-blue">
                  <b>Class XI onwards</b>
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex">
              <div className="categories-item flex-fill box-exam-prep">
                <div className="categories-icon">
                  <img
                    src="assets/img/foundation.jpg"
                    alt="Node Js Development"
                  />
                </div>
                <div className="categories-content">
                  <h3>Foundation</h3>
                  <p className="jee-exam-prep">
                    An early preparation program for JEE, NEET, Olympiads, &
                    other competitive exams
                  </p>
                </div>
                <p className="onward-exam-prep text-blue">
                  <b>Class VIII onwards</b>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12 talk-to-expert-btn">
          <div className="more-details text-center">
            <a href="job-category.html" className="discover-btn">
              Talk to Expert<i className="fas fa-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamPrep;
