import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import AddTestSeries from "./AddTestSeries";
import EditTestSeries from "./EditTestSeries";
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import SelectTestSeries from "./SelectTestSeries.jsx";

const TestSeries = () => {
  const [testSeriesData, setTestSeriesData] = useState([]); // Initially empty array
  const [selectedTestSeries, setSelectedTestSeries] = useState(null); // Track selected test series for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal open/close state
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch test series data from backend when component mounts
  useEffect(() => {
    const fetchTestSeries = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/test-series" // Assuming the endpoint for test series is "/test-series"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch test series");
        }
        const data = await response.json();
        setTestSeriesData(data); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching test series: " + error.message); // Handle error
      } finally {
        setLoading(false); // Reset loading state after request
      }
    };

    fetchTestSeries(); // Fetch data on mount
  }, []);

  // Add a new test series
  const addNewTestSeries = newTestSeries => {
    setTestSeriesData([...testSeriesData, newTestSeries]);
  };

  // Toggle the active status of a test series
  const toggleActiveStatus = id => {
    setTestSeriesData(prevData =>
      prevData.map(testSeries =>
        testSeries._id === id
          ? { ...testSeries, active: !testSeries.active }
          : testSeries
      )
    );
  };

  // Open the edit modal
  const openEditModal = testSeries => {
    setSelectedTestSeries(testSeries); // Set the selected test series to edit
    setIsEditModalOpen(true); // Open the edit modal
  };

  // // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setSelectedTestSeries(null); // Clear selected test series
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="test-series-h1">Test Series</h1>{" "}
              {/* Updated title */}
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <AddTestSeries addNewTestSeries={addNewTestSeries} />
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Loading and Error Handling */}
            {loading && <p>Loading test series...</p>}{" "}
            {/* Updated loading text */}
            {error && <p className="text-danger">{error}</p>}
            {/* Loop through fetched test series data and display them */}
            {testSeriesData.map(testSeries => (
              <div className="col-md-12" key={testSeries._id}>
                <div className="card collapsed-card">
                  <div className="card-header">
                    <h3 className="card-title">{testSeries.title}</h3>
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
                        className={`btn test-series-custom-btn ${
                          testSeries.active ? "active-btn" : "inactive-btn"
                        }`}
                        onClick={() => toggleActiveStatus(testSeries._id)}
                      >
                        {testSeries.active ? "Active" : "Inactive"}
                      </button>
                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn test-series-custom-btn edit-btn"
                        onClick={() => openEditModal(testSeries)}
                      >
                        <FaEdit className="fs-4" />
                      </button>
                    </div>
                  </div>

                  <div className="card-body test-series-card">
                    <div className="row">
                      <div className="mt-1">
                        <div className="col-sm-12">
                          <ol className="float-sm-right">
                            <SelectTestSeries />
                          </ol>
                        </div>
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>Series Stream: </strong>
                        {testSeries.stream && Array.isArray(testSeries.stream)
                          ? testSeries.stream.join(", ") // Join array with commas
                          : "No stream selected"}{" "}
                        {/* Fallback text if no streams */}
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>Unique Url: </strong>
                        {testSeries.url}
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>Max Tests: </strong>
                        {testSeries.maximumTest}
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>Test Added: </strong>
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>Start Date: </strong>
                        {testSeries.startDate}
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>End Date: </strong>
                        {testSeries.endDate}
                      </div>
                      <div className="col-md-12 panel-details">
                        <strong className="description">Description: </strong>
                        {testSeries.content}
                      </div>
                    </div>
                    <div className="border-top-card-custom">
                      <div className="row">
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Created By:{" "}
                          </strong>
                          <span> {testSeries.createdBy} </span>
                        </div>
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Created On:{" "}
                          </strong>
                          <span> {testSeries.createdOn}</span>
                        </div>
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Updated By:{" "}
                          </strong>
                          <span> {testSeries.updatedBy}</span>
                        </div>
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Updated On:{" "}
                          </strong>
                          <span> {testSeries.updatedOn}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Render EditTestSeries Modal */}
      {isEditModalOpen && (
        <EditTestSeries
          testSeries={selectedTestSeries}
          setTestSeriesData={setTestSeriesData}
          closeEditModal={closeEditModal}
        />
      )}
    </>
  );
};

export default TestSeries;
