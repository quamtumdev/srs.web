import { Link } from "react-router-dom";
import { MdOutlineDoubleArrow } from "react-icons/md";
import "../../custom.css";
export const FeaturedCourses = () => {
  return (
    <>
      <section className="home-three-courses">
        <div className="container">
          <div className="favourite-course-sec courses-show-section">
            <div className="row">
              <div className="home-three-head section-header-title">
                <div className="row align-items-center d-flex justify-content-between">
                  <div className="col-lg-8 col-sm-8">
                    <h2>Study with SRS Educares Best Faculty!</h2>
                  </div>
                  <div className="col-lg-2 col-sm-4">
                    <div className="see-all">
                      <Link to="#">
                        See all
                        <span className="see-all-icon">
                          <i className="fas fa-arrow-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="all-corses-main">
                <div className="tab-content">
                  <div
                    className="nav tablist-three tablist-feature-custom"
                    role="tablist"
                  >
                    <Link
                      className="nav-tab tab-course-custom active me-3"
                      data-bs-toggle="tab"
                      to="#alltab"
                      role="tab"
                    >
                      JEE
                    </Link>
                    <Link
                      className="nav-tab tab-course-custom me-3"
                      data-bs-toggle="tab"
                      to="#mostpopulartab"
                      role="tab"
                    >
                      NEET
                    </Link>
                    <Link
                      className="nav-tab tab-course-custom me-3"
                      data-bs-toggle="tab"
                      to="#businesstab"
                      role="tab"
                    >
                      Foundation
                    </Link>
                  </div>
                  <div className="tab-content">
                    <div
                      className="tab-pane fade active show"
                      id="alltab"
                      role="tabpanel"
                    >
                      <div className="all-course">
                        <div className="row">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                            <div className="course-box-three">
                              <div className="course-three-item">
                                <div className="course-three-img">
                                  <Link to="/jeeclass11">
                                    <img
                                      className="img-fluid"
                                      alt="Img"
                                      src="/assets/img/dashboard-student/1.jpg"
                                    />
                                  </Link>
                                </div>
                                <div className="course-three-content">
                                  <div className="course-group-three"></div>
                                  <div className="course-three-text">
                                    <Link to="/jeeclass11">
                                      <h3 className="title instructor-text">
                                        JEE Nurture Batch
                                      </h3>
                                    </Link>
                                  </div>
                                  <div className="student-counts-info d-flex student-counts-sections">
                                    <div className="students-three-counts">
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Class 11th Students
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Batch Ongoing - 3 Jul 2024
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Target Year - 2026
                                      </p>
                                    </div>
                                  </div>
                                  <div className="price-three-group d-flex align-items-center justify-content-between justify-content-between">
                                    <div className="price-three-view d-flex align-items-center">
                                      <div className="course-price-three">
                                        <div className="transform-button-three">
                                          <Link
                                            to="/jeeclass11"
                                            className="btn btn-action btn-explore w-100 "
                                          >
                                            Explore More
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                            <div className="course-box-three">
                              <div className="course-three-item">
                                <div className="course-three-img">
                                  <Link to="/jeeclass12">
                                    <img
                                      className="img-fluid"
                                      alt="Img"
                                      src="/assets/img/dashboard-student/2.jpg"
                                    />
                                  </Link>
                                </div>
                                <div className="course-three-content">
                                  <div className="course-group-three"></div>
                                  <div className="course-three-text">
                                    <Link to="/jeeclass12">
                                      <h3 className="title instructor-text">
                                        JEE Enthuse Batch
                                      </h3>
                                    </Link>
                                  </div>
                                  <div className="student-counts-info d-flex student-counts-sections">
                                    <div className="students-three-counts">
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Class 12th Students
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Batch Ongoing - 1 May 2024
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Target Year - 2025
                                      </p>
                                    </div>
                                  </div>
                                  <div className="price-three-group d-flex align-items-center justify-content-between">
                                    <div className="price-three-view d-flex align-items-center">
                                      <div className="course-price-three">
                                        <div className="course-price-three">
                                          <div className="transform-button-three">
                                            <Link
                                              to="/jeeclass12"
                                              className="btn btn-action btn-explore "
                                            >
                                              Explore More
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                            <div className="course-box-three">
                              <div className="course-three-item">
                                <div className="course-three-img">
                                  <Link to="/jeedropper">
                                    <img
                                      className="img-fluid"
                                      alt="Img"
                                      src="/assets/img/dashboard-student/3.jpg"
                                    />
                                  </Link>
                                </div>
                                <div className="course-three-content">
                                  <div className="course-three-text">
                                    <Link to="course-details.html">
                                      <h3 className="title instructor-text">
                                        JEE Dropper Batch
                                      </h3>
                                    </Link>
                                  </div>
                                  <div className="student-counts-info d-flex student-counts-sections">
                                    <div className="students-three-counts">
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Class 12th Students
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Batch Ongoing - 22 Jul 2024
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Target Year - 2025
                                      </p>
                                    </div>
                                  </div>
                                  <div className="price-three-group d-flex align-items-center justify-content-between">
                                    <div className="price-three-view d-flex align-items-center">
                                      <div className="course-price-three">
                                        <div className="transform-button-three">
                                          <Link
                                            to="/jeedropper"
                                            className="btn btn-action btn-explore "
                                          >
                                            Explore More
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="mostpopulartab">
                      <div className="all-course">
                        <div className="row">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                            <div className="course-box-three">
                              <div className="course-three-item">
                                <div className="course-three-img">
                                  <Link to="/neetclass11">
                                    <img
                                      className="img-fluid"
                                      alt="Img"
                                      src="/assets/img/dashboard-student/4.jpg"
                                    />
                                  </Link>
                                </div>
                                <div className="course-three-content">
                                  <div className="course-three-text">
                                    <Link to="/neetclass11">
                                      <h3 className="title instructor-text">
                                        NEET Nurture Batch
                                      </h3>
                                    </Link>
                                  </div>
                                  <div className="student-counts-info d-flex student-counts-sections">
                                    <div className="students-three-counts">
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Class 11th Students
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Batch Ongoing - 22 Jul 2024
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Target Year - 2026
                                      </p>
                                    </div>
                                  </div>
                                  <div className="price-three-group d-flex align-items-center justify-content-between">
                                    <div className="price-three-view d-flex align-items-center">
                                      <div className="course-price-three">
                                        <div className="transform-button-three">
                                          <Link
                                            to="/neetclass11"
                                            className="btn btn-action btn-explore "
                                          >
                                            Explore More
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                            <div className="course-box-three">
                              <div className="course-three-item">
                                <div className="course-three-img">
                                  <Link to="/neetclass12">
                                    <img
                                      className="img-fluid"
                                      alt="Img"
                                      src="/assets/img/dashboard-student/5.jpg"
                                    />
                                  </Link>
                                </div>
                                <div className="course-three-content">
                                  <div className="course-three-text">
                                    <Link to="/neetclass12">
                                      <h3 className="title instructor-text">
                                        NEET Enthuse Batch
                                      </h3>
                                    </Link>
                                  </div>
                                  <div className="student-counts-info d-flex student-counts-sections">
                                    <div className="students-three-counts">
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Class 12th Students
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Batch Ongoing - 1 May 2024
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Target Year - 2025
                                      </p>
                                    </div>
                                  </div>
                                  <div className="price-three-group d-flex align-items-center justify-content-between">
                                    <div className="price-three-view d-flex align-items-center">
                                      <div className="course-price-three">
                                        <div className="transform-button-three">
                                          <Link
                                            to="/neetclass12"
                                            className="btn btn-action btn-explore "
                                          >
                                            Explore More
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                            <div className="course-box-three">
                              <div className="course-three-item">
                                <div className="course-three-img">
                                  <Link to="/neetdroper">
                                    <img
                                      className="img-fluid"
                                      alt="Img"
                                      src="/assets/img/dashboard-student/6.jpg"
                                    />
                                  </Link>
                                </div>
                                <div className="course-three-content">
                                  <div className="course-three-text">
                                    <Link to="/neetdroper">
                                      <h3 className="title instructor-text">
                                        NEET Achiever Batch
                                      </h3>
                                    </Link>
                                  </div>
                                  <div className="student-counts-info d-flex student-counts-sections">
                                    <div className="students-three-counts">
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Class 12th Pass Out
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Batch Ongoing - 22 Jul 2024
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Target Year - 2025
                                      </p>
                                    </div>
                                  </div>
                                  <div className="price-three-group d-flex align-items-center justify-content-between">
                                    <div className="price-three-view d-flex align-items-center">
                                      <div className="course-price-three">
                                        <div className="transform-button-three">
                                          <Link
                                            to="/neetdroper"
                                            className="btn btn-action btn-explore "
                                          >
                                            Explore More
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="businesstab">
                      <div className="businesstab">
                        <div className="row">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                            <div className="course-box-three">
                              <div className="course-three-item">
                                <div className="course-three-img">
                                  <Link to="/olympiad-batch">
                                    <img
                                      className="img-fluid"
                                      alt="Img"
                                      src="/assets/img/dashboard-student/7.jpg"
                                    />
                                  </Link>
                                </div>
                                <div className="course-three-content">
                                  <div className="course-three-text">
                                    <Link to="/olympiad-batch">
                                      <h3 className="title instructor-text">
                                        Olympiad Program
                                      </h3>
                                    </Link>
                                  </div>
                                  <div className="student-counts-info d-flex student-counts-sections">
                                    <div className="students-three-counts">
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Class 5th - 10th
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Admission Open
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Target Year - 2024
                                      </p>
                                    </div>
                                  </div>
                                  <div className="price-three-group d-flex align-items-center justify-content-between">
                                    <div className="price-three-view d-flex align-items-center">
                                      <div className="course-price-three">
                                        <div className="transform-button-three">
                                          <Link
                                            to="/olympiad-batch"
                                            className="btn btn-action btn-explore "
                                          >
                                            Explore More
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                            <div className="course-box-three">
                              <div className="course-three-item">
                                <div className="course-three-img">
                                  <Link to="/tapasay-batch">
                                    <img
                                      className="img-fluid"
                                      alt="Img"
                                      src="/assets/img/dashboard-student/8.jpg"
                                    />
                                  </Link>
                                </div>
                                <div className="course-three-content">
                                  <div className="course-three-text">
                                    <Link to="/tapasay-batch">
                                      <h3 className="title instructor-text">
                                        Tapasya
                                      </h3>
                                    </Link>
                                  </div>
                                  <div className="student-counts-info d-flex student-counts-sections">
                                    <div className="students-three-counts">
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Class 9th & 10th
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Admission Open
                                      </p>
                                      <p>
                                        <MdOutlineDoubleArrow className="text-skyblue" />
                                        &nbsp;Target Year - 2026
                                      </p>
                                    </div>
                                  </div>
                                  <div className="price-three-group d-flex align-items-center justify-content-between">
                                    <div className="price-three-view d-flex align-items-center">
                                      <div className="course-price-three">
                                        <div className="transform-button-three">
                                          <Link
                                            to="/tapasay-batch"
                                            className="btn btn-action btn-explore "
                                          >
                                            Explore More
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
