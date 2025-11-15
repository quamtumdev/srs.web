import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import AddSubject from "./AddSubject";
import EditSubject from "./EditSubject";
import "../../Admin/AdminJS.js";
import "../../Admin/AdminCSS.css";
import InnerSubjectUnit from "./InnerSubjectUnitModule/InnerSubjectUnit.jsx";

const Subject = () => {
  const [subjectsData, setSubjectsData] = useState([]); // Initially empty array for subjects
  const [selectedSubject, setSelectedSubject] = useState(null); // Track selected subject for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal open/close state
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch subjects data from backend when component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/subjects/subjects" // Adjust the API endpoint for subjects
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }
        const data = await response.json();
        setSubjectsData(data); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching subjects: " + error.message); // Handle error
      } finally {
        setLoading(false); // Reset loading state after request
      }
    };

    fetchSubjects(); // Fetch data on mount
  }, []);

  // Add a new subject
  const addNewSubject = newSubject => {
    setSubjectsData([...subjectsData, newSubject]);
  };

  // Toggle Active/Inactive status
  const toggleActiveStatus = id => {
    setSubjectsData(prevData =>
      prevData.map(subject =>
        subject._id === id ? { ...subject, active: !subject.active } : subject
      )
    );
  };

  // Open the edit modal
  const openEditModal = subject => {
    setSelectedSubject(subject); // Set the selected subject to edit
    setIsEditModalOpen(true); // Open the edit modal
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setSelectedSubject(null); // Clear selected subject
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="subject-h1">Subjects</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <AddSubject addNewSubject={addNewSubject} />
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Loading and Error Handling */}
            {loading && <p>Loading subjects...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Loop through fetched subjects data and display them */}
            {subjectsData.map(subject => (
              <div className="col-md-12" key={subject._id}>
                <div className="card collapsed-card">
                  <div className="card-header">
                    <h3 className="card-title">{subject.title}</h3>
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
                        className={`subject-custom-btn ${
                          subject.active ? "active-btn" : "inactive-btn"
                        }`}
                        onClick={() => toggleActiveStatus(subject._id)}
                      >
                        {subject.active ? "Active" : "Inactive"}
                      </button>

                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn subject-custom-btn edit-btn"
                        onClick={() => openEditModal(subject)}
                      >
                        <FaEdit className="fs-4" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body subject-card">
                    {/* Display URL */}
                    <div className="row">
                      <div className="col-md-12">
                        <strong className="subject-card-custom mb-2">
                          Uniq URL:{" "}
                        </strong>{" "}
                        <span className="info-item-details">
                          {" "}
                          {subject.url}
                        </span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <strong className="subject-card-custom">
                        Description:{" "}
                      </strong>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: Array.isArray(subject.content)
                            ? subject.content.join("")
                            : subject.content,
                        }}
                      />
                    </div>
                    <div className="border-top-card-custom">
                      <div className="row">
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Created By:{" "}
                          </strong>
                          <span> {subject.createdBy} </span>
                        </div>
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Created On:{" "}
                          </strong>
                          <span> {subject.createdOn}</span>
                        </div>
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Updated By:{" "}
                          </strong>
                          <span> {subject.updatedBy}</span>
                        </div>
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Updated On:{" "}
                          </strong>
                          <span> {subject.updatedOn}</span>
                        </div>
                      </div>
                    </div>
                    {/* Pass the subject._id to the InnerSubjectUnit component to fetch inner units */}

                    <div className="card-footer card-footer-subject-custom mt-3">
                      <InnerSubjectUnit subject={subject} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Render EditSubject Modal */}
      {isEditModalOpen && (
        <EditSubject
          subject={selectedSubject}
          setSubjectsData={setSubjectsData}
          closeEditModal={closeEditModal}
        />
      )}
    </>
  );
};

export default Subject;
