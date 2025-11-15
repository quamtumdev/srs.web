import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TbAccessPoint } from "react-icons/tb";
import { PiSlideshow } from "react-icons/pi";
import { RiGuideLine } from "react-icons/ri";
import { MdOutlineStream } from "react-icons/md";
import { MdSubject } from "react-icons/md";
import { MdOutlineTopic } from "react-icons/md";
import { CiSquareQuestion } from "react-icons/ci";
import { RiExportFill } from "react-icons/ri";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { PiExam } from "react-icons/pi";
import { MdLibraryBooks } from "react-icons/md";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaAlignCenter } from "react-icons/fa";
import { IoTimerSharp } from "react-icons/io5";
import { VscOutput } from "react-icons/vsc";
import { AiOutlineFundView } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineQueryStats } from "react-icons/md";
import { BiSolidUserVoice } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";

import "../../../Admin/AdminCSS.css";
import "../../../Admin/AdminJS.js";
const AdminSidebar = () => {
  return (
    <>
      <Link to="/admin" className="brand-link">
        <img
          src="/assets/img/logo/logo.png"
          alt="AdminLTE Logo"
          className="logo-super-admin"
        />
      </Link>

      {/* <!-- Sidebar --> */}
      <div className="sidebar">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item has-treeview">
              <Link to="#" className="nav-link">
                <MdOutlineDashboard className=" nav-icon" />
                <p>Dashboard Module</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <MdAdminPanelSettings className=" nav-icon" />
                <p>
                  Manage Admins
                  {/* <span className="right badge badge-danger">New</span> */}
                </p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="#" className="nav-link">
                <FaChalkboardTeacher className=" nav-icon" />

                <p>
                  Manage Teachers
                  {/* <i className="fas fa-angle-left right"></i>
                  <span className="badge badge-info right">6</span> */}
                </p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="#" className="nav-link">
                <TbAccessPoint className=" nav-icon" />
                <p>
                  Role & Permissions
                  {/* <i className="right fas fa-angle-left"></i> */}
                </p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/study-material" className="nav-link">
                <FaBookOpenReader className=" nav-icon" />

                <p>
                  Study Material
                  {/* <i className="right fas fa-angle-left"></i> */}
                </p>
              </Link>
            </li>

            <li className="nav-item has-treeview">
              <Link href="#" className="nav-link">
                <i className="nav-icon fa fa-check-circle"></i>
                <p>
                  Test Management
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/admin/ManageTests" className="nav-link">
                    <i className="fa fa-list nav-icon"></i>
                    <p>Manage Tests</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/ManageQuestions" className="nav-link">
                    <i className="fa fa-bar-chart nav-icon"></i>
                    <p>Manage Questions</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <Link to="#" className="nav-link">
                <PiSlideshow className=" nav-icon" />
                <p>Slider Management</p>
              </Link>
              {/* <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="UI/general.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>General</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="UI/icons.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Icons</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="UI/buttons.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Buttons</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="UI/sliders.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Sliders</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="UI/modals.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Modals & Alerts</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="UI/navbar.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Navbar & Tabs</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="UI/timeline.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Timeline</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="UI/ribbons.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Ribbons</p>
                  </Link>
                </li>
              </ul> */}
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/guidelines" className="nav-link">
                <RiGuideLine className=" nav-icon" />
                <p>Guidelines</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/students" className="nav-link">
                <RiGuideLine className=" nav-icon" />
                <p>Students</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/streams" className="nav-link">
                <MdOutlineStream className=" nav-icon" />
                <p>Stream</p>
              </Link>
            </li>

            <li className="nav-item has-treeview">
              <Link to="/admin/subjects" className="nav-link">
                <MdSubject className=" nav-icon" />

                <p>Subject</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/topics" className="nav-link">
                <MdOutlineTopic className=" nav-icon" />

                <p>Topics</p>
              </Link>
            </li>

            <li className="nav-item has-treeview">
              <Link to="/admin/questions" className="nav-link">
                <CiSquareQuestion className="nav-icon" />
                <p>Questions</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="#" className="nav-link">
                <RiExportFill className="nav-icon" />{" "}
                <p>Import/Export Questions</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/test-series" className="nav-link">
                <FaRegNoteSticky className="nav-icon" />
                <p>Test Series</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/test-list" className="nav-link">
                <FaRegNoteSticky className="nav-icon" /> <p>Tests</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/marking-scheme" className="nav-link">
                <FaBookmark className="nav-icon" />
                <p>Marking Scheme</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/exams" className="nav-link">
                <PiExam className="nav-icon" /> <p>Examination</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/tests" className="nav-link">
                <MdLibraryBooks className="nav-icon" />
                <p>Test Type</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/skills" className="nav-link">
                <MdLibraryBooks className="nav-icon" />
                <p>Skills</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/tag" className="nav-link">
                <MdLibraryBooks className="nav-icon" />
                <p>Tags</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/difficulty-levels" className="nav-link">
                <SiLevelsdotfyi className="nav-icon" />
                <p>Difficulty Level</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/admin/users" className="nav-link">
                <FaAlignCenter className="nav-icon" />
                <p>Users</p>
              </Link>
            </li>

            <li className="nav-item has-treeview">
              <Link to="#" className="nav-link">
                <FaAlignCenter className="nav-icon" />
                <p>Centers</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="#" className="nav-link">
                <IoTimerSharp className="nav-icon" />
                <p>Batch Management</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="#" className="nav-link">
                <VscOutput className="nav-icon" />
                <p>Results Management</p>
              </Link>
            </li>

            <li className="nav-item has-treeview">
              <Link to="#" className="nav-link">
                <AiOutlineFundView className="nav-icon" />
                <p>Testimonials</p>
              </Link>
            </li>

            <li className="nav-item has-treeview">
              <Link to="#" className="nav-link">
                <FaPeopleGroup className="nav-icon" />
                <p>Teams</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="#" className="nav-link">
                <MdMenuBook className="nav-icon" />
                <p>Assignment</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="#" className="nav-link">
                <MdOutlineQueryStats className="nav-icon" />
                <p>Doubt Discussion</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="#" className="nav-link">
                <BiSolidUserVoice className="nav-icon" />
                <p>Notice</p>
              </Link>
            </li>
          </ul>
        </nav>
        {/* <!-- /.sidebar-menu --> */}
      </div>
      {/* <!-- /.sidebar --> */}
    </>
  );
};

export default AdminSidebar;
