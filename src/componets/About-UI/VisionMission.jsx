import "../../custom.css";

import { IoCheckmarkDoneCircle } from "react-icons/io5";
export const VisionMission = () => {
  return (
    <>
      <section>
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100 img-fluid vision-mission-slider-img"
                src="/assets/img/about/3.jpg"
                alt="First slide"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="accelerate-cloud-three mt-5 pt-5">
        <div className="container">
          <div className="award-one">
            <div className="home-three-head section-title-center section-header-titler section-header-title margin-bottom-about-two-divides">
              <div className="row align-items-center d-flex justify-content-between sip-adv-title our-vision-custom-pd  ">
                <div className="col-lg-12">
                  <h2 className="text-capitalize"> Our Vision And Mission</h2>
                </div>
              </div>
            </div>

            <div className="row align-items-center mt-2">
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <div className="award-three-images-one">
                  <img
                    className="img-fluid"
                    src="assets/img/about/vision.png"
                    alt="image-banner"
                    title="image-banner"
                  />
                </div>
              </div>
              <div className="col-xl-8 col-lg-6 col-md-6 col-12">
                <div className="award-three-content-one">
                  <div className="award-list-info">
                    <div className="award-list-content">
                      <h2>Our Vision</h2>
                      <p className="text-justify">
                        At SRS Educares, we build strong academic foundations,
                        inspire excellence, and ignite passion in students
                        aspiring to become doctors and engineers through expert
                        guidance and versatile courses.
                      </p>
                    </div>
                  </div>
                  <div className="award-list d-flex align-items-center">
                    <span className="award-icon">
                      <IoCheckmarkDoneCircle className="iconCheckDone" />
                    </span>
                    <p>Focus on conceptual clarity and practice.</p>
                  </div>
                  <div className="award-list d-flex align-items-center">
                    <span className="award-icon">
                      <IoCheckmarkDoneCircle className="iconCheckDone" />
                    </span>
                    <p>Learn from dedicated, experienced faculty.</p>
                  </div>
                  <div className="award-list mb-0 d-flex align-items-center">
                    <span className="award-icon">
                      <IoCheckmarkDoneCircle className="iconCheckDone" />
                    </span>
                    <p>Foster a love for knowledge and excellence.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="learn-anything mb-2">
              <div className="row align-items-center">
                <div className="col-xl-8 col-lg-6 col-md-6 col-12">
                  <div className="award-three-content-two">
                    <div className="award-list-info">
                      <div className="award-list-content">
                        <h2>Our Mission</h2>
                        <p className="text-justify">
                          At SRS Educares, we provide different courses to suit
                          all students, created by skilled teachers. Our
                          exam-focused materials help students prepare well for
                          medical and engineering entrance exams.
                        </p>
                      </div>
                    </div>
                    <div className="award-list d-flex align-items-center">
                      <span className="award-icon">
                        <IoCheckmarkDoneCircle className="iconCheckDone" />
                      </span>
                      <p>Different options for every student &apos; needs.</p>
                    </div>
                    <div className="award-list d-flex align-items-center">
                      <span className="award-icon">
                        <IoCheckmarkDoneCircle className="iconCheckDone" />
                      </span>
                      <p>Courses designed by experienced educators.</p>
                    </div>
                    <div className="award-list d-flex align-items-center">
                      <span className="award-icon">
                        <IoCheckmarkDoneCircle className="iconCheckDone" />
                      </span>
                      <p>Helps students prepare effectively for tests.</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                  <div className="award-three-images-two">
                    <img
                      className="img-fluid our-mission"
                      src="assets/img/about/mission.png"
                      alt="image-banner"
                      title="image-banner"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
