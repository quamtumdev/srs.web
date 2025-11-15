import { useState, useEffect } from "react";
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import AddMarkingScheme from "./AddMarkingScheme.jsx";
import EditMarkingScheme from "./EditMarkingScheme.jsx";
import { FaEdit } from "react-icons/fa";

const MarkingScheme = () => {
  const [markingData, setMarkingData] = useState([]);
  const [selectedMarking, setSelectedMarking] = useState(null); // Track selected stream for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define the question types for which we need to show specific marking fields
  const singleCorrectTypes = [
    "Single Correct",
    "Comprehension SCQ",
    "Single Digit Integer",
    "Four Digit Integer",
    "Assertion Reasoning",
    "True False",
    "Subjective",
  ];

  const multipleCorrectTypes = [
    "Multiple Correct",
    "Comprehension MCQ",
    "Matrix 4*5",
    "Matrix 4*6",
    "Matrix 3*4",
  ];

  // Fetch marking schemes data from backend when component mounts
  useEffect(() => {
    const fetchMarkingScheme = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/markingSchemes/markingSchemes"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Marking Scheme");
        }
        const data = await response.json();
        setMarkingData(data);
      } catch (error) {
        setError("Error fetching Marking Scheme: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkingScheme();
  }, []);

  // Add a new marking scheme
  const addNewMarkingScheme = newMarking => {
    setMarkingData([...markingData, newMarking]);
  };

  // Toggle the active status of a marking scheme
  const toggleActiveStatus = id => {
    setMarkingData(prevData =>
      prevData.map(marking =>
        marking._id === id ? { ...marking, active: !marking.active } : marking
      )
    );
  };

  // Open the edit modal
  const openEditModal = marking => {
    setSelectedMarking(marking); // Set the selected stream to edit
    setIsEditModalOpen(true); // Open the edit modal
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setSelectedMarking(null); // Clear selected stream
  };

  // Function to determine which marks fields to display based on question type
  const renderMarksFields = question => {
    if (singleCorrectTypes.includes(question.questionType)) {
      return (
        <>
          <div className="col-md-6">
            <strong className="info-item mb-2">Right Marks:</strong>
            <span>{question.marks?.rightMarks || 0}</span>
          </div>
          <div className="col-md-6">
            <strong className="info-item mb-2">Wrong Marks:</strong>
            <span>{question.marks?.wrongMarks || 0}</span>
          </div>
          <div className="col-md-6">
            <strong className="info-item mb-2">Not Attempted Marks:</strong>
            <span>{question.marks?.notAttemptedMarks || 0}</span>
          </div>
        </>
      );
    }

    if (multipleCorrectTypes.includes(question.questionType)) {
      return (
        <>
          <div className="col-md-6">
            <strong className="info-item mb-2">Right Marks:</strong>
            <span>{question.marks?.rightMarks || 0}</span>
          </div>
          <div className="col-md-6">
            <strong className="info-item mb-2">Wrong Marks:</strong>
            <span>{question.marks?.wrongMarks || 0}</span>
          </div>
          <div className="col-md-6">
            <strong className="info-item mb-2">Not Attempted Marks:</strong>
            <span>{question.marks?.notAttemptedMarks || 0}</span>
          </div>
          <div className="col-md-6">
            <strong className="info-item mb-2">Right Marks:</strong>
            <span>{question.marks?.singleRightMarks || 0}</span>
          </div>
          <div className="col-md-6">
            <strong className="info-item mb-2">Wrong Marks:</strong>
            <span>{question.marks?.singleWrongMarks || 0}</span>
          </div>
          <div className="col-md-6">
            <strong className="info-item mb-2">Not Attempted Marks:</strong>
            <span>{question.marks?.singleNotAttemptedMarks || 0}</span>
          </div>
        </>
      );
    }

    return null; // Return null for other types
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="stream-h1">Marking Schemes</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <AddMarkingScheme addNewMarkingScheme={addNewMarkingScheme} />
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {loading && <p>Loading Marking Schemes...</p>}
            {error && <p className="text-danger">{error}</p>}

            {markingData.length > 0 ? (
              markingData.map(marking => (
                <div className="col-md-12" key={marking._id}>
                  <div className="card collapsed-card">
                    <div className="card-header">
                      <h3 className="card-title">{marking.title}</h3>
                      <div className="card-tools">
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="collapse"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                        <button
                          type="button"
                          className={`btn subject-custom-btn ${
                            marking.active ? "active-btn" : "inactive-btn"
                          }`}
                          onClick={() => toggleActiveStatus(marking._id)}
                        >
                          {marking.active ? "Active" : "Inactive"}
                        </button>

                        {/* Edit button */}
                        <button
                          type="button"
                          className="btn stream-custom-btn edit-btn"
                          onClick={() => openEditModal(marking)}
                        >
                          <FaEdit className="fs-4" />
                        </button>
                      </div>
                    </div>
                    <div className="card-body subject-card">
                      {marking.questions.length > 0 &&
                        marking.questions.map(question => (
                          <div key={question._id}>
                            {/* Display Question Type */}
                            <div className="row mb-2  border-top-card-custom">
                              <div className="col-lg-12">
                                <strong className="subject-card-custom">
                                  Question Type:
                                </strong>

                                <span>{question.questionType || "N/A"}</span>
                              </div>
                            </div>

                            {/* Render Marks based on question type */}
                            <div className="row mb-2">
                              {renderMarksFields(question)}
                            </div>
                          </div>
                        ))}

                      {/* Render Description Section */}
                      <div className="row">
                        <div className="mb-2 mt-4 border-top-card-custom">
                          <strong className="subject-card-custom">
                            Description:{" "}
                          </strong>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: Array.isArray(marking.content)
                                ? marking.content.join("")
                                : marking.content,
                            }}
                          />
                        </div>
                        <div className="border-top-card-custom">
                          <div className="row">
                            <div className="col-md-6">
                              <strong className="info-item mb-2">
                                Created By:{" "}
                              </strong>
                              <span> {marking.createdBy} </span>
                            </div>
                            <div className="col-md-6">
                              <strong className="info-item mb-2">
                                Created On:{" "}
                              </strong>
                              <span> {marking.createdOn}</span>
                            </div>
                            <div className="col-md-6">
                              <strong className="info-item mb-2">
                                Updated By:{" "}
                              </strong>
                              <span> {marking.updatedBy}</span>
                            </div>
                            <div className="col-md-6">
                              <strong className="info-item mb-2">
                                Updated On:{" "}
                              </strong>
                              <span> {marking.updatedOn}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No marking schemes available.</p>
            )}
          </div>
        </div>
      </section>

      {isEditModalOpen && (
        <EditMarkingScheme
          marking={selectedMarking}
          setMarkingData={setMarkingData}
          closeEditModal={closeEditModal}
        />
      )}
    </>
  );
};

export default MarkingScheme;
