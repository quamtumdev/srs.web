import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { BsArrowRightSquare } from "react-icons/bs";
import CourseForm from "../JEE-Courses/UI-Courses/CourseForm";
import Filter from "../JEE-Courses/UI-Courses/Filter";
import NeetPrep from "./UI-Neet-Courses/NeetPrep";
import "../../../custom.css";
const NeetDropper = () => {
  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list pt-3"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="inner-banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="instructor-wrap border-bottom-0 m-0">
                <span className="web-badge mb-3">Target Year 2025</span>
              </div>
              <h2>NEET SUPER ACHIEVER BATCH</h2>
              <p>Class 12th to 13th Moving Student</p>
            </div>
          </div>
        </div>
      </div>
      <section className="page-content course-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="card overview-sec">
                <div className="card-body">
                  <h2 className="subs-title">NEET (PRE-MEDICAL)-2025 </h2>
                  <h5>Course Description of NEET</h5>
                  <p className="text-justify">
                    SRS Educares is known for delivering top-notch classroom
                    coaching and online learning for NEET aspirants. Our
                    curriculum is crafted specifically for NEET 2025 candidates,
                    covering both 12th-grade and board preparations.
                  </p>
                  <p>
                    It strengthens foundational knowledge and sharpens academic
                    skills, making it the ideal choice for aspirants aiming for
                    success. The year-long curriculum familiarizes students with
                    the exam pattern, ensuring their confidence and success in
                    NEET.
                  </p>

                  <h5>Course Highlights</h5>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="award-list jee-course-higlight d-flex align-items-center">
                        <span className="award-icon jee-icon">
                          <IoCheckmarkDoneCircle className="iconCheckDone" />
                        </span>
                        <p>Structured Academic Planner for NEET 2025.</p>
                      </div>
                      <div className="award-list jee-course-higlight d-flex align-items-center">
                        <span className="award-icon jee-icon">
                          <IoCheckmarkDoneCircle className="iconCheckDone" />
                        </span>
                        <p>Complete Syllabus Coverage of Class 11th & 12th.</p>
                      </div>
                      <div className="award-list jee-course-higlight d-flex align-items-center">
                        <span className="award-icon jee-icon">
                          <IoCheckmarkDoneCircle className="iconCheckDone" />
                        </span>
                        <p>Printed Study Material & Daily Practice Sheets</p>
                      </div>
                      <div className="award-list jee-course-higlight d-flex align-items-center">
                        <span className="award-icon jee-icon">
                          <IoCheckmarkDoneCircle className="iconCheckDone" />
                        </span>
                        <p>
                          One on One doubt solving support & Regular Test
                          facility.{" "}
                        </p>
                      </div>
                      <div className="award-list jee-course-higlight d-flex align-items-center">
                        <span className="award-icon jee-icon">
                          <IoCheckmarkDoneCircle className="iconCheckDone" />
                        </span>
                        <p>
                          Free Access to SRS Educares Learning App for
                          conceptual revision of Syllabus.
                        </p>
                      </div>
                    </div>
                  </div>
                  <h5 className="pt-3">Planner</h5>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="award-list jeebatch d-flex align-items-center">
                        <span className="award-icon jee-icon">
                          <IoCheckmarkDoneCircle className="iconCheckDone" />
                        </span>
                        <p>
                          550+ Online & Offline Classes (Physics 150+, Chemistry
                          150+ & Biology 250+) with Lecture of 90 Minute Each.
                        </p>
                      </div>
                      <div className="award-list jeebatch d-flex align-items-center">
                        <span className="award-icon jee-icon">
                          <IoCheckmarkDoneCircle className="iconCheckDone" />
                        </span>
                        <p>
                          5000+ Questions Practice accessible in both Online and
                          Offline mode.
                        </p>
                      </div>
                      <div className="award-list d-flex align-items-center">
                        <span className="award-icon jee-icon">
                          <IoCheckmarkDoneCircle className="iconCheckDone" />
                        </span>
                        <p>35+ Test Papers Will Conduct for Practice.</p>
                      </div>
                      <div className="award-list d-flex align-items-center">
                        <span className="award-icon jee-icon">
                          <IoCheckmarkDoneCircle className="iconCheckDone" />
                        </span>
                        <p>
                          {" "}
                          Free Access of Learning App which contain Live Class &
                          Recorded Video Lectures, Video Solutions, PYQ&apos;S &
                          Other Support.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <NeetPrep />
            </div>
            <div className="col-lg-4">
              <div className="sidebar-sec">
                <CourseForm />
                <Filter />

                <div className="card feature-sec">
                  <div className="card-body">
                    <div className="cat-title">
                      <h4>Course Fee for 12th Class- Targeting NEET 2025</h4>
                    </div>
                    <div className="award-list jee-award-list d-flex align-items-center">
                      <span className="award-icon jee-icon">
                        <BsArrowRightSquare className="iconCheckDone  arrow-icon-jee text-blue" />
                      </span>
                      <p>
                        <b> Admission + Kit Fee:</b> <span>₹ 15,000</span>
                      </p>
                    </div>
                    <div className="award-list jee-award-list d-flex align-items-center">
                      <span className="award-icon jee-icon">
                        <BsArrowRightSquare className="iconCheckDone  arrow-icon-jee text-blue" />
                      </span>
                      <p>
                        <b>Tuition Fee</b> <span>₹ 34,999</span>
                      </p>
                    </div>
                    <div className="award-list jee-award-list d-flex align-items-center">
                      <span className="award-icon jee-icon">
                        <BsArrowRightSquare className="iconCheckDone  arrow-icon-jee text-blue" />
                      </span>
                      <p>
                        <b>Total Fee</b> <span>₹ 49,999</span>
                      </p>
                    </div>
                    <div className="award-list jee-award-list d-flex align-items-center">
                      <span className="award-icon jee-icon">
                        <BsArrowRightSquare className="iconCheckDone  arrow-icon-jee text-blue" />
                      </span>
                      <p>EMI option available with 0% interest rate.</p>
                    </div>
                    <div className="award-list jee-award-list d-flex align-items-center">
                      <span className="award-icon jee-icon">
                        <BsArrowRightSquare className="iconCheckDone  arrow-icon-jee text-blue" />
                      </span>
                      <p>
                        {" "}
                        Admission + Kit Fee of ₹ 15,000/- is non-refundable.
                      </p>
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
export default NeetDropper;
