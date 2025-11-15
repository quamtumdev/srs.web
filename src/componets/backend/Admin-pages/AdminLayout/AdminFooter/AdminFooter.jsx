import { Link } from "react-router-dom";
import "../../../Admin/AdminCSS.css";
import "../../../Admin/AdminJS.js";

const AdminFooter = () => {
  return (
    <>
      <footer>
        <div className="float-right d-none d-sm-block">
          {/* <b>Version</b> 3.0.3 */}
        </div>
        <strong>
          <Link to="#"> SRS Educares Pvt. Ltd.</Link>.
        </strong>{" "}
        © All Rights Reserved.
      </footer>
    </>
  );
};
export default AdminFooter;
