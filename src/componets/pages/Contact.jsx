import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaMapLocation } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Map } from "../map/Map";
import "../../custom.css";
export const Contact = () => {
  return (
    <>
      <section>
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100 img-fluid vision-mission-slider-img"
                src="/assets/img/about/contact.jpg"
                alt="First slide"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="home-three-trending">
        <div className="container mt-3 pt-5">
          <div className="row">
            <div className=" home-three-head  section-title-center section-header-titler section-header-title">
              <div className="row align-items-center d-flex justify-content-between sip-adv-title">
                <div className="col-lg-12">
                  <h2 className="text-capitalize">
                    Your Connection, Our Top Priority
                  </h2>
                </div>
              </div>
            </div>
            <div className="sip-adv-owl-carousel home-three-trending-course owl-theme">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-sip-adv-height trending-bg-one">
                      <div className="course-title-one sid-adv-icon-title">
                        <MdOutlinePermPhoneMsg />
                      </div>
                      <div className="trending-three-text trending-text-sip-adv">
                        <h3 className="title instructor-text text-light">
                          Reach Us Now !
                        </h3>
                        <p className="text-light">
                          <Link
                            to="tel:+918543859644"
                            className="text-center text-light fs-4"
                          >
                            <b> +918543859644</b>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-sip-adv-height trending-bg-two">
                      <div className="course-title-one  sid-adv-icon-title">
                        <MdOutlineMailOutline />
                      </div>
                      <div className="trending-three-text  trending-text-sip-adv">
                        <h3 className="title instructor-text text-light">
                          Email Us Anytime !
                        </h3>
                        <p className="text-light">
                          <Link
                            to="mailto:director@srseducares.com"
                            className="text-center text-light fs-4"
                          >
                            director@srseducares.com
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="trending-three-item">
                    <div className="trending-content-top trending-sip-adv-height trending-bg-three">
                      <div className="course-title-one sid-adv-icon-title">
                        <FaMapLocation />
                      </div>
                      <div className="trending-three-text  trending-text-sip-adv">
                        <h3 className="title instructor-text text-light">
                          Visit Us Here !
                        </h3>
                        <p className="sip-adv-p text-light fs-4">
                          RS Global Building, Near Golkuwa, Kannauj- 209727,
                          Uttar Pradesh India
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
      <div className="container">
        <div className="row justify-content-center d-flex">
          <div className="col-lg-8">
            <div className="card comment-sec border-radius-contact-form-custom">
              <div className="card-body">
                <h5 className="subs-title text-dark">
                  Feel Free To Contact Us{" "}
                </h5>
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-block">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input-block">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="input-block">
                    <select name="course" className="form-control" required>
                      <option value="">Select Course</option>
                      <option selected>NEET 1 YEAR COURSE (IMPULSE)</option>
                      <option>NEET 2 YEAR COURSE (AGILE)</option>
                      <option>NEET 3 YEAR COURSE (EDGE)</option>
                      <option>NEET 4 YEAR COURSE (SEED)</option>
                      <option>
                        JEE (Main + Advanced) 1 Year Course (IMPULSE)
                      </option>
                      <option>
                        JEE (Main + Advanced) 2 Year Course (AGILE)
                      </option>
                      <option>
                        JEE (Main + Advanced) 3-Year Course (EDGE)
                      </option>
                      <option>
                        JEE (Main + Advanced) 4-Year Course (SEED)
                      </option>
                      <option>
                        Foundation (Class X) 1 Year / 3 Year Course (EDGE)
                      </option>
                      <option>
                        Foundation (Class IX) 1 Year / 2 Year / 4 Year Course
                        (SEED)
                      </option>
                      <option>NEET 1 YEAR COURSE (EMERGE)</option>
                      <option>
                        JEE (Main + Advanced) 1 Year Course (EMERGE)
                      </option>
                      <option>Crash Course</option>
                      <option>Test Series Course</option>
                      <option>MTSE</option>
                    </select>
                  </div>
                  <div className="input-block">
                    <textarea
                      rows="4"
                      className="form-control"
                      placeholder="Your Comments"
                    ></textarea>
                  </div>
                  <div className="submit-section">
                    <button className="btn submit-btn" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Map />
    </>
  );
};
