import { LuArrowUpRightFromCircle } from "react-icons/lu";
import { Link } from "react-router-dom";
import "../../../../custom.css";
const NeetPrep = () => {
  return (
    <>
      <div className="card content-sec">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <h2 className="subs-title">
                BEST ClASSROOM PROGRAM FOR NEET PREPARATION
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
                Regular Yearlong classroom Program{" "}
              </Link>
            </h6>
            <div id="collapseOne" className="card-collapse collapse">
              <div className="award-list jee-award-list d-flex align-items-center">
                <span className="award-icon jee-icon">
                  <LuArrowUpRightFromCircle className="iconCheckDone  arrow-icon-jee text-skyblue" />
                </span>
                <p>
                  Our interactive classroom programs are expertly designed,
                  providing everything you need to succeed in NEET without any
                  extra study materials.
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
                Topic wise DPPs and Question Bank
              </Link>
            </h6>
            <div id="course2" className="card-collapse collapse">
              <div className="award-list jee-award-list d-flex align-items-center">
                <span className="award-icon jee-icon">
                  <LuArrowUpRightFromCircle className="iconCheckDone  arrow-icon-jee text-skyblue" />
                </span>
                <p>
                  Focuses on boosting confidence of students for facing National
                  Level competitive exams by providing subject wise and topic
                  wise questions with solutions.
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
                Boost your performance with SRS Educares&apos; Online Test
                Series!
              </Link>
            </h6>
            <div id="course3" className="card-collapse collapse">
              <div className="award-list jee-award-list d-flex align-items-center">
                <span className="award-icon jee-icon">
                  <LuArrowUpRightFromCircle className="iconCheckDone  arrow-icon-jee text-skyblue" />
                </span>
                <p>
                  Online Test Series (OTS) is designed according to NEET Main +
                  Advanced and NEET exam pattern that stimulates the actual
                  examination environment and provides an opportunity to revise
                  every concept thoroughly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card content-sec">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <h2 className="subs-title">
                NEET ONLINE STUDY WITH SRS EDUCARES LEARNING APP
              </h2>
            </div>
          </div>
          <div className="course-card">
            <h6 className="cou-title">
              <Link
                className="collapsed"
                data-bs-toggle="collapse"
                to="#collapse1"
                aria-expanded="false"
              >
                Access to Video Lectures
              </Link>
            </h6>
            <div id="collapse1" className="card-collapse collapse">
              <div className="award-list jee-award-list d-flex align-items-center">
                <span className="award-icon jee-icon">
                  <LuArrowUpRightFromCircle className="iconCheckDone  arrow-icon-jee text-skyblue" />
                </span>
                <p>
                  Attend live classroom and study online anytime, anywhere with
                  SRS Educares&apos; top-quality recorded video lectures.
                  Designed by expert faculty, you can revisit key topics
                  whenever you need!
                </p>
              </div>
            </div>
          </div>
          <div className="course-card">
            <h6 className="cou-title">
              <Link
                className="collapsed"
                data-bs-toggle="collapse"
                to="#course02"
                aria-expanded="false"
              >
                Instant Doubt Resolution
              </Link>
            </h6>
            <div id="course02" className="card-collapse collapse">
              <div className="award-list jee-award-list d-flex align-items-center">
                <span className="award-icon jee-icon">
                  <LuArrowUpRightFromCircle className="iconCheckDone  arrow-icon-jee text-skyblue" />
                </span>
                <p>
                  Get all your doubts answered instantly during and after
                  classroom. Your doubts will be answered shortly by Top
                  Educators. You can also clear doubts through Live Chat
                  feature.
                </p>
              </div>
            </div>
          </div>
          <div className="course-card">
            <h6 className="cou-title">
              <Link
                className="collapsed"
                data-bs-toggle="collapse"
                to="#course03"
                aria-expanded="false"
              >
                Performance Statistics
              </Link>
            </h6>
            <div id="course03" className="card-collapse collapse">
              <div className="award-list jee-award-list d-flex align-items-center">
                <span className="award-icon jee-icon">
                  <LuArrowUpRightFromCircle className="iconCheckDone  arrow-icon-jee text-skyblue" />
                </span>
                <p>
                  Analyze your performance in mock test conducted regularly
                  based on NTA pattern. The app allow learners to take
                  chapter-wise quizzes to evaluate their performance and
                  identify their strong and weak topics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NeetPrep;
