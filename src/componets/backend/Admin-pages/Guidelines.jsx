import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import AddGuideline from "./GuideLineUI/AddGuideline";
import EditGuideline from "./GuideLineUI/EditGuideline";
import "../Admin/AdminCSS.css";
import "../Admin/AdminJS.js";

const Guidelines = () => {
  const [guidelinesData, setGuidelinesData] = useState([]); // Initially empty array
  const [selectedGuideline, setSelectedGuideline] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch guidelines data from backend when component mounts
  useEffect(() => {
    const fetchGuidelines = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/guideline/guidelines"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch guidelines");
        }
        const data = await response.json();
        setGuidelinesData(data); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching guidelines: " + error.message); // Handle error
      } finally {
        setLoading(false); // Reset loading state after request
      }
    };

    fetchGuidelines(); // Fetch data on mount
  }, []);

  // Add a new guideline
  const addNewGuideline = newGuideline => {
    setGuidelinesData([...guidelinesData, newGuideline]);
  };

  // Toggle the active status of a guideline
  const toggleActiveStatus = id => {
    setGuidelinesData(prevData =>
      prevData.map(guideline =>
        guideline._id === id
          ? { ...guideline, active: !guideline.active }
          : guideline
      )
    );
  };

  // Open the edit modal
  const openEditModal = guideline => {
    setSelectedGuideline(guideline);
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedGuideline(null);
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="guideline-h1">Guidelines</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <AddGuideline addNewGuideline={addNewGuideline} />
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Loading and Error Handling */}
            {loading && <p>Loading guidelines...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Loop through fetched guidelines data and display them */}
            {guidelinesData.map(guideline => (
              <div className="col-md-12" key={guideline._id}>
                <div className="card collapsed-card">
                  <div className="card-header">
                    <h3 className="card-title">{guideline.title}</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                      {/* Toggle Active/Inactive */}
                      <button
                        type="button"
                        className={`btn guideline-custom-btn ${
                          guideline.active ? "active-btn" : "inactive-btn"
                        }`}
                        onClick={() => toggleActiveStatus(guideline._id)}
                      >
                        {guideline.active ? "Active" : "Inactive"}
                      </button>
                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn guideline-custom-btn edit-btn"
                        onClick={() => openEditModal(guideline)}
                      >
                        <FaEdit className="fs-4" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body guideline-card">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: Array.isArray(guideline.content)
                          ? guideline.content.join("")
                          : guideline.content,
                      }}
                    />
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-md-3">
                        <strong>Created By:</strong>
                        <span> {guideline.createdBy} </span>
                      </div>
                      <div className="col-md-3">
                        <strong>Created On:</strong>
                        <span> {guideline.createdOn}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Updated By:</strong>
                        <span> {guideline.updatedBy}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Updated On:</strong>
                        <span> {guideline.updatedOn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isEditModalOpen && (
        <EditGuideline
          guideline={selectedGuideline}
          setGuidelinesData={setGuidelinesData}
          closeEditModal={closeEditModal}
        />
      )}
    </>
  );
};

export default Guidelines;
