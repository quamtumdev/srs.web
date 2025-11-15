import { TbArrowForwardUpDouble } from "react-icons/tb";
import "../../custom.css";

const SrsVsOthers = () => {
  return (
    <>
      <section>
        <div className="container mt-5 pt-5 ">
          <div className="row">
            <div className="col-lg-12 pt-2">
              <div className="section-title  home-three-head  section-title-center section-header-titler">
                <h2 className="dark-blue">SRS Educares Vs Other Platforms</h2>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-price">
                  <thead>
                    <tr>
                      <td className="text-center  self-cell-feature">
                        Features
                      </td>
                      <td className="text-center  self-cell">SRS Educares</td>
                      <td className="text-center business-cell">
                        Other Platforms
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <TbArrowForwardUpDouble className="fs-3 text-black" />
                        &nbsp; Lecture Hours
                      </td>
                      <td className="text-left">
                        <img
                          src="assets/img/icon/check-circle.svg"
                          alt="icon"
                        />
                        &nbsp; 360 hours (Syllabus Coverage) + 100 hours
                        (Revision)
                      </td>
                      <td className="text-left">
                        <img
                          src="assets/img/icon/close-circle.svg"
                          alt="icon"
                        />
                        &nbsp; Less than 300 hours
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {" "}
                        <TbArrowForwardUpDouble className="fs-3 text-black" />
                        &nbsp;Daily Practice Papers
                      </td>
                      <td className="text-left">
                        <img
                          src="assets/img/icon/check-circle.svg"
                          alt="icon"
                        />
                        &nbsp;360 hours (Syllabus Coverage) + 100 hours
                        (Revision)
                      </td>
                      <td className="text-left">
                        <img
                          src="assets/img/icon/close-circle.svg"
                          alt="icon"
                        />
                        &nbsp;Common DPP across all batches
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {" "}
                        <TbArrowForwardUpDouble className="fs-3 text-black" />
                        &nbsp;Self-Practice
                      </td>
                      <td className="text-left">
                        <img
                          src="assets/img/icon/check-circle.svg"
                          alt="icon"
                        />
                        &nbsp;1.2 lakhs + questions for self- practice with
                        question categorization into Beginner, Intermediate, and
                        Advance levels
                      </td>
                      <td className="text-left">
                        <img
                          src="assets/img/icon/close-circle.svg"
                          alt="icon"
                        />
                        &nbsp;Limited question bank
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {" "}
                        <TbArrowForwardUpDouble className="fs-3 text-black" />
                        &nbsp;Cheating Eliminated
                      </td>
                      <td className="text-left">
                        <img
                          src="assets/img/icon/check-circle.svg"
                          alt="icon"
                        />
                        &nbsp;Unique testing experiences for each student by
                        generating unlimited variations of the same questions
                        with Power Questions feature
                      </td>
                      <td className="text-left">
                        <img
                          src="assets/img/icon/close-circle.svg"
                          alt="icon"
                        />
                        &nbsp;Limited automation
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <TbArrowForwardUpDouble className="fs-3 text-black" />
                        &nbsp;Inter Platform Connectivity
                      </td>
                      <td className="text-left">
                        <img
                          src="assets/img/icon/check-circle.svg"
                          alt="icon"
                        />
                        &nbsp;Complete and connected ecosystem for students,
                        parents, teachers and school managements
                      </td>
                      <td className="text-left">
                        <img
                          src="assets/img/icon/close-circle.svg"
                          alt="icon"
                        />
                        &nbsp;Limited connectivity between platforms
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <TbArrowForwardUpDouble className="fs-3 text-black" />
                        &nbsp;Bloom&apos; Taxanomy based reports
                      </td>
                      <td className="text-left">
                        <img
                          src="assets/img/icon/check-circle.svg"
                          alt="icon"
                        />
                        &nbsp;In-depth reports and performance analytics based
                        on Bloom’s taxanomy parameters
                      </td>
                      <td className="text-left">
                        <img
                          src="assets/img/icon/close-circle.svg"
                          alt="icon"
                        />
                        &nbsp;Basic reports provided
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SrsVsOthers;
