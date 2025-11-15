import { Outlet } from "react-router-dom";
import AdminFooter from "../AdminFooter/AdminFooter";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import "../../../Admin/AdminCSS.css";
import "../../../Admin/AdminJS.js";
const AdminMasterLayout = () => {
  return (
    <>
      <div className="hold-transition sidebar-mini">
        <div className="wrapper">
          <AdminHeader />
          <aside className="main-sidebar admin-sidebar-bg elevation-4">
            <AdminSidebar />
          </aside>
          <div className="content-wrapper">
            <Outlet />
          </div>
          <div className="main-footer">
            <AdminFooter />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminMasterLayout;
