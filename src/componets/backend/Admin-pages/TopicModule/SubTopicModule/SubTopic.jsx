/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../../../Admin/AdminJS.js";
import "../../../Admin/AdminCSS.css";
import AddSubTopic from "./AddSubTopic.jsx";
import EditSubTopic from "./EditSubTopic.jsx";

const SubTopic = ({ topic }) => {
  const [subTopicsUnits, setSubTopicsUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!topic._id) return;

    const fetchSubTopicsUnits = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/subtopic/subtopic/${topic._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Sub  Topics");
        }
        const data = await response.json();
        setSubTopicsUnits(data);
      } catch (error) {
        setError("Error fetching Sub  Topics: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubTopicsUnits();
  }, [topic._id]);

  const addNewSubTopicsUnit = newSubTopic => {
    setSubTopicsUnits([...subTopicsUnits, newSubTopic]);
  };

  // Toggle Active/Inactive status of an inner subject unit
  const toggleActiveStatus = id => {
    setSubTopicsUnits(prevData =>
      prevData.map(topic =>
        topic._id === id ? { ...topic, active: !topic.active } : topic
      )
    );
  };

  const openEditModal = topic => {
    setSelectedUnit(topic);
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUnit(null);
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h4 className="subject-h1">Unit List</h4> {/* Header */}
            </div>
            <div className="col-sm-6">
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right subject-inner-btn-custom">
                  <AddSubTopic
                    addNewSubTopicsUnit={addNewSubTopicsUnit}
                    topicId={topic._id}
                  />
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Loading and Error Handling */}
            {loading && <p>Loading inner subject units...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Loop through fetched inner subject units data and display them */}
            {subTopicsUnits.map((topic, index) => (
              <div className="col-md-6" key={topic._id || index}>
                <div className="card card-success">
                  <div className="card-header inner-card-subject-custom">
                    <h3 className="card-title text-dark">{topic.title}</h3>
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
                        className={`btn subject-custom-btn ${
                          topic.active ? "active-btn" : "inactive-btn"
                        }`}
                        onClick={() => toggleActiveStatus(topic._id)}
                      >
                        {topic.active ? "Active" : "Inactive"}
                      </button>
                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn subject-custom-btn edit-btn"
                        onClick={() => openEditModal(topic)} // Open edit modal
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body subject-card">
                    <div className="row">
                      <div className="col-md-12">
                        <strong className="subject-card-custom mb-2">
                          Uniq URL:{" "}
                        </strong>{" "}
                        <span className="info-item-details"> {topic.url}</span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <strong className="subject-card-custom">
                        Description:{" "}
                      </strong>
                      <span
                        className="info-item-details"
                        dangerouslySetInnerHTML={{
                          __html: Array.isArray(topic.content)
                            ? topic.content.join("")
                            : topic.content,
                        }}
                      />
                    </div>
                    <div className="border-top-card-custom">
                      <div className="row">
                        <div className="col-md-12">
                          <strong className="info-item mb-2">
                            Created By:{" "}
                          </strong>
                          <span className="info-item-details">
                            {" "}
                            {topic.createdBy}{" "}
                          </span>
                        </div>
                        <div className="col-md-12">
                          <strong className="info-item mb-2">
                            Created On:{" "}
                          </strong>
                          <span className="info-item-details">
                            {" "}
                            {topic.createdOn}
                          </span>
                        </div>
                        <div className="col-md-12">
                          <strong className="info-item mb-2">
                            Updated By:{" "}
                          </strong>
                          <span className="info-item-details">
                            {" "}
                            {topic.updatedBy}
                          </span>
                        </div>
                        <div className="col-md-12">
                          <strong className="info-item mb-2">
                            Updated On:{" "}
                          </strong>
                          <span className="info-item-details">
                            {" "}
                            {topic.updatedOn}
                          </span>
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

      {/* Render EditInnerSubjectUnit Modal */}
      {isEditModalOpen && (
        <EditSubTopic
          topic={selectedUnit}
          setSubTopicsUnits={setSubTopicsUnits}
          closeEditModal={closeEditModal}
          subTopicsUnits={subTopicsUnits}
        />
      )}
    </>
  );
};

export default SubTopic;
