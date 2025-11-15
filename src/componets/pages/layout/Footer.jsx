import { Link } from "react-router-dom";
import { BsFillPinMapFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { MdPhoneIphone } from "react-icons/md";
import "../../../custom.css";
export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-top aos">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="footer-widget footer-about">
                  <div className="footer-logo">
                    <Link to="/">
                      {" "}
                      <img src="/assets/img/footer.png" alt="logo" />
                    </Link>
                  </div>
                  <div className="footer-about-content">
                    <p className="text-justify">
                      A premier Institute for JEE Advanced, JEE Main, NEET-UG,
                      CBSE, Foundation (Class 6 to 10) and other Prestigious
                      Exams like BITSAT, KVPY NTSE, Olympiads.
                    </p>

                    <div className="social-icon-three footer-social-icon-margin">
                      <ul>
                        <li>
                          <Link
                            to="https://www.facebook.com/srseducareskannauj/"
                            target="_blank"
                            className="feather-facebook-icon"
                          >
                            <i className="feather-facebook"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="https://x.com/i/flow/login?redirect_after_login=%2Fsrseducares"
                            target="_blank"
                            className="feather-twitter-icon"
                          >
                            <i className="feather-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="https://in.linkedin.com/company/srs-educares"
                            target="_blank"
                            className="feather-linkedin-icon"
                          >
                            <i className="feather-linkedin"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="https://www.youtube.com/c/SRSEducares"
                            target="_blank"
                            className="feather-youtube-icon"
                          >
                            <i className="feather-youtube"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="https://www.instagram.com/srseducares_agra/"
                            target="_blank"
                            className="feather-instagram-icon"
                          >
                            <i className="feather-instagram"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-6">
                <div className="footer-widget footer-menu">
                  <h2 className="footer-title">About Us</h2>
                  <ul>
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="">Careers</Link>
                    </li>
                    <li>
                      <Link to="/center">Centres</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-6">
                <div className="footer-widget footer-menu">
                  <h2 className="footer-title">Resources</h2>
                  <ul>
                    <li>
                      <Link to="#">Previous Papers</Link>
                    </li>
                    <li>
                      <Link to="#">News and Alerts</Link>
                    </li>
                    <li>
                      <Link to="#">FAQs</Link>
                    </li>
                    <li>
                      <Link to="#">Blogs</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="footer-widget footer-contact">
                  <h2 className="footer-title">Corporate Office</h2>

                  <div className="footer-contact-info">
                    <div className="footer-address">
                      <BsFillPinMapFill className="fs-2 text-skyblue footer-icon-contacts " />
                      <p>
                        {" "}
                        MCIIE, IIT (BHU),
                        <br /> Varanasi- 221005
                      </p>
                    </div>
                    <p>
                      <MdEmail className="fs-2 text-skyblue footer-icon-contacts " />

                      <Link
                        className="__cf_email__ text-white"
                        to="mailto:contact@srseducares.com"
                      >
                        contact@srseducares.com
                      </Link>
                    </p>
                    <p className="mb-0">
                      <Link
                        to="tel:+918543859644"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MdPhoneIphone className="fs-2 text-skyblue footer-icon-contacts " />
                        +918543859644
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="privacy-policy-three text-center ">
              <ul>
                <li>
                  <Link to="#">Terms & Condition</Link>
                </li>
                <li>
                  <Link to="#">Return & Refund Policy</Link>
                </li>
                <li>
                  <Link to="#">Privacy policy</Link>
                </li>
                <li>
                  <Link to="#">Cookies Policy</Link>
                </li>
              </ul>
            </div>

            <div className="copyright">
              <div className="row">
                <div className="col-md-12">
                  <div className="privacy-policy text-center">
                    <ul>
                      <li>
                        <Link to="/">SRS Educares Pvt. Ltd.</Link>
                      </li>
                      <li>
                        <Link to="/">© All Rights Reserved.</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
