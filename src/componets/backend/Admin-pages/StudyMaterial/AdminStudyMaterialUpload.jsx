import { useState, useEffect } from "react";
import MaterialUploadForm from "./MaterialUploadForm";
import MaterialListView from "./MaterialListView";
import MaterialEditForm from "./MaterialEditForm"; // ✅ Import Edit Form

const AdminStudyMaterialUpload = () => {
  const [activeView, setActiveView] = useState("upload");
  const [refreshList, setRefreshList] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [adminUser, setAdminUser] = useState(null);

  // ✅ Edit State
  const [editingMaterial, setEditingMaterial] = useState(null);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const adminUserData = localStorage.getItem("adminUser");

      if (!adminToken || !adminUserData) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const user = JSON.parse(adminUserData);

      if (user.isAdmin !== true) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setAdminUser(user);
      setIsAdmin(true);
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    setRefreshList(prev => prev + 1);
    setActiveView("list");
  };

  // ✅ Handle Edit Click
  const handleEditClick = material => {
    console.log("🔧 Edit material:", material._id);
    setEditingMaterial(material);
    setActiveView("edit");
  };

  // ✅ Handle Edit Success
  const handleEditSuccess = () => {
    setEditingMaterial(null);
    setRefreshList(prev => prev + 1);
    setActiveView("list");
  };

  // ✅ Handle Edit Cancel
  const handleEditCancel = () => {
    setEditingMaterial(null);
    setActiveView("list");
  };

  if (loading) {
    return (
      <div className="srs-admin-material-container">
        <div style={{ textAlign: "center", padding: "40px" }}>
          <i
            className="fas fa-spinner fa-spin"
            style={{ fontSize: "32px" }}
          ></i>
          <p style={{ marginTop: "10px" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="srs-admin-material-container">
        <div style={{ textAlign: "center", padding: "40px", color: "#dc3545" }}>
          <i
            className="fas fa-lock"
            style={{ fontSize: "48px", marginBottom: "20px", display: "block" }}
          ></i>
          <h2>Access Denied</h2>
          <p style={{ fontSize: "16px", marginTop: "10px" }}>
            Admin authentication required. Please login as administrator.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="srs-admin-material-container">
      <div className="srs-admin-material-header">
        <div className="srs-admin-material-header__title">
          <h1>Study Material Management</h1>
          <p>Upload and manage course materials</p>
        </div>
        <div className="srs-admin-material-header__actions">
          <button
            className={`srs-admin-material-view-btn ${
              activeView === "upload" ? "active" : ""
            }`}
            onClick={() => {
              setActiveView("upload");
              setEditingMaterial(null);
            }}
          >
            <i className="fas fa-upload"></i>
            Upload Material
          </button>
          <button
            className={`srs-admin-material-view-btn ${
              activeView === "list" || activeView === "edit" ? "active" : ""
            }`}
            onClick={() => {
              setActiveView("list");
              setEditingMaterial(null);
            }}
          >
            <i className="fas fa-list"></i>
            View All Materials
          </button>
        </div>
      </div>

      <div className="srs-admin-material-content">
        {/*  Upload View */}
        {activeView === "upload" && (
          <MaterialUploadForm onUploadSuccess={handleUploadSuccess} />
        )}

        {/*  List View */}
        {activeView === "list" && (
          <MaterialListView key={refreshList} onEditClick={handleEditClick} />
        )}

        {/*  Edit View */}
        {activeView === "edit" && editingMaterial && (
          <MaterialEditForm
            material={editingMaterial}
            onUpdateSuccess={handleEditSuccess}
            onCancel={handleEditCancel}
          />
        )}
      </div>
    </div>
  );
};

export default AdminStudyMaterialUpload;
