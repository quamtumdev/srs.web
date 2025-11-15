import { useState, useEffect } from "react";
import AddTest from "./AddTest";
import EditTest from "./EditTest";
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import { FaEdit } from "react-icons/fa";
const Test = () => {
  const [TestsData, setTestsData] = useState([]); // Initially empty array
  const [selectedTests, setSelectedTests] = useState(null); // Track selected stream for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal open/close state
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch streams data from backend when component mounts
  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/test/tests" // Assuming streams API endpoint
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Tests");
        }
        const data = await response.json();
        setTestsData(data); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching Tests: " + error.message); // Handle error
      } finally {
        setLoading(false); // Reset loading state after request
      }
    };

    fetchTests(); // Fetch data on mount
  }, []);

  // Add a new Test
  const addNewTests = newTest => {
    setTestsData([...TestsData, newTest]);
  };

  // Toggle the active status of a stream
  const toggleActiveStatus = id => {
    setTestsData(prevData =>
      prevData.map(test =>
        test._id === id ? { ...test, active: !test.active } : test
      )
    );
  };

  // Open the edit modal
  const openEditModal = test => {
    setSelectedTests(test); // Set the selected stream to edit
    setIsEditModalOpen(true); // Open the edit modal
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setSelectedTests(null); // Clear selected stream
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="stream-h1">Test Types</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <AddTest addNewTests={addNewTests} />
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Loading and Error Handling */}
            {loading && <p>Loading test...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Loop through fetched streams data and display them */}
            {TestsData.map(test => (
              <div className="col-md-12" key={test._id}>
                <div className="card collapsed-card">
                  <div className="card-header">
                    <h3 className="card-title">{test.title}</h3>
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
                          test.active ? "active-btn" : "inactive-btn"
                        }`}
                        onClick={() => toggleActiveStatus(test._id)}
                      >
                        {test.active ? "Active" : "Inactive"}
                      </button>
                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn stream-custom-btn edit-btn"
                        onClick={() => openEditModal(test)}
                      >
                        <FaEdit className="fs-4" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body test-type-card">
                    {/* Display URL */}
                    <div className="row">
                      <div className="col-md-6">
                        <strong>Unique URL:</strong>
                        {test.url}
                      </div>
                      <div className="col-md-6">
                        <strong>Test Scope:</strong>
                        {test.testScope}
                      </div>
                    </div>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: Array.isArray(test.description)
                          ? test.description.join("")
                          : test.description,
                      }}
                      className="mt-2"
                    />
                  </div>
                  <div className="card-footer test-card-footer-type">
                    <div className="row">
                      <div className="col-md-3">
                        <strong>Created By:</strong>
                        <span> {test.createdBy} </span>
                      </div>
                      <div className="col-md-3">
                        <strong>Created On:</strong>
                        <span> {test.createdOn}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Updated By:</strong>
                        <span> {test.updatedBy}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Updated On:</strong>
                        <span> {test.updatedOn}</span>
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
        <EditTest
          test={selectedTests}
          setTestsData={setTestsData}
          closeEditModal={closeEditModal}
        />
      )}
    </>
  );
};

export default Test;
