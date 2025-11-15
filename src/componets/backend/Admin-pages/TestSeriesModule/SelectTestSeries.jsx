import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap"; // Import React Bootstrap Modal and Button
import { BiAlarmExclamation } from "react-icons/bi";

import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";

const SelectTestSeries = () => {
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Fetch tests data from backend when component mounts
  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/testlists"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tests");
        }
        const data = await response.json();

        // Make sure the 'active' field is initially false for all tests (if not already)
        const updatedTests = data.map(test => ({
          ...test,
          active: test.active || false, // Default to false if 'active' is not provided
        }));

        setTestsData(updatedTests); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching tests: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  // Toggle the active status of a test

  // Function to handle opening the modal
  const handleShowModal = () => setShowModal(true);

  // Function to handle closing the modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Button to open the modal */}
            <Button variant="primary" onClick={handleShowModal}>
              Add Test
            </Button>

            {/* Loading and Error Handling */}
            {loading && <p>Loading tests...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Select Test Series</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Loop through fetched tests data and display them inside the modal */}
                <div className="card-body table-responsive p-0">
                  <table className="table table-head-fixed text-nowrap table-striped">
                    <thead>
                      <tr className="skyblue-clr">
                        <th>Select</th>
                        <th>Test Name</th>
                        <th>Exam</th>
                        <th>Test Type</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testsData.map(test => (
                        <tr key={test._id}>
                          <td>
                            {/* Checkbox to toggle active status */}
                            <input type="checkbox" value="" />
                          </td>
                          <td>{test.title}</td>
                          <td>
                            {Array.isArray(test.examType)
                              ? test.examType.join(", ")
                              : test.examType}
                          </td>
                          <td>
                            {Array.isArray(test.testType) &&
                            test.testType.length > 0 ? (
                              test.testType.map((type, index) => (
                                <div key={index}>
                                  {type.testType &&
                                    type.testType.length > 0 && (
                                      <p>{type.testType.join(", ")}</p>
                                    )}
                                </div>
                              ))
                            ) : (
                              <span>No Test Type Information Available</span>
                            )}
                          </td>
                          <td>{test.duration}</td>
                          <td>{test.active ? "Active" : "Inactive"}</td>
                          <td>
                            <span>
                              <BiAlarmExclamation className="preview-questions" />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </section>
    </>
  );
};

export default SelectTestSeries;
