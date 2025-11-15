import { useState, useEffect } from "react";
import axios from "axios";

const DigitalMaterial = () => {
  const [activeTab, setActiveTab] = useState("study-material");
  const [searchQuery, setSearchQuery] = useState("");
  const [materials, setMaterials] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tabs configuration
  const tabs = [
    { id: "study-material", label: "Study Material" },
    { id: "exercise", label: "Exercise" },
    { id: "race", label: "Race" },
    { id: "special-booklet", label: "Special Booklet" },
    { id: "class-notes", label: "Class Notes" },
  ];

  // ✅ API Call - Fetch Materials
  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get token from localStorage
      const token = localStorage.getItem("studentToken");

      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      // API Call to backend
      const response = await axios.get(
        "https://srs-api-six.vercel.app/api/student/materials",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setMaterials(response.data.groupedMaterials);
        console.log("Materials fetched:", response.data.groupedMaterials);
      } else {
        setError("Failed to fetch materials");
      }
    } catch (err) {
      console.error("Error fetching materials:", err);
      setError(err.response?.data?.message || "Failed to fetch materials");
    } finally {
      setLoading(false);
    }
  };

  // Get materials for active tab
  const tabMaterials = materials[activeTab] || [];

  // Filter materials based on search
  const filteredMaterials = tabMaterials.filter(
    material =>
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.topic?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Download Handler
  const handleDownload = async (materialId, fileName) => {
    try {
      const token = localStorage.getItem("studentToken");

      if (!token) {
        alert("Please login first");
        return;
      }

      console.log(`Starting download for: ${fileName}`);

      const response = await axios.get(
        `https://srs-api-six.vercel.app/api/student/materials/download/${materialId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log(`Downloaded: ${fileName}`);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download material");
    }
  };

  // View Handler (Open PDF inline)
  // const handleView = async (materialId, fileName) => {
  //   try {
  //     const token = localStorage.getItem("studentToken");

  //     if (!token) {
  //       alert("Please login first");
  //       return;
  //     }

  //     console.log(`Opening: ${fileName}`);

  //     const response = await axios.get(
  //       `https://srs-api-six.vercel.app/api/student/materials/view/${materialId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         responseType: "blob",
  //       }
  //     );

  //     // Create blob URL and open in new tab
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     window.open(url, "_blank");

  //     console.log(`Opened: ${fileName}`);
  //   } catch (err) {
  //     console.error("View error:", err);
  //     alert("Failed to open material");
  //   }
  // };

  const getSubjectBadge = subject => {
    const subjectConfig = {
      zoology: { class: "badge-zoology", label: "Zoology" },
      physics: { class: "badge-physics", label: "Physics" },
      chemistry: { class: "badge-chemistry", label: "Chemistry" },
      botany: { class: "badge-botany", label: "Botany" },
      mathematics: { class: "badge-mathematics", label: "Mathematics" },
    };

    return (
      subjectConfig[subject?.toLowerCase()] || {
        class: "badge-default",
        label: subject || "Subject",
      }
    );
  };

  const getTopicBadge = topic => {
    return topic || "General Topic";
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="srs-digital-material-container">
        <div className="srs-dm-header">
          <div className="srs-dm-header__left">
            <div className="srs-dm-header__title">
              <h1>Digital Material</h1>
            </div>
          </div>
        </div>
        <div className="srs-dm-content">
          <div className="srs-study-material-loading">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading materials...</p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Error State
  if (error) {
    return (
      <div className="srs-digital-material-container">
        <div className="srs-dm-header">
          <div className="srs-dm-header__left">
            <div className="srs-dm-header__title">
              <h1>Digital Material</h1>
            </div>
          </div>
        </div>
        <div className="srs-dm-content">
          <div className="srs-study-material-error">
            <i className="fas fa-exclamation-circle"></i>
            <p>{error}</p>
            <button
              onClick={fetchMaterials}
              className="srs-study-material-retry-btn"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="srs-digital-material-container">
      {/* Top Header Bar */}
      <div className="srs-dm-header">
        <div className="srs-dm-header__left">
          <div className="srs-dm-header__title">
            <h1>Digital Material</h1>
            <span className="srs-dm-header__info-icon">
              <i className="fas fa-info-circle"></i>
            </span>
          </div>
        </div>
        <div className="srs-dm-header__right">
          <span className="srs-dm-header__session">
            2025-2026 ENTHUSE PRO ONLINE PLUS-OFFLINE PHASE-I
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="srs-dm-content">
        {/* Combined Top Bar - Tabs + Search + Filter */}
        <div className="srs-dm-top-bar">
          {/* Tabs Navigation */}
          <div className="srs-dm-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`srs-dm-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="srs-dm-toolbar">
            <div className="srs-dm-search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search by title/subject/topic"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="srs-dm-filter-btn">
              <i className="fas fa-filter"></i>
              Filter
            </button>
          </div>
        </div>

        {/* Materials Table */}
        <div className="srs-dm-table-wrapper">
          <table className="srs-dm-table">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Description</th>
                <th>Uploaded on</th>
                <th>Subject</th>
                <th>Topic</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map((material, index) => (
                  <tr key={material._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="srs-dm-file-cell">
                        <i className="fas fa-file-pdf"></i>
                        <span className="srs-dm-file-link">
                          {material.name}
                        </span>
                      </div>
                    </td>
                    <td>
                      {new Date(material.uploadedOn).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td>
                      <span
                        className={`srs-dm-badge ${
                          getSubjectBadge(material.subject).class
                        }`}
                      >
                        {getSubjectBadge(material.subject).label}
                      </span>
                    </td>
                    <td>
                      <span className="srs-dm-topic-badge">
                        {getTopicBadge(material.topic)}
                      </span>
                    </td>
                    <td>
                      <div className="srs-study-material-actions">
                        <button
                          onClick={() =>
                            handleDownload(material._id, material.fileName)
                          }
                          className="srs-study-student-download"
                          title="Download"
                        >
                          <i className="fas fa-download"></i> Download
                        </button>
                        {/* <button
                          onClick={() =>
                            handleView(material._id, material.fileName)
                          }
                          className="srs-study-student-view"
                          title="View"
                        >
                          <i className="fas fa-eye"></i> View
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="srs-study-material-empty">
                    <i className="fas fa-folder-open"></i>
                    <p>No materials found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DigitalMaterial;
