import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { LuArrowUpRightFromCircle } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import FormOlympiad from "./UI-Olympiads-program/FormOlympiad";
import "../../../custom.css";
const OlympiadsclassName5 = () => {
  const [show, setShow] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState({
    targetExam: "",
    class: "",
    courseType: "",
    amount: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = details => {
    setSelectedDetails(details);
    setShow(true);
  };

  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list pt-3 "></div>
            </div>
          </div>
        </div>
      </div>

      <div className="inner-banner h-olympiad-banner ">
        <div className="container inner-content-olympiads ">
          <div className="row">
            <div className="col-lg-8">
              <div className="instructor-wrap border-bottom-0 m-0">
                <span className="web-badge web-badge-1 mb-3">
                  Target Year 2028
                </span>
              </div>
              <h1 className="text-orange font-SRS-olympiads">
                SRS Educares Olympiads Program
              </h1>
              <p className="font-p-SRS-olympiads">
                Class 5th to 10th Moving Student
              </p>
            </div>
          </div>
        </div>
      </div>
      <FormOlympiad />
      <div className="pt-3 mt-4 text-center">
        <h3 className="fee-olympiad">
          Fee Structure For Science Olympiad, Maths Olympiad,PRMO, NTSE & NMTC
          Exams
        </h3>
      </div>
      <div className="container pt-4 margin-top-olympiads">
        <div className="col-xl-12 col-lg-12">
          <div className="settings-widget card-details">
            <div className="settings-menu p-0">
              <div className="checkout-form">
                <div className="filter-grp ticket-grp d-flex align-items-center justify-content-between">
                  <div>
                    <h3>OLYMPIAD PROGRAMS</h3>
                  </div>
                  <div className="ticket-btn-grp col-12 col-lg-auto">
                    <Link
                      to="#"
                      className="w-100 learn-more-five"
                      data-bs-toggle="modal"
                      data-bs-target="#add-tickets"
                    >
                      Enquiry Now <FaArrowRight />
                    </Link>
                  </div>
                </div>
                <div className="wishlist-tab">
                  <ul className="nav flex-column flex-lg-row">
                    <li className="nav-item col-12 col-lg-auto mb-2">
                      <Link
                        to="javascript:void(0);"
                        className="active w-100 learn-more-five"
                        data-bs-toggle="tab"
                        data-bs-target="#all"
                      >
                        OLYMPIAD PROGRAM
                      </Link>
                    </li>
                    <li className="nav-item col-12 col-lg-auto mb-2">
                      <Link
                        to="javascript:void(0);"
                        className="w-100 learn-more-five"
                        data-bs-toggle="tab"
                        data-bs-target="#open"
                      >
                        MATHS OLYM. PROG.
                      </Link>
                    </li>
                    <li className="nav-item col-12 col-lg-auto mb-2">
                      <Link
                        to="javascript:void(0);"
                        className="w-100 learn-more-five"
                        data-bs-toggle="tab"
                        data-bs-target="#inprogress"
                      >
                        SRS NCERT PROGRAM
                      </Link>
                    </li>
                    <li className="nav-item col-12 col-lg-auto mb-2">
                      <Link
                        to="javascript:void(0);"
                        className="w-100 learn-more-five"
                        data-bs-toggle="tab"
                        data-bs-target="#closed"
                      >
                        OLYMPIAD CRACKER
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="tab-content">
                  <div className="tab-pane show active" id="all">
                    <div className="table-responsive custom-table">
                      <table className="table table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>Target Exam</th>
                            <th>Class</th>
                            <th>Course Type</th>
                            <th>6 Months</th>
                            <th>12 Months</th>
                            <th>24 Months</th>
                            <th>36 Months</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>MOP BASIC</td>
                            <td>For Class 6th</td>
                            <td>MATHS and SCIENCE OLYMPIAD</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1200"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For class 6th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "1200",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1200
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="12,600"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 6th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "12,600",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 12,600
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="28,0000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 6th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "28,0000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 28,0000
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="39,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 6th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "39,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 39,000
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>MOP PRO</td>
                            <td>For Class 6th</td>
                            <td>MOP BASIC+NMTC</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1800"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 6th",
                                      courseType: "MOP BASIC+NMTC",
                                      amount: "1800",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="16,800 "
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 6th",
                                      courseType: "MOP BASIC+NMTC",
                                      amount: "16,800",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 16,800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="33,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 6th",
                                      courseType: "MOP BASIC+NMTC",
                                      amount: "33,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 33,000
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="44,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 6th",
                                      courseType: "MOP BASIC+NMTC",
                                      amount: "44,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 44,000
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>MOP BASIC</td>
                            <td>For Class 7th</td>
                            <td>MATHS and SCIENCE OLYMPIAD</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1200"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 7th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "1200",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1200
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="12,600"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 7th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "12,600",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 12,600
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="28,0000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 7th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "28,0000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 28,0000
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="39,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 7th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "39,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 39,000
                              </label>
                            </td>
                          </tr>

                          <tr>
                            <td>MOP PRO</td>
                            <td>For Class 7th</td>
                            <td>MOP BASIC+NMTC</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1800"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 7th",
                                      courseType: "MOP BASIC+NMTC",
                                      amount: "1800",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="16,800 "
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 7th",
                                      courseType: "MOP BASIC+NMTC",
                                      amount: "16,800",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 16,800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="33,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 7th",
                                      courseType: "MOP BASIC+NMTC",
                                      amount: "33,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 33,000
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="44,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 7th",
                                      courseType: "MOP BASIC+NMTC",
                                      amount: "44,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 44,000
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>MOP BASIC</td>
                            <td>For Class 8th</td>
                            <td>MATHS and SCIENCE OLYMPIAD</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1200"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 8th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "1200",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1200
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="12,600"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 8th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "12,600",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 12,600
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="28,0000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 8th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "28,0000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 28,0000
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="39,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 8th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "39,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 39,000
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>MOP PRO</td>
                            <td>For Class 8th</td>
                            <td>MOP BASIC+NMTC</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1800"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 8th",
                                      courseType: "MOP BASIC+NMTC",
                                      amount: "1800",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="16,800 "
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 8th",
                                      courseType: "MOP BASIC+NMTC",
                                      amount: "16,800",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 16,800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="33,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 8th",
                                      courseType: "MOP BASIC+NMTC",
                                      amount: "33,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 33,000
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="44,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 8th",
                                      courseType: "MOP BASIC+NMTC",
                                      amount: "44,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 44,000
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>NTSE BASIC</td>
                            <td>For Class 9th</td>
                            <td>MATHS and SCIENCE OLYMPIAD</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1200"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "NTSE BASIC",
                                      className: "For Class 9th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "1200",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1200
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="12,600"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "NTSE BASIC",
                                      className: "For Class 9th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "12,600",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 12,600
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="28,0000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "NTSE BASIC",
                                      className: "For Class 9th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "28,0000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 28,0000
                              </label>
                            </td>

                            <td className="text-center">NA</td>
                          </tr>
                          <tr>
                            <td>NTSE PRO</td>
                            <td>For Class 9th</td>
                            <td>NTSE BASIC+PRMO</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1800"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For class 9th",
                                      courseType: "NTSE BASIC+PRMO",
                                      amount: "1800",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="16,800 "
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 9th",
                                      courseType: "NTSE BASIC+PRMO",
                                      amount: "16,800",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 16,800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="33,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 9th",
                                      courseType: "NTSE BASIC+PRMO",
                                      amount: "33,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 33,000
                              </label>
                            </td>

                            <td className="text-center">NA</td>
                          </tr>
                          <tr>
                            <td>NTSE PRO</td>
                            <td>For Class 9th</td>
                            <td>NTSE BASIC+PRMO</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1800"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "IJSO BASIC",
                                      className: "For Class 9th",
                                      courseType: "IJSO",
                                      amount: "10,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="16,800 "
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "IJSO BASIC",
                                      className: "For Class 9th",
                                      courseType: "IJSO",
                                      amount: "10,500",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 16,800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="33,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "IJSO BASIC",
                                      className: "For Class 9th",
                                      courseType: "IJSO",
                                      amount: "19,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 19,000
                              </label>
                            </td>

                            <td className="text-center">NA</td>
                          </tr>
                          <tr>
                            <td>NTSE PRO</td>
                            <td>For Class 9th</td>
                            <td>NTSE BASIC+PRMO</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1200"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "IJSO PRO",
                                      className: "For Class 9th",
                                      courseType: "IJSO+PRMO",
                                      amount: "12,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="14,000 "
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "IJSO PRO",
                                      className: "For Class 9th",
                                      courseType: "IJSO+PRMO",
                                      amount: "16,800",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 16,800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="27,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "IJSO PRO",
                                      className: "For Class 9th",
                                      courseType: "IJSO+PRMO",
                                      amount: "27,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 27,000
                              </label>
                            </td>

                            <td className="text-center">NA</td>
                          </tr>
                          <tr>
                            <td>NTSE BASIC</td>
                            <td>For Class 10th</td>
                            <td>MATHS and SCIENCE OLYMPIAD</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1200"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "NTSE BASIC",
                                      className: "For Class 10th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "1200",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1200
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="12,600"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "NTSE BASIC",
                                      className: "For Class 10th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "12,600",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 12,600
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="28,0000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "NTSE BASIC",
                                      className: "For Class 10th",
                                      courseType: "MATHS and SCIENCE OLYMPIAD",
                                      amount: "28,0000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 28,0000
                              </label>
                            </td>

                            <td className="text-center">NA</td>
                          </tr>
                          <tr>
                            <td>NTSE PRO</td>
                            <td>For Class 10th</td>
                            <td>NTSE BASIC+PRMO</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1800"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 10th",
                                      courseType: "NTSE BASIC+PRMO",
                                      amount: "1800",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="16,800 "
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 10th",
                                      courseType: "NTSE BASIC+PRMO",
                                      amount: "16,800",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 16,800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="33,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "MOP BASIC",
                                      className: "For Class 10th",
                                      courseType: "NTSE BASIC+PRMO",
                                      amount: "33,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 33,000
                              </label>
                            </td>

                            <td className="text-center">NA</td>
                          </tr>
                          <tr>
                            <td>NTSE PRO</td>
                            <td>For Class 10th</td>
                            <td>NTSE BASIC+PRMO</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1800"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "IJSO BASIC",
                                      className: "For Class 10th",
                                      courseType: "IJSO",
                                      amount: "10,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="16,800 "
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "IJSO BASIC",
                                      className: "For Class 10th",
                                      courseType: "IJSO",
                                      amount: "10,500",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 16,800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="33,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "IJSO BASIC",
                                      className: "For Class 10th",
                                      courseType: "IJSO",
                                      amount: "19,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 19,000
                              </label>
                            </td>

                            <td className="text-center">NA</td>
                          </tr>
                          <tr>
                            <td>NTSE PRO</td>
                            <td>For Class 10th</td>
                            <td>NTSE BASIC+PRMO</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="1200"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "IJSO PRO",
                                      className: "For Class 10th",
                                      courseType: "IJSO+PRMO",
                                      amount: "12,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 1800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="14,000 "
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "IJSO PRO",
                                      className: "For Class 10th",
                                      courseType: "IJSO+PRMO",
                                      amount: "14,00",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 16,800
                              </label>
                            </td>

                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="27,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "IJSO PRO",
                                      className: "For Class 10th",
                                      courseType: "IJSO+PRMO",
                                      amount: "27,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 27,000
                              </label>
                            </td>

                            <td className="text-center">NA</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="open">
                    <div className="table-responsive custom-table">
                      <table className="table table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>Target</th>
                            <th>Class </th>
                            <th>Course Type</th>
                            <th>Buy Now</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>NMTC</td>
                            <td>For Class 5th</td>
                            <td>NMTC PRIMARY</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="5,600"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "NMTC",
                                      className: "For Class 5th",
                                      courseType: "NMTC PRIMARY",
                                      amount: "5,600",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 5,600
                              </label>
                            </td>
                          </tr>

                          <tr>
                            <td>NMTC</td>
                            <td>For Class 6th</td>
                            <td>NMTC PRIMARY</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="5,600"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "NMTC",
                                      className: "For Class 6th",
                                      courseType: "NMTC PRIMARY",
                                      amount: "5,600",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 5,600
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>SUB JUNIOR BASIC</td>
                            <td>For Class 7th</td>
                            <td>NMTC SUB JUNIOR</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="6,300"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "SUB JUNIOR BASIC",
                                      className: "For class 7th",
                                      courseType: "NMTC SUB JUNIOR",
                                      amount: "6,300",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 6,300
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>SUB JUNIOR PLUS</td>
                            <td>For Class 7th</td>
                            <td>SUB JUNIOR+NMTC PRIMARY</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="6,300"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "SUB JUNIOR PLUS",
                                      className: "For Class 7th",
                                      courseType: "SUB JUNIOR+NMTC PRIMARY",
                                      amount: "6,300",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 7,700
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>SUB JUNIOR BASIC</td>
                            <td>For Class 8th</td>
                            <td>NMTC SUB JUNIOR</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="6,300"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "SUB JUNIOR BASIC",
                                      className: "For Class 8th",
                                      courseType: "NMTC SUB JUNIOR",
                                      amount: "6,300",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 6,300
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>SUB JUNIOR PLUS</td>
                            <td>For Class 8th</td>
                            <td>SUB JUNIOR+NMTC PRIMARY</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	7,700"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "SUB JUNIOR PLUS",
                                      className: "For Class 8th",
                                      courseType: "SUB JUNIOR+NMTC PRIMARY",
                                      amount: "	7,700",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 7,700
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>PRMO BASIC</td>
                            <td>For Class 9th</td>
                            <td>PRMO</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	9,800"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "PRMO BASIC",
                                      className: "For Class 9th",
                                      courseType: "PRMO",
                                      amount: "	9,800",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 9,800
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>PRMO PRO (PLUS)</td>
                            <td>For Class 9th</td>
                            <td>PRMO+SUB JUNIOR BASIC</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 11,900"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "PRMO PRO (PLUS)",
                                      className: "For Class 9th",
                                      courseType: "PRMO+SUB JUNIOR BASIC",
                                      amount: "	 11,900",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 11,900
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>PRMO BASIC</td>
                            <td>For Class 10th</td>
                            <td>PRMO</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	9,800"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "PRMO BASIC",
                                      className: "For Class 10th",
                                      courseType: "PRMO",
                                      amount: "	9,800",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 9,800
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>PRMO PRO (PLUS)</td>
                            <td>For Class 10th</td>
                            <td>PRMO+SUB JUNIOR BASIC</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 11,900"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "PRMO PRO (PLUS)",
                                      className: "For Class 10th",
                                      courseType: "PRMO+SUB JUNIOR BASIC",
                                      amount: "	 11,900",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 11,900
                              </label>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="inprogress">
                    <div className="table-responsive custom-table">
                      <table className="table table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>Target Exam</th>
                            <th>Course Name</th>
                            <th>Class</th>
                            <th>Course Type</th>
                            <th>Buy Now</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Class 6 SCHOOL EXAM</td>
                            <td>NCERT</td>
                            <td>For Class 6th</td>
                            <td>Online</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 10,500"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "PRMO PRO (PLUS)",
                                      className: "For Class 6th",
                                      courseType: "Online",
                                      amount: "	 10,500",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 10,500
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>Class 7 SCHOOL EXAM</td>
                            <td>NCERT</td>
                            <td>For Class 7th</td>
                            <td>Online</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 10,500"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "PRMO PRO (PLUS)",
                                      className: "For Class 7th",
                                      courseType: "Online",
                                      amount: "	 10,500",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 10,500
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>Class 8 SCHOOL EXAM</td>
                            <td>NCERT</td>
                            <td>For Class 8th</td>
                            <td>Online</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 10,500"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "class 8 SCHOOL EXAM",
                                      className: "For Class 8th",
                                      courseType: "Online",
                                      amount: "	 10,500",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 10,500
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>Class 9 SCHOOL EXAM</td>
                            <td>NCERT</td>
                            <td>For Class 9th</td>
                            <td>Online</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 14,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "Class 9 SCHOOL EXAM",
                                      className: "For Class 9th",
                                      courseType: "Online",
                                      amount: "	 14,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 14,000
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>Class 10 SCHOOL EXAM</td>
                            <td>NCERT</td>
                            <td>For Class 10th</td>
                            <td>Online</td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 14,000"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "Class 10 SCHOOL EXAM",
                                      className: "For Class 10th",
                                      courseType: "Online",
                                      amount: "	 14,000",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 14,000
                              </label>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="closed">
                    <div className="table-responsive custom-table">
                      <table className="table table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>SUBJECTS</th>
                            <th>Target Exam</th>
                            <th>Course Type</th>
                            <th>Class</th>
                            <th>6 MONTH</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Science Maths and MAT</td>
                            <td>
                              Maths Olympiad + Science Olympiad + Reasoning &
                              Aptitude Olympiad <br />
                              (IOM, IMO, NIMO, UIMO, IOS, NSO, NSTSE, NINO,
                              NISO, STSE, STEM, ARO, IRAO)
                            </td>

                            <td>Online</td>
                            <td>Class 6th </td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 690"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "Science Maths and MAT",
                                      className: "Class 6th",
                                      courseType: "Online",
                                      amount: "699",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 699
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>English, Hindi, SST and MAT</td>
                            <td>
                              Language Olympiad + Social Studies Olympiad +
                              Reasoning & Aptitude Olympiad
                              <br />
                              (ABHO, IOEL, IEO(SOF), IEO(EHF), UIEO, Silver Zone
                              - ISSO, SOF -ISSO, IRAO,ARO)
                            </td>

                            <td>Online</td>
                            <td>Class 6th </td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 690"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "English, Hindi, SST and MAT",
                                      className: "Class 6th",
                                      courseType: "Online",
                                      amount: "699",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 699
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>Science Maths and MAT</td>
                            <td>
                              Maths Olympiad + Science Olympiad + Reasoning &
                              Aptitude Olympiad <br />
                              (IOM, IMO, NIMO, UIMO, IOS, NSO, NSTSE, NINO,
                              NISO, STSE, STEM, ARO, IRAO)
                            </td>

                            <td>Online</td>
                            <td>Class 7th </td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 690"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "Science Maths and MAT",
                                      className: "Class 6th",
                                      courseType: "Online",
                                      amount: "699",
                                    })
                                  }
                                />
                                <span className="checkmark"></span>699
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>English, Hindi, SST and MAT</td>
                            <td>
                              Language Olympiad + Social Studies Olympiad +
                              Reasoning & Aptitude Olympiad
                              <br />
                              (ABHO, IOEL, IEO(SOF), IEO(EHF), UIEO, Silver Zone
                              - ISSO, SOF -ISSO, IRAO,ARO)
                            </td>

                            <td>Online</td>
                            <td>Class 7th </td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 699"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "English, Hindi, SST and MAT",
                                      className: "Class 7th",
                                      courseType: "Online",
                                      amount: "699",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 699
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>Science Maths and MAT</td>
                            <td>
                              Maths Olympiad + Science Olympiad + Reasoning &
                              Aptitude Olympiad <br />
                              (IOM, IMO, NIMO, UIMO, IOS, NSO, NSTSE, NINO,
                              NISO, STSE, STEM, ARO, IRAO)
                            </td>

                            <td>Online</td>
                            <td>Class 8th </td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 690"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "Science Maths and MAT",
                                      className: "Class 8th",
                                      courseType: "Online",
                                      amount: "699",
                                    })
                                  }
                                />
                                <span className="checkmark"></span>699
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>English, Hindi, SST and MAT</td>
                            <td>
                              Language Olympiad + Social Studies Olympiad +
                              Reasoning & Aptitude Olympiad
                              <br />
                              (ABHO, IOEL, IEO(SOF), IEO(EHF), UIEO, Silver Zone
                              - ISSO, SOF -ISSO, IRAO,ARO)
                            </td>

                            <td>Online</td>
                            <td>Class 8th </td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 699"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "English, Hindi, SST and MAT",
                                      className: "Class 8th",
                                      courseType: "Online",
                                      amount: "699",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 699
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>Science Maths and MAT</td>
                            <td>
                              Maths Olympiad + Science Olympiad + Reasoning &
                              Aptitude Olympiad <br />
                              (IOM, IMO, NIMO, UIMO, IOS, NSO, NSTSE, NINO,
                              NISO, STSE, STEM, ARO, IRAO)
                            </td>

                            <td>Online</td>
                            <td>Class 9th </td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 690"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "Science Maths and MAT",
                                      className: "Class 9th",
                                      courseType: "Online",
                                      amount: "699",
                                    })
                                  }
                                />
                                <span className="checkmark"></span>699
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>English, Hindi, SST and MAT</td>
                            <td>
                              Language Olympiad + Social Studies Olympiad +
                              Reasoning & Aptitude Olympiad
                              <br />
                              (ABHO, IOEL, IEO(SOF), IEO(EHF), UIEO, Silver Zone
                              - ISSO, SOF -ISSO, IRAO,ARO)
                            </td>

                            <td>Online</td>
                            <td>Class 9th </td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 699"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "English, Hindi, SST and MAT",
                                      className: "Class 9th",
                                      courseType: "Online",
                                      amount: "699",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 699
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>Science Maths and MAT</td>
                            <td>
                              Maths Olympiad + Science Olympiad + Reasoning &
                              Aptitude Olympiad <br />
                              (IOM, IMO, NIMO, UIMO, IOS, NSO, NSTSE, NINO,
                              NISO, STSE, STEM, ARO, IRAO)
                            </td>

                            <td>Online</td>
                            <td>Class 10th </td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 690"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "Science Maths and MAT",
                                      className: "Class 10th",
                                      courseType: "Online",
                                      amount: "699",
                                    })
                                  }
                                />
                                <span className="checkmark"></span>699
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>English, Hindi, SST and MAT</td>
                            <td>
                              Language Olympiad + Social Studies Olympiad +
                              Reasoning & Aptitude Olympiad
                              <br />
                              (ABHO, IOEL, IEO(SOF), IEO(EHF), UIEO, Silver Zone
                              - ISSO, SOF -ISSO, IRAO,ARO)
                            </td>

                            <td>Online</td>
                            <td>Class 10th </td>
                            <td>
                              <label className="radio-inline custom_radio me-4">
                                <input
                                  type="radio"
                                  name="optradio"
                                  value="	 699"
                                  onClick={() =>
                                    handleShow({
                                      targetExam: "English, Hindi, SST and MAT",
                                      className: "Class 10th",
                                      courseType: "Online",
                                      amount: "699",
                                    })
                                  }
                                />
                                <span className="checkmark"></span> 699
                              </label>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Modal
                        show={show}
                        onHide={handleClose}
                        className="modal-olympiad"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            <span className="text-white text-center">
                              Course Details
                            </span>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>
                            <strong className="text-white">
                              Target Exam:{" "}
                            </strong>{" "}
                            <span className="text-yellow">
                              {" "}
                              {selectedDetails.targetExam}
                            </span>
                          </p>
                          <p>
                            <strong className="text-white">Class: </strong>{" "}
                            <span className="text-yellow">
                              {" "}
                              {selectedDetails.className}
                            </span>
                          </p>
                          <p>
                            <strong className="text-white">Course Type:</strong>{" "}
                            <span className="text-yellow">
                              {" "}
                              {selectedDetails.courseType}
                            </span>
                          </p>
                          <p>
                            <strong className="text-white">
                              Selected Amount:
                            </strong>{" "}
                            <span className="text-yellow">
                              ₹ {selectedDetails.amount}
                            </span>
                          </p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => alert("Proceed to Payment")}
                          >
                            Proceed to Pay
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card content-sec">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12">
                <h2 className="subs-title">Olympiads Details</h2>
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
                  Olympiads Details Tab
                </Link>
              </h6>
              <div id="collapseOne" className="card-collapse collapse">
                <div className="settings-widget card-details">
                  <div className="settings-menu p-0">
                    <div className="checkout-form">
                      <div className="tab-content">
                        <div className="tab-pane show active" id="today">
                          <div className="table-responsive custom-table">
                            <table className="table table-nowrap mb-0">
                              <thead>
                                <tr>
                                  <th>Conducting Body</th>
                                  <th>OLYMPIAD</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Silver Zone</td>
                                  <td>
                                    <div className="mb-2">
                                      IOM (International Olympiad of
                                      Mathematics)
                                    </div>
                                    <div className="mb-2">
                                      IOS (International Olympiad of Science)
                                    </div>
                                    <div className="mb-2">
                                      ABHO (Akhil Bhartiya Hindi Olympiad)
                                    </div>
                                    <div className="mb-2">
                                      IOEL (International Olympiad of English
                                      Language)
                                    </div>
                                    <div className="mb-2">
                                      ISSO (International Social Science
                                      Olympiad)
                                    </div>
                                    <div className="mb-2">
                                      IRAO (International Reasoning and Aptitude
                                      Olympiad)
                                    </div>
                                    <div className="mb-2">
                                      STEM (Science, technology, Engineering and
                                      Mathematics Olympiad)
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>SOF</td>
                                  <td>
                                    <div className="mb-2">
                                      IMO (International Mathematics Olympiad)
                                    </div>
                                    <div className="mb-2">
                                      NSO (National Science Olympiad)
                                    </div>
                                    <div className="mb-2">
                                      IEO (International English Olympiad){" "}
                                    </div>
                                    <div className="mb-2">
                                      ISSO (International Social Studies
                                      Olympiad)
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>EHF</td>
                                  <td>
                                    <div className="mb-2">
                                      NIMO (National Interactive Math Olympiad){" "}
                                    </div>
                                    <div className="mb-2">
                                      NINO (National IIT-NEET Olympiad)
                                    </div>
                                    <div className="mb-2">
                                      NISO (National Interactive Science
                                      Olympiad)
                                    </div>
                                    <div className="mb-2">
                                      IEO (International English Olympiad)
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Unified Council</td>
                                  <td>
                                    <div className="mb-2">
                                      UIMO (Unified International Mathematics
                                      Olympiad){" "}
                                    </div>
                                    <div className="mb-2">
                                      NSTSE (National Level Science Talent
                                      Search Examination)
                                    </div>
                                    <div className="mb-2">
                                      UIEO (Unified International English
                                      Olympiad)
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Humming Bird</td>
                                  <td>ARO (Aptitude & reasoning olympiad)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  Subjects covered under micro courses are
                </Link>
              </h6>
              <div id="course2" className="card-collapse collapse">
                <div className="award-list jee-award-list d-flex align-items-center">
                  <span className="award-icon jee-icon">
                    <LuArrowUpRightFromCircle className="iconCheckDone  arrow-icon-jee text-skyblue" />
                  </span>
                  <p>
                    Subjects covered under micro courses are- Science,
                    Mathematics, MAT, SST & Language
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
                  Services provided under micro courses
                </Link>
              </h6>
              <div id="course3" className="card-collapse collapse">
                <div className="award-list jee-award-list d-flex align-items-center">
                  <span className="award-icon jee-icon">
                    <LuArrowUpRightFromCircle className="iconCheckDone  arrow-icon-jee text-skyblue" />
                  </span>
                  <p>
                    Services provided under micro courses- Recorded Lectures,
                    Online Study Material & Doubt chat support
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
                <h2 className="subs-title">Syllabus</h2>
              </div>
            </div>
            <div className="course-card">
              <h6 className="cou-title">
                <Link
                  className="collapsed"
                  data-bs-toggle="collapse"
                  to="#collapse011"
                  aria-expanded="false"
                >
                  NMTC PRIMARY
                </Link>
              </h6>
              <div id="collapse011" className="card-collapse collapse">
                <div className="settings-widget card-details">
                  <div className="settings-menu p-0">
                    <div className="checkout-form">
                      <div className="tab-content">
                        <div className="tab-pane show active" id="today">
                          <div className="table-responsive custom-table">
                            <table className="table table-nowrap mb-0">
                              <thead>
                                <tr>
                                  <th>Chapter Name</th>
                                  <th>No Of Lectures</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Basic Maths</td>
                                  <td>26</td>
                                </tr>

                                <tr>
                                  <td>Algebra</td>
                                  <td>17</td>
                                </tr>

                                <tr>
                                  <td>Geometry</td>
                                  <td>26</td>
                                </tr>
                                <tr>
                                  <td>Everyday Mathematics</td>
                                  <td>10</td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Total lectures</b>
                                  </td>
                                  <td>
                                    <b>79</b>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="course-card">
              <h6 className="cou-title">
                <Link
                  className="collapsed"
                  data-bs-toggle="collapse"
                  to="#course002"
                  aria-expanded="false"
                >
                  NMTC Sub Junior
                </Link>
              </h6>
              <div id="course002" className="card-collapse collapse">
                <div className="settings-widget card-details">
                  <div className="settings-menu p-0">
                    <div className="checkout-form">
                      <div className="tab-content">
                        <div className="tab-pane show active" id="today">
                          <div className="table-responsive custom-table">
                            <table className="table table-nowrap mb-0">
                              <thead>
                                <tr>
                                  <th>Chapter Name</th>
                                  <th>No Of Lectures</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Basic Maths</td>
                                  <td>26</td>
                                </tr>

                                <tr>
                                  <td>Algebra</td>
                                  <td>25</td>
                                </tr>

                                <tr>
                                  <td>Geometry</td>
                                  <td>34</td>
                                </tr>
                                <tr>
                                  <td>Everyday Mathematics</td>
                                  <td>10</td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Total lectures</b>
                                  </td>
                                  <td>
                                    <b>95</b>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="course-card">
              <h6 className="cou-title">
                <Link
                  className="collapsed"
                  data-bs-toggle="collapse"
                  to="#course003"
                  aria-expanded="false"
                >
                  PRMO{" "}
                </Link>
              </h6>
              <div id="course003" className="card-collapse collapse">
                <div className="settings-widget card-details">
                  <div className="settings-menu p-0">
                    <div className="checkout-form">
                      <div className="tab-content">
                        <div className="tab-pane show active" id="today">
                          <div className="table-responsive custom-table">
                            <table className="table table-nowrap mb-0">
                              <thead>
                                <tr>
                                  <th>Chapter Name</th>
                                  <th>No Of Lectures</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Number Theory</td>
                                  <td>21</td>
                                </tr>

                                <tr>
                                  <td>Algebra</td>
                                  <td>34</td>
                                </tr>

                                <tr>
                                  <td>Geometry</td>
                                  <td>33</td>
                                </tr>
                                <tr>
                                  <td>Basic Maths</td>
                                  <td>15</td>
                                </tr>
                                <tr>
                                  <td>Binomial Theorem</td>
                                  <td>5</td>
                                </tr>
                                <tr>
                                  <td>COMBINATORICS</td>
                                  <td>11</td>
                                </tr>
                                <tr>
                                  <td>Coordinate Geometry</td>
                                  <td>13</td>
                                </tr>

                                <tr>
                                  <td>Trigonometry</td>
                                  <td>12</td>
                                </tr>

                                <tr>
                                  <td>Coordinate Geometry</td>
                                  <td>9</td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Total lectures</b>
                                  </td>
                                  <td>
                                    <b>153</b>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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

        <div className="card content-sec">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12">
                <h2 className="subs-title">About Courses</h2>
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
                  {" "}
                  SRS Educares Program
                </Link>
              </h6>
              <div id="collapse1" className="card-collapse collapse">
                <div className="award-list jee-award-list d-flex align-items-center">
                  <p>
                    SRS Educares is dedicated to shaping the future of students
                    by providing top-tier coaching for academic excellence. Our
                    expert faculty offers personalized guidance and online
                    support, helping students build strong foundations for
                    Olympiad exams like the National & International Science
                    Olympiad and Mathematics Olympiad. With a focus on enhancing
                    analytical thinking and problem-solving skills, SRS Educares
                    prepares students for success in competitive exams,
                    fostering confidence and comprehensive understanding for
                    future challenges.
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
                  Math Olympiad Program
                </Link>
              </h6>
              <div id="course02" className="card-collapse collapse">
                <div className="award-list jee-award-list d-flex align-items-center">
                  <p>
                    Math Olympiad Program is designed for students to develop
                    their general mathematical ability according to the National
                    level, as Mathematics is the best way to sharp your brain.
                    Mathematical concepts are used to solve problems in science
                    & engineering, so they must be thought from the foundation
                    level, so students can clear important Mathematical
                    Olympiads like Indian Olympiad Qualifier In Mathematics
                    (IOQM) & International Math Olympiad (IMO).
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
                  SRS Educares provides NCERT Program
                </Link>
              </h6>
              <div id="course03" className="card-collapse collapse">
                <div className="award-list jee-award-list d-flex align-items-center">
                  <p>
                    SRS Educares provides a comprehensive learning platform that
                    covers the entire NCERT syllabus, ensuring students grasp
                    all essential topics. With our exclusive tuition classes,
                    students benefit from live interactive sessions and advanced
                    animated video lectures for a deeper understanding. Our
                    program is designed to boost academic performance, helping
                    students achieve excellent results through personalized
                    guidance and cutting-edge teaching methods. SRS Educares is
                    committed to elevating student success and making learning
                    engaging and effective.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OlympiadsclassName5;
