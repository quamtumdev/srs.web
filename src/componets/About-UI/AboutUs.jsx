import "../../custom.css";
export const AboutUs = () => {
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
                src="/assets/img/about/1.jpg"
                alt="First slide"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="home-three-trending">
        <div className="container mt-5">
          <div className="row">
            <div className="home-three-head section-title-center section-header-titler section-header-title">
              <div className="row align-items-center d-flex justify-content-between sip-adv-title">
                <div className="col-lg-12">
                  <h2 className="text-capitalize">About Us </h2>
                </div>
              </div>
            </div>

            <div className="ux-design-five">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12">
                  <div className="course-box-about-us">
                    <div className="product-five">
                      <div className="career-five-content">
                        <p>
                          SRS Educares, a proud division of SRS Edusolution
                          Private Limited, was established on 10th November 2018
                          by visionary IIT Graduates and Senior Faculties. Their
                          mission? To revolutionize career education with an
                          exceptional blend of top-tier academics, a stable and
                          experienced faculty, and a nurturing learning
                          environment.
                        </p>
                        <p>
                          Our team is dedicated to not only helping students
                          excel academically but also ensuring their overall
                          growth with personalized care and continuous
                          performance evaluation. The highly adaptive Academic &
                          Management Team ensures that students are always one
                          step ahead, regardless of any changes in competitive
                          exam patterns like JEE, NEET, or other entrance exams.
                        </p>
                        <p>
                          At SRS Educares, we take pride in our rich pool of
                          expert faculty from prestigious institutes like IITs,
                          NITs, and other top-tier engineering and medical
                          colleges. Our comprehensive programs cover everything
                          from JEE (Main+Advanced), JEE-Main, NEET-UG, NTSE,
                          KVPY, Olympiads, and Board preparations, catering to
                          students from classNamees VII to XII, as well as XII
                          passed students.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-us-custom-padding-mg aos">
        <div className="container">
          <div className="row">
            <div className="home-three-head section-title-center section-header-titler section-header-title margin-bottom-about-two-divides">
              <div className="row align-items-center d-flex justify-content-between sip-adv-title">
                <div className="col-lg-12">
                  <h2 className="text-capitalize">
                    {" "}
                    Our courses are divided into two divisions
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 d-flex">
              <div className="student-mentor cube-instuctor ">
                <h4>Junior Division</h4>
                <div className="row">
                  <div className="col-lg-7 col-md-12">
                    <div className="top-instructors">
                      <p>
                        Courses available for students ranging from Class VII to
                        Class X.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-12">
                    <div className="mentor-img">
                      <img
                        className="img-fluid"
                        alt="Img"
                        src="assets/img/icon/become-02.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 d-flex">
              <div className="student-mentor yellow-mentor">
                <h4>Yearlong classroom Contact Program (YCCP)</h4>
                <div className="row">
                  <div className="col-lg-8 col-md-12">
                    <div className="top-instructors">
                      <p>
                        Programs for Class XI, XII, and students who have passed
                        XII.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="mentor-img">
                      <img
                        className="img-fluid"
                        alt="Img"
                        src="assets/img/icon/become-01.svg"
                      />
                    </div>
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
