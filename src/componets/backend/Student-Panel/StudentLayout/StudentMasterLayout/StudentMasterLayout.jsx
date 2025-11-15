import { Outlet } from "react-router-dom";

import "../../../Admin/AdminCSS.css";
import "../../../Admin/AdminJS.js";
import StudentHeader from "../StudentHeader/StudentHeader.jsx";
import StudentSidebar from "../StudentSidebar/StudentSidebar.jsx";
import StudentFooter from "../StudentFooter/StudentFooter.jsx";
const StudentMasterLayout = () => {
  return (
    <>
      <div className="hold-transition sidebar-mini">
        <div className="wrapper">
          <StudentHeader />
          <aside className="main-sidebar admin-sidebar-bg elevation-4">
            <StudentSidebar />
          </aside>
          <div className="content-wrapper">
            <Outlet />
          </div>
          <div className="main-footer">
            <StudentFooter />
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentMasterLayout;
