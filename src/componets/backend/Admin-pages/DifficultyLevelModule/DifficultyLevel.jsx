import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import AddDifficultyLevel from "./AddDifficultyLevel.jsx";
import EditDifficultyLevel from "./EditDifficultyLevel.jsx";

const DifficultyLevel = () => {
  const [difficultyLevelsData, setDifficultyLevelData] = useState([]); // Initially empty array
  const [DifficultyLevel, setDifficultyLevel] = useState(null); // Track selected stream for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal open/close state
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch streams data from backend when component mounts
  useEffect(() => {
    const fetchDifficultyLevels = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/difficultyLevel/difficultyLevels" // Assuming streams API endpoint
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Difficulty Levels");
        }
        const data = await response.json();
        setDifficultyLevelData(data); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching streams: " + error.message); // Handle error
      } finally {
        setLoading(false); // Reset loading state after request
      }
    };

    fetchDifficultyLevels(); // Fetch data on mount
  }, []);

  // Add a new stream
  const addNewDifficultyLevels = newDifficultyLevels => {
    setDifficultyLevelData([...difficultyLevelsData, newDifficultyLevels]);
  };

  // Toggle the active status of a stream
  const toggleActiveStatus = id => {
    setDifficultyLevelData(prevData =>
      prevData.map(difficultyLevel =>
        difficultyLevel._id === id
          ? { ...difficultyLevel, active: !difficultyLevel.active }
          : difficultyLevel
      )
    );
  };

  //Open the edit modal
  const openEditModal = difficultyLevels => {
    setDifficultyLevel(difficultyLevels); // Set the selected stream to edit
    setIsEditModalOpen(true); // Open the edit modal
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setDifficultyLevel(null); // Clear selected stream
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="stream-h1">Difficulty levels</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <AddDifficultyLevel
                  addNewDifficultyLevels={addNewDifficultyLevels}
                />
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Loading and Error Handling */}
            {loading && <p>Loading streams...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Loop through fetched streams data and display them */}
            {difficultyLevelsData.map(difficultyLevel => (
              <div className="col-md-12" key={difficultyLevel._id}>
                <div className="card collapsed-card">
                  <div className="card-header">
                    <h3 className="card-title">{difficultyLevel.title}</h3>
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
                        className={`btn stream-custom-btn ${
                          difficultyLevel.active ? "active-btn" : "inactive-btn"
                        }`}
                        onClick={() => toggleActiveStatus(difficultyLevel._id)}
                      >
                        {difficultyLevel.active ? "Active" : "Inactive"}
                      </button>
                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn stream-custom-btn edit-btn"
                        onClick={() => openEditModal(difficultyLevel)}
                      >
                        <FaEdit className="fs-4" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body stream-card">
                    {/* Display URL */}
                    <div className="row">
                      <div className="col-md-12">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: Array.isArray(difficultyLevel.description)
                              ? difficultyLevel.description.join("")
                              : difficultyLevel.description,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-md-3">
                        <strong>Created By:</strong>
                        <span> {difficultyLevel.createdBy} </span>
                      </div>
                      <div className="col-md-3">
                        <strong>Created On:</strong>
                        <span> {difficultyLevel.createdOn}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Updated By:</strong>
                        <span> {difficultyLevel.updatedBy}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Updated On:</strong>
                        <span> {difficultyLevel.updatedOn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Render EditStream Modal */}
      {isEditModalOpen && (
        <EditDifficultyLevel
          difficultyLevel={DifficultyLevel}
          setDifficultyLevelData={setDifficultyLevelData}
          closeEditModal={closeEditModal}
        />
      )}
    </>
  );
};

export default DifficultyLevel;
