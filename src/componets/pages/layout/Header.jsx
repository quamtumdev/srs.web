import { Link } from "react-router-dom";
import { Login } from "../Login";
import MobileQuickEnquiry from "../../Enquiry/MobileQuickEnquiry";
import { MobileLogin } from "../../Login-UI/MobileLogin";
import "../../../custom.css";

export const Header = () => {
  return (
    <>
      <div>
        <header className="header-three">
          <div className="header-fixed-three header-fixed">
            <nav className="navbar navbar-expand-lg header-nav-three scroll-sticky">
              <div className="container">
                <div className="navbar-header">
                  <Link id="mobile_btn" to="#">
                    <span className="bar-icon">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </Link>
                  <Link to="/" className="navbar-brand logo">
                    <img
                      src="/assets/img/logo/logo.png"
                      className="img-fluid logo-header"
                      alt="Logo"
                    />
                  </Link>
                </div>
                <div className="main-menu-wrapper">
                  <div className="menu-header">
                    <Link to="/" className="menu-logo menu-logo-sidebar">
                      <img
                        src="/assets/img/logo/logo.png"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </Link>
                    <Link id="menu_close" className="menu-close" to="#">
                      <i className="fas fa-times"></i>
                    </Link>
                  </div>
                  <ul className="main-nav mobile-main-nav">
                    <li className="has-submenu active">
                      <Link to="#">
                        About <i className="fas fa-chevron-down"></i>
                      </Link>
                      <ul className="submenu">
                        <li>
                          <Link to="/about">About SRS Educares</Link>
                        </li>
                        <li>
                          <Link to="/founder-msg">Founder&apos;s Message</Link>
                        </li>
                        <li>
                          <Link to="/vision-mission">Vision & Mission</Link>
                        </li>
                        <li>
                          <Link to="/why-srs-educares">Why SRS Educares</Link>
                        </li>
                        <li>
                          <Link to="/teaching-methodolgy">
                            Teaching Methodology
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <Link to="#">
                        ClassRoom <i className="fas fa-chevron-down"></i>
                      </Link>
                      <ul className="submenu">
                        <li>
                          <Link to="/jeeclass11">JEE(Main + Advanced)</Link>
                        </li>
                        <li>
                          <Link to="/neetclass11">Medical(NEET)</Link>
                        </li>

                        <li>
                          <Link to="/olympiad-batch">
                            Foundation(Class IX & X)
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <Link to="#">
                        Exams <i className="fas fa-chevron-down"></i>
                      </Link>
                      <ul className="submenu first-submenu">
                        <li>
                          <Link to="#">JEE(Advanced)</Link>
                        </li>
                        <li>
                          <Link to="#">JEE(MAIN)</Link>
                        </li>
                        <li>
                          <Link to="#">BITSAT</Link>
                        </li>
                        <li>
                          <Link to="#">NEET-UG</Link>
                        </li>

                        <li>
                          <Link to="#">Olympiads</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <Link to="#">
                        SIP <i className="fas fa-chevron-down"></i>
                      </Link>
                      <ul className="submenu">
                        <li>
                          <Link to="/sip">SIP</Link>
                        </li>
                        <li>
                          <Link to="/center">Assessment Centre</Link>
                        </li>
                      </ul>
                    </li>

                    <li className="has-submenu">
                      <Link to="#">Blogs</Link>
                    </li>
                    <li className="has-submenu">
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    {/* <li className="has-submenu">
                      <Link to="/student/dashboard">Student Corner</Link>
                    </li> */}
                    <li className="nav-item d-btn-lg d-lg-none d-xl-none d-md-none">
                      <Link
                        className="nav-link login-three-head button mobile-login-btn-screen"
                        to="#"
                        style={{ padding: "8px 10px 8px 10px" }}
                      >
                        <span>Scholarship Test</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <ul className="nav header-navbar-rht align-items-center">
                  <li className="nav-item">
                    <Link
                      className="nav-link btn submit-btn scholarship-test-btn"
                      to="#"
                    >
                      <span>&nbsp;&nbsp;Scholarship Test</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Login />
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <MobileQuickEnquiry />
      <MobileLogin />
    </>
  );
};
