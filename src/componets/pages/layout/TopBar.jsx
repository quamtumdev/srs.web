import { Link } from "react-router-dom";
import QuickEnquiry from "../../Enquiry/QuickEnquiry";
import "../../../custom.css";
import StudentLoginButton from "../StudentLoginButton";
const TopBar = () => {
  return (
    <div className="top-bg-header py-2 top-border-custom">
      <div className="container d-flex justify-content-between">
        {/* Left side: College Predictor link */}
        <div className="col-md-4 d-flex align-items-center">
          <QuickEnquiry />
          <Link to="/college-predictor" className=" colleagePredictor-btn">
            College Predictor
          </Link>
        </div>
        <div className="col-md-4 d-flex align-items-center">
          <StudentLoginButton />
        </div>

        {/* Right side: Social icons */}
        <div className="col-md-4 d-flex justify-content-end">
          <div className="social-icon-five top-header-social-icon">
            <ul className="nav">
              <li>
                <Link
                  to="https://www.facebook.com/srseducareskannauj/"
                  target="_blank"
                  className="facebook-icon"
                >
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="https://x.com/i/flow/login?redirect_after_login=%2Fsrseducares"
                  target="_blank"
                  className="twitter-icon"
                >
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="https://in.linkedin.com/company/srs-educares"
                  target="_blank"
                  className="linked-icon"
                >
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </li>

              <li>
                <Link
                  to="https://www.youtube.com/c/SRSEducares"
                  target="_blank"
                  className="youtube-icon"
                >
                  <i className="fab fa-youtube"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.instagram.com/srseducares_agra/"
                  target="_blank"
                  className="instagram-icon"
                >
                  <i className="feather-instagram"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
