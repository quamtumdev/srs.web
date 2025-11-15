/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const MaterialListView = ({ onEditClick }) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    materialType: "",
    course: "",
    subject: "",
  });

  useEffect(() => {
    fetchMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        console.error("Admin token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/api/materials", {
        params: filter,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setMaterials(response.data.materials || []);
      console.log("✅ Materials fetched:", response.data.materials);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this material?")) {
      return;
    }

    try {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        alert("Admin authentication required");
        return;
      }

      await axios.delete(`http://localhost:5000/api/materials/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      alert("Material deleted successfully");
      fetchMaterials();
    } catch (error) {
      alert("Failed to delete material");
      console.error(error);
    }
  };

  return (
    <div className="srs-admin-material-list">
      <div className="srs-admin-filter-bar">
        <select
          value={filter.materialType}
          onChange={e =>
            setFilter(prev => ({ ...prev, materialType: e.target.value }))
          }
          className="srs-admin-filter-select"
        >
          <option value="">All Types</option>
          <option value="study-material">Study Material</option>
          <option value="exercise">Exercise</option>
          <option value="race">RACE</option>
          <option value="special-booklet">Special Booklet</option>
          <option value="class-notes">Class Notes</option>
        </select>

        <select
          value={filter.course}
          onChange={e =>
            setFilter(prev => ({ ...prev, course: e.target.value }))
          }
          className="srs-admin-filter-select"
        >
          <option value="">All Courses</option>
          <option value="neet">NEET</option>
          <option value="jee">JEE</option>
          <option value="foundation">Foundation</option>
          <option value="mca">MCA</option>
        </select>

        <button
          onClick={() =>
            setFilter({ materialType: "", course: "", subject: "" })
          }
          className="srs-admin-filter-reset"
        >
          <i className="fas fa-redo"></i>
          Reset Filters
        </button>
      </div>

      <div className="srs-admin-table-wrapper">
        {loading ? (
          <div className="srs-admin-loading">
            <i className="fas fa-spinner fa-spin"></i>
            Loading materials...
          </div>
        ) : (
          <table className="srs-admin-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Title</th>
                <th>Type</th>
                <th>Course</th>
                <th>Subject</th>
                <th>Topic</th>
                <th>Uploaded On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.length > 0 ? (
                materials.map((material, index) => (
                  <tr key={material._id}>
                    <td>{index + 1}</td>
                    <td>
                      <i className="fas fa-file-pdf text-danger"></i>
                      {material.title}
                    </td>
                    <td>
                      <span className="srs-admin-badge badge-type">
                        {material.materialType}
                      </span>
                    </td>
                    <td>
                      <span className="srs-admin-badge badge-course">
                        {material.course}
                      </span>
                    </td>
                    <td>
                      <span className="srs-admin-badge badge-subject">
                        {material.subject}
                      </span>
                    </td>
                    <td>{material.topic}</td>
                    <td>
                      {new Date(material.uploadedOn).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td>
                      <div className="srs-admin-action-btns">
                        {/* ✅ Edit Button - Calls parent function */}
                        <button
                          className="srs-admin-action-btn edit"
                          title="Edit"
                          onClick={() => onEditClick(material)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="srs-admin-action-btn delete"
                          onClick={() => handleDelete(material._id)}
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    <i className="fas fa-folder-open fs-1 text-muted mb-3 d-block"></i>
                    <p className="text-muted">No materials found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MaterialListView;
