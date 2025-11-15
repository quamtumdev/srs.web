import { LuSchool2 } from "react-icons/lu";
import { PiStudentDuotone } from "react-icons/pi";
import { MdContentPaste } from "react-icons/md";
import { RiGroupFill } from "react-icons/ri";
import "../../custom.css";

export const Widget = () => {
  return (
    <>
      <section className="section student-course home-three-course">
        <div className="container">
          <div className="course-widget-three">
            <div className="row">
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="course-details-three">
                  <div className="align-items-center">
                    <div className="course-count-three course-count ms-0">
                      <div className="course-img">
                        <LuSchool2 className="courses-img-icons text-blue" />
                      </div>
                      <div className="course-content-three">
                        <h4 className="text-dark">
                          <span className="counterUp">10</span>+
                        </h4>
                        <p>Number of Schools</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="course-details-three">
                  <div className="align-items-center">
                    <div className="course-count-three course-count ms-0">
                      <div className="course-img">
                        <PiStudentDuotone className="courses-img-icons text-orange" />
                      </div>
                      <div className="course-content-three">
                        <h4 className="text-dark">
                          <span className="counterUp">10</span>K+
                        </h4>
                        <p>Number of Student</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="course-details-three">
                  <div className="align-items-center">
                    <div className="course-count-three course-count ms-0">
                      <div className="course-img">
                        <MdContentPaste className="courses-img-icons text-skyblue" />
                      </div>
                      <div className="course-content-three">
                        <h4 className="text-dark">
                          <span className="counterUp">10</span>L+
                        </h4>
                        <p>Number of Content</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="course-details-three mb-0">
                  <div className="align-items-center">
                    <div className="course-count-three">
                      <div className="course-img course-icon-custom-group">
                        <RiGroupFill className="text-purple courses-img-icons " />
                      </div>
                      <div className="course-content-three course-count ms-0">
                        <h4 className="text-dark">
                          <span className="counterUp">50</span>+
                        </h4>
                        <p>Number of Teachers</p>
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
