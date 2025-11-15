import { FaUserGraduate } from "react-icons/fa6";
import { GiBookCover } from "react-icons/gi";
import { CgPlayButtonO } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbMessage2Question } from "react-icons/tb";
import { SiPytest } from "react-icons/si";

import "../../custom.css";
export const SrsEducare = () => {
  return (
    <>
      <section className="home-three-trending  why-srs-educares-mg-custom">
        <div className="container">
          <div className="row">
            <div className="home-three-head  section-title-center section-header-titler section-header-title">
              <div className="row align-items-center d-flex justify-content-between sip-adv-title">
                <div className="col-lg-12">
                  <h2 className="text-capitalize">Why SRS Educares</h2>
                </div>
              </div>
            </div>
            <div className="sip-adv-owl-carousel home-three-trending-course owl-theme">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-content-area-why trending-bg-1 ">
                      <div className="course-title-one why-choose-us-icons-trend">
                        <FaUserGraduate />
                      </div>
                      <div className="trending-three-text why-choose-text-content-area-trending">
                        <b className="trusted-text-why-choose">
                          Trusted Instructors
                        </b>
                        <p className="sip-adv-p fs-4 pt-2">
                          Our teachers are experienced NEET and IIT JEE coaches,
                          trusted experts guiding students to success.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-content-area-why trending-bg-2 ">
                      <div className="course-title-one why-choose-us-icons-trend">
                        <FaPeopleGroup />
                      </div>
                      <div className="trending-three-text why-choose-text-content-area-trending">
                        <b className="trusted-text-why-choose">
                          Motivating Teachers
                        </b>
                        <p className="sip-adv-p fs-4 pt-2">
                          Our classroom teachers keep spirits high with regular
                          support and motivation sessions throughout your
                          journey.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-content-area-why trending-bg-3 ">
                      <div className="course-title-one why-choose-us-icons-trend">
                        <GiBookCover />
                      </div>
                      <div className="trending-three-text why-choose-text-content-area-trending">
                        <b className="trusted-text-why-choose">
                          Engaging Study Materials
                        </b>
                        <p className="sip-adv-p fs-4 pt-2">
                          Colorful study materials with 2D and 3D visuals for
                          easy understanding, tailored to NEET and JEE exams.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-content-area-why trending-bg-4 ">
                      <div className="course-title-one why-choose-us-icons-trend">
                        <TbMessage2Question />
                      </div>
                      <div className="trending-three-text why-choose-text-content-area-trending">
                        <b className="trusted-text-why-choose">
                          Faculty Support
                        </b>
                        <p className="sip-adv-p fs-4 pt-2">
                          Our classroom teachers are always available to help
                          with questions and analyze students&apos; mistakes
                          thoroughly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-content-area-why trending-bg-5 ">
                      <div className="course-title-one why-choose-us-icons-trend">
                        <CgPlayButtonO />
                      </div>
                      <div className="trending-three-text why-choose-text-content-area-trending">
                        <b className="trusted-text-why-choose">Replay Access</b>
                        <p className="sip-adv-p fs-4 pt-2">
                          Students can access live classes and recordings of all
                          classroom sessions for better understanding.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-content-area-why trending-bg-6 ">
                      <div className="course-title-one why-choose-us-icons-trend">
                        <SiPytest />
                      </div>
                      <div className="trending-three-text why-choose-text-content-area-trending">
                        <b className="trusted-text-why-choose">
                          Regular Assessment
                        </b>
                        <p className="sip-adv-p fs-4 pt-2">
                          Our testing platform provides real-time reports,
                          identifies weaknesses, and offers focused study
                          materials.
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
