import "../../custom.css";

import { IoNewspaperOutline } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa";
import { FaSuperpowers } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";
import { SiPytest } from "react-icons/si";
import { MdOutlineFeedback } from "react-icons/md";
const FeaturesCenter = () => {
  return (
    <section className="topcategory-sec mb-5">
      <div className="container">
        <div className="section-header-title  home-three-head  section-title-center section-header-titler ">
          <h2 className="text-capitalize">
            Upgrade assessments with engaging features
          </h2>
        </div>
        <div className="top-category-group">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex">
              <div className="categories-item flex-fill box-exam-prep">
                <div className="categories-icon">
                  <IoNewspaperOutline className="center-features-icons text-blue" />
                </div>
                <div className="categories-content">
                  <h3>Test Patterns</h3>
                  <p className="jee-exam-prep">
                    Create question papers quickly using a vast range of
                    ready-made test templates.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex">
              <div className="categories-item flex-fill box-exam-prep">
                <div className="categories-icon">
                  <FaAddressBook className="center-features-icons text-blue" />
                </div>
                <div className="categories-content">
                  <h3>Paper-Based Tests</h3>
                  <p className="jee-exam-prep">
                    Effortlessly create and customize question papers online for
                    easy offline distribution.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex">
              <div className="categories-item flex-fill box-exam-prep">
                <div className="categories-icon">
                  <FaSuperpowers className="center-features-icons text-blue" />
                </div>
                <div className="categories-content">
                  <h3>Key Questions & High-Impact Tests</h3>
                  <p className="jee-exam-prep">
                    Boost in-class practice with Key Questions, generating
                    unlimited unique questions.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex">
              <div className="categories-item flex-fill box-exam-prep">
                <div className="categories-icon">
                  <FaBookReader className="center-features-icons text-blue" />
                </div>
                <div className="categories-content">
                  <h3>Question Mixing</h3>
                  <p className="jee-exam-prep">
                    Stop cheating by randomizing question order, ensuring unique
                    assessments for each student.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex">
              <div className="categories-item flex-fill box-exam-prep">
                <div className="categories-icon">
                  <SiPytest className="center-features-icons text-blue" />
                </div>
                <div className="categories-content">
                  <h3>Offline Test Scoring</h3>
                  <p className="jee-exam-prep">
                    Quickly assess pen-and-paper test sheets by scanning and
                    uploading for automated grading.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex">
              <div className="categories-item flex-fill box-exam-prep">
                <div className="categories-icon">
                  <MdOutlineFeedback className="center-features-icons text-blue" />
                </div>
                <div className="categories-content">
                  <h3>Feedback Markings</h3>
                  <p className="jee-exam-prep">
                    Enhance student growth with detailed, personalized feedback
                    for improved performance.
                  </p>
                </div>
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

export default FeaturesCenter;
