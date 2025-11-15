import { CiAlignTop } from "react-icons/ci";
import { PiStudentDuotone } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { FaSchool } from "react-icons/fa";
import { TbAlignBoxCenterStretch } from "react-icons/tb";
import "../../custom.css";

const SipAdv = () => {
  return (
    <>
      <section className="home-three-trending sip-adv-mt">
        <div className="container">
          <div className="row">
            <div className=" home-three-head  section-title-center section-header-titler section-header-title">
              <div className="row align-items-center d-flex justify-content-between sip-adv-title">
                <div className="col-lg-12">
                  <h2 className="text-capitalize">The SIP Advantage</h2>
                </div>
              </div>
            </div>
            <div className="sip-adv-owl-carousel home-three-trending-course owl-theme">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-sip-adv-tips trending-bg-one">
                      <div className="course-title-one sid-adv-icon-title">
                        <CiAlignTop />
                      </div>
                      <div className="trending-three-text trending-text-sip-adv">
                        <h3 className="title instructor-text text-light">
                          Top School Performance
                        </h3>
                        <p className="sip-adv-p text-light">
                          Position your school for success with remarkable board
                          exam achievements and JEE/NEET rankings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-sip-adv-tips trending-bg-two">
                      <div className="course-title-one  sid-adv-icon-title">
                        <PiStudentDuotone />
                      </div>
                      <div className="trending-three-text  trending-text-sip-adv">
                        <h3 className="title instructor-text text-light">
                          Enhance Student Retention
                        </h3>
                        <p className="sip-adv-p text-light">
                          Equip your students with top-notch JEE / NEET
                          preparation right within your school.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-sip-adv-tips trending-bg-three">
                      <div className="course-title-one sid-adv-icon-title">
                        <FaPeopleGroup />
                      </div>
                      <div className="trending-three-text  trending-text-sip-adv">
                        <h3 className="title instructor-text text-light">
                          Gain a Competitive Edge{" "}
                        </h3>
                        <p className="sip-adv-p text-light">
                          Set your school apart from competitors and attract
                          aspiring competitive exam students.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-sip-adv-tips trending-bg-one">
                      <div className="course-title-one sid-adv-icon-title">
                        <GiTeacher />
                      </div>
                      <div className="trending-three-text trending-text-sip-adv">
                        <h3 className="title instructor-text text-light">
                          Guidance from Expert Faculty
                        </h3>
                        <p className="sip-adv-p text-light">
                          Empower students with the collective expertise of
                          India’s premier educators, available right within your
                          school.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-sip-adv-tips trending-bg-two">
                      <div className="course-title-one  sid-adv-icon-title">
                        <FaSchool />
                      </div>
                      <div className="trending-three-text  trending-text-sip-adv">
                        <h3 className="title instructor-text text-light">
                          Balanced Focus on Studies.{" "}
                        </h3>
                        <p className="sip-adv-p text-light">
                          Students attain success while balancing board exams &
                          competitive exam preparation in a familiar school
                          environment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-sip-adv-tips trending-bg-three">
                      <div className="course-title-one sid-adv-icon-title">
                        <TbAlignBoxCenterStretch />
                      </div>
                      <div className="trending-three-text  trending-text-sip-adv">
                        <h3 className="title instructor-text text-light">
                          Hassle-free Preparation
                        </h3>
                        <p className="sip-adv-p text-light">
                          Brings top-tier preparation directly to your school,
                          saving students from the hassle of commuting to
                          coaching centers.
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
    </>
  );
};

export default SipAdv;
