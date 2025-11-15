import { Link } from "react-router-dom";
import "../../../Admin/AdminCSS.css";
import "../../../Admin/AdminJS.js";
const AdminHeader = () => {
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-skyblue">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="pushmenu"
              to="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="#" className="nav-link  text-white">
              SRS Educares
            </Link>
          </li>
        </ul>

        {/* <!-- Right navbar links --> */}
        <ul className="navbar-nav ml-auto">
          {/* <!-- Messages Dropdown Menu --> */}
          <li className="nav-item dropdown">
            <Link className="nav-link" data-toggle="dropdown" to="#">
              <img
                src="/assets/img/teams/1.jpeg"
                className="img-fluid rounded-circle srs-super-admin-img"
                alt="srs education"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <Link to="#" className="dropdown-item">
                <div className="media">
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Logout
                      <span className="float-right text-sm text-danger">
                        <i className="fas fa-star"></i>
                      </span>
                    </h3>
                  </div>
                </div>
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="#" className="dropdown-item">
                <div className="media">
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Change Password
                      <span className="float-right text-sm text-muted">
                        <i className="fas fa-star"></i>
                      </span>
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link" data-toggle="dropdown" to="#">
              <i className="far fa-bell"></i>
              <span className="badge badge-warning navbar-badge">15</span>
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">
                15 Notifications
              </span>
              <div className="dropdown-divider"></div>
              <Link to="#" className="dropdown-item">
                <i className="fas fa-envelope mr-2"></i> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="#" className="dropdown-item">
                <i className="fas fa-users mr-2"></i> 8 friend requests
                <span className="float-right text-muted text-sm">12 hours</span>
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="#" className="dropdown-item">
                <i className="fas fa-file mr-2"></i> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="#" className="dropdown-item dropdown-footer">
                See All Notifications
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default AdminHeader;
