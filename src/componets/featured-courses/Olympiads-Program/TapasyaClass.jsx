import { FaUserGraduate } from "react-icons/fa";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { PiYoutubeLogoBold } from "react-icons/pi";
import { BsArrowRightSquare } from "react-icons/bs";

import { Link } from "react-router-dom";
import FormTapasay from "./UI-Olympiads-program/FormTapasay";
import "../../../custom.css";
const TapasyaClass = () => {
  return (
    <>
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list pt-3">
                {/* Add breadcrumb items here if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inner Banner */}
      <div className="inner-banner h-olympiad-banner">
        <div className="container inner-content-olympiads">
          <div className="row">
            <div className="col-lg-8">
              <div className="instructor-wrap border-bottom-0 m-0">
                <span className="web-badge web-badge-1 mb-3">
                  Target Year 2028
                </span>
              </div>
              <h1 className="text-orange font-SRS-olympiads">
                Tapasya 3 and 4 Year Program Targeting JEE
              </h1>
              <p className="font-p-SRS-olympiads">
                For 9th & 10th Class Students
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Olympiad */}
      <FormTapasay />

      <section className="topcategory-sec">
        <div className="container">
          <div className="top-category-group">
            <div className="row">
              <div
                className="col-xl-4 col-lg-6 col-md-6 col-sm-12 d-flex"
                data-aos="fade-down"
              >
                <div className="categories-item flex-fill">
                  <div className="categories-icon">
                    <FaUserGraduate className="categories-icon-fa text-blue" />
                  </div>
                  <div className="categories-content">
                    <h3>Eligibility 9th Class & 10th Class</h3>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-6 col-md-6 col-sm-12 d-flex"
                data-aos="fade-down"
              >
                <div className="categories-item flex-fill">
                  <div className="categories-icon">
                    <PiBookOpenTextDuotone className="categories-icon-fa  text-orange" />
                  </div>
                  <div className="categories-content">
                    <h3>Modes Hybrid & Online(Live)</h3>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-6 col-md-6 col-sm-12 d-flex"
                data-aos="fade-down"
              >
                <div className="categories-item flex-fill">
                  <div className="categories-icon">
                    <PiYoutubeLogoBold className="categories-icon-fa text-skyblue " />
                  </div>
                  <div className="categories-content">
                    <h3>Batch Ongoing 1 May 2024</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row mg-left-tapasya">
            <div className="col-lg-4 col-sm-12">
              <div className="card feature-sec">
                <div className="card-body">
                  <div className="cat-title">
                    <h4>
                      Tapasya - 4 year program targeting JEE(Main+Advanced){" "}
                    </h4>
                  </div>
                  <div className="award-list jee-award-list d-flex align-items-center">
                    <span className="award-icon jee-icon">
                      <BsArrowRightSquare className="iconCheckDone  arrow-icon-jee text-blue" />
                    </span>
                    <p>
                      <b>Year:</b> <span>4 year program</span>
                    </p>
                  </div>
                  <div className="award-list jee-award-list d-flex align-items-center">
                    <span className="award-icon jee-icon">
                      <BsArrowRightSquare className="iconCheckDone  arrow-icon-jee text-blue" />
                    </span>
                    <p>
                      <b>Targeting : </b> <span>JEE(Main+Advanced) 2028</span>
                    </p>
                  </div>
                  <div className="award-list jee-award-list d-flex align-items-center">
                    <span className="award-icon jee-icon">
                      <BsArrowRightSquare className="iconCheckDone  arrow-icon-jee text-blue" />
                    </span>
                    <p>
                      <span>
                        <b>Both :</b> Online & Hybrid available
                      </span>
                    </p>
                  </div>
                  <div className="award-list jee-award-list d-flex align-items-center">
                    <span className="award-icon jee-icon">
                      <BsArrowRightSquare className="iconCheckDone  arrow-icon-jee text-blue" />
                    </span>
                    <p>
                      <b>For Students</b> Presently in Class 9th in the year
                      2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="card feature-sec">
                <div className="card-body">
                  <div className="cat-title">
                    <h4>
                      Tapasya - 3 year program targeting JEE(Main+Advanced)
                    </h4>
                  </div>
                  <div className="award-list jee-award-list d-flex align-items-center">
                    <span className="award-icon jee-icon">
                      <BsArrowRightSquare className="iconCheckDone  arrow-icon-jee text-blue" />
                    </span>
                    <p>
                      <b>Year:</b> <span>3 year program</span>
                    </p>
                  </div>
                  <div className="award-list jee-award-list d-flex align-items-center">
                    <span className="award-icon jee-icon">
                      <BsArrowRightSquare className="iconCheckDone  arrow-icon-jee text-blue" />
                    </span>
                    <p>
                      <b>Targeting : </b> <span>JEE(Main+Advanced) 2027</span>
                    </p>
                  </div>
                  <div className="award-list jee-award-list d-flex align-items-center">
                    <span className="award-icon jee-icon">
                      <BsArrowRightSquare className="iconCheckDone  arrow-icon-jee text-blue" />
                    </span>
                    <p>
                      <span>
                        <b>Both :</b> Online & Hybrid available
                      </span>
                    </p>
                  </div>
                  <div className="award-list jee-award-list d-flex align-items-center">
                    <span className="award-icon jee-icon">
                      <BsArrowRightSquare className="iconCheckDone  arrow-icon-jee text-blue" />
                    </span>
                    <p>
                      <b>For Students</b> Presently in Class 10th in the year
                      2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="row">
              <div className="card content-sec">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-12">
                      <h2 className="subs-title">
                        Tapasya 3 and 4 Year Program Targeting JEE
                      </h2>
                    </div>
                  </div>
                  <div className="course-card">
                    <h6 className="cou-title">
                      <Link
                        className="collapsed"
                        data-bs-toggle="collapse"
                        to="#collapseOne"
                        aria-expanded="false"
                      >
                        About Program
                      </Link>
                    </h6>
                    <div id="collapseOne" className="card-collapse collapse">
                      <div className="award-list jee-award-list d-flex align-items-center">
                        {/* <span className="award-icon jee-icon">
                          <LuArrowUpRightFromCircle className="iconCheckDone  arrow-icon-jee text-skyblue" />
                        </span> */}
                        <p>
                          The Three/Four Year Hybrid Program are specially
                          designed for JEE (Main+Advanced) aspirants who have
                          currently enrolled in classes 9th and 10th
                          respectively and aspire to prepare for JEE
                          (Main+Advanced) Entrance Exams from an early stage.
                          <br />
                          <br />
                          These courses target to assist students in early
                          preparation for the Olympiads, National Talent Search
                          Examination (NTSE), Engineering Entrance Examinations
                          (JEE Main & Advanced and other State Engineering
                          Common Entrance Tests).
                          <br />
                          <br />
                          Student studies a regularly updated and standardized
                          curriculum for these three/four years, which helps
                          them develop the conceptual and analytical skills
                          needed to succeed in a variety of competitive exams.
                          <br />
                          <br />
                          These three/ four year program give students the
                          opportunity to prepare thoroughly while laying a
                          strong foundation for them.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="course-card">
                    <h6 className="cou-title">
                      <Link
                        className="collapsed"
                        data-bs-toggle="collapse"
                        to="#course2"
                        aria-expanded="false"
                      >
                        Why This Program
                      </Link>
                    </h6>
                    <div id="course2" className="card-collapse collapse">
                      <div className="award-list jee-award-list d-flex align-items-center">
                        <p>
                          The maximum number of JEE (Advanced) attempts has been
                          limited by IITs. There are now just two opportunities
                          for students: one right after the 12th board
                          examinations and the second immediately in the
                          following year.
                          <br />
                          <br /> They should aim to pass the JEE (Advanced) on
                          their first attempt and should not put themselves
                          under undue pressure because appearing for the second
                          and final attempts could be too risky due to the
                          possibility of illness or accidents.
                          <br />
                          <br />
                          Up until the 1990s, it was acceptable to begin your
                          preparation after grade 11th and at the start of grade
                          12th, but even then, you had to start early enough to
                          achieve Top Ranks. But beginning in the early 2000s,
                          it became customary to begin JEE preparation at the
                          start of class 11th and commit at least two years to
                          intense preparation.
                          <br />
                          <br />
                          Now, only the talented students can succeed by
                          beginning their JEE training in 11th due to the
                          increased competition and the fact that there are only
                          two chances available. However, if you lack the
                          natural talent that would lead you to the top ranks of
                          JEE, you will have no choice but to begin your
                          preparation in class 9th.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="course-card">
                    <h6 className="cou-title">
                      <Link
                        className="collapsed"
                        data-bs-toggle="collapse"
                        to="#course3"
                        aria-expanded="false"
                      >
                        What is 4 Year TAPASYA Program?{" "}
                      </Link>
                    </h6>
                    <div id="course3" className="card-collapse collapse">
                      <div className="award-list jee-award-list d-flex align-items-center">
                        <p>
                          To prepare Class 9th students for the JEE Main and
                          Advanced and other State Engineering CETs and School/
                          Board Exams, Olympiads, and NTSE, we offer a Four-
                          year hybrid program from Class 9th to 12th. <br />
                          <br />
                          This course aim at preparing students at foundation
                          level and building a strong academic base for them.{" "}
                          <br />
                          <br />
                          The students study topics related to JEE in class 9th
                          only, which makes it easier for them to study better
                          in class 11th & 12th. Students studying in Class 8th
                          and moving to Class 9th.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="course-card">
                    <h6 className="cou-title">
                      <Link
                        className="collapsed"
                        data-bs-toggle="collapse"
                        to="#course4"
                        aria-expanded="false"
                      >
                        What is 3 Year TAPASYA Program?{" "}
                      </Link>
                    </h6>
                    <div id="course4" className="card-collapse collapse">
                      <div className="award-list jee-award-list d-flex align-items-center">
                        <p>
                          To prepare Class 10th students for the JEE Main and
                          Advanced and other State Engineering CETs and School/
                          Board Exams, Olympiads, and NTSE, we offer a Three-
                          year hybrid program from Class 9th to 12th. <br />
                          <br />
                          This course aim at preparing students at foundation
                          level and building a strong academic base for them.
                          The students study topics related to JEE in class 10th
                          only, <br />
                          <br />
                          which makes it easier for them to study better in
                          class 11th & 12th. Students studying in Class 9th and
                          moving to Class 10th can apply for this course.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="course-card">
                    <h6 className="cou-title">
                      <Link
                        className="collapsed"
                        data-bs-toggle="collapse"
                        to="#course5"
                        aria-expanded="false"
                      >
                        Course Stucture
                      </Link>
                    </h6>
                    <div id="course5" className="card-collapse collapse">
                      <div className="award-list jee-award-list d-flex align-items-center">
                        <p>
                          Subjects covered: Physics, Chemistry, Mathematics,
                          English, Social Studies, and Mental Ability will be
                          covered for the NTSE level in classes 9th and 10th
                          while the emphasis on the JEE Main & Advanced
                          continues. In classes 11th and 12th, Physics,
                          Chemistry, and Mathematics will be covered for the JEE
                          Main & Advanced.
                          <br />
                          <br />
                          Pre-defined Yearly Planner:The yearly planner consists
                          of arrayed chapters for each subject, a test grid of
                          the whole session with syllabus mentioned in it, a
                          holiday schedule & homework schedule etc.
                          <br />
                          <br />
                          Extensive coverage of additional topics for JEE Main &
                          Advanced.
                          <br />
                          <br />
                          The right balance of classes, problem-solving classes
                          and doubt clearing classes.
                          <br />
                          <br />
                          Daily Practice Sheets (DPP) for School preparations to
                          be solved and Submitted.
                          <br />
                          <br />
                          Comprehensive Practice Sheets (CPS) for JEE
                          preparations to be solved and Submitted.
                          <br />
                          <br />
                          SRS Educares best complete Study material of Class
                          9th, 10th, 11th & 12th designed by top experienced
                          faculties to crack Olympiad, JEE entrance exam.
                          <br />
                          <br />
                          All India Testing: Regular examinations that are
                          listed in the yearly planner and given to Motion
                          students at all study locations are used to evaluate
                          the topics that the students have learned and
                          practiced. Students can use this to assess their
                          national performance.
                          <br />
                          <br />
                          Periodic tests are conducted on the latest JEE
                          pattern.
                          <br />
                          <br />
                          Every month feedback reports are shared with parents
                          in PTM.
                          <br />
                          <br />
                          NTSE & Board Mock Test Papers.
                          <br />
                          <br />
                          JEE Archive: Question Bank with Answers of previous
                          year JEE (Main & Advanced)papers.
                          <br />
                          <br />
                          Dedicated academic operations team provides feedback
                          at any point in time apart from scheduled parent
                          teachers meetings.
                          <br />
                          <br />
                          Relevant Competitive Examination: National Talent
                          Search Examination (NTSE), International Junior
                          Science Olympiads(IJSO) and Regional Mathematics
                          Olympiad (RMO), JEE Main & Advanced.
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

export default TapasyaClass;
