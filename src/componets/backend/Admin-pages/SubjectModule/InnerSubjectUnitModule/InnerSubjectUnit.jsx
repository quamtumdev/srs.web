/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../../../Admin/AdminJS.js";
import "../../../Admin/AdminCSS.css";
import AddInnerSubjectUnit from "./AddInnerSubjectUnit.jsx";
import EditInnerSubjectUnit from "./EditInnerSubjectUnit.jsx";

const InnerSubjectUnit = ({ subject }) => {
  const [innerSubjectUnits, setInnerSubjectUnits] = useState([]); // Data for inner subject units
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors
  const [selectedUnit, setSelectedUnit] = useState(null); // For editing a selected unit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // To open/close the edit modal

  useEffect(() => {
    if (!subject._id) return;

    const fetchInnerSubjectUnits = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/innerSubjectUnits/innerSubjectUnits/${subject._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch inner subject units");
        }
        const data = await response.json();
        setInnerSubjectUnits(data);
      } catch (error) {
        setError("Error fetching inner subject units: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInnerSubjectUnits(); // Fetch inner subject units for the specific subject
  }, [subject._id]); // Re-run if subject._id changes

  // Add a new inner subject unit (you can implement a form or modal for this)
  const addNewInnerSubjectUnit = newUnit => {
    setInnerSubjectUnits([...innerSubjectUnits, newUnit]);
  };

  // Toggle Active/Inactive status of an inner subject unit
  const toggleActiveStatus = id => {
    setInnerSubjectUnits(prevData =>
      prevData.map(unit =>
        unit._id === id ? { ...unit, active: !unit.active } : unit
      )
    );
  };

  const openEditModal = unit => {
    setSelectedUnit(unit); // Set the selected stream to edit
    setIsEditModalOpen(true); // Open the edit modal
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setSelectedUnit(null); // Clear selected stream
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
                <ol className="breadcrumb float-sm-right subject-inner-btn-custom ">
                  <AddInnerSubjectUnit
                    addNewInnerSubjectUnit={addNewInnerSubjectUnit}
                    subjectId={subject._id}
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
            {innerSubjectUnits.map((unit, index) => (
              <div className="col-md-6" key={unit._id || index}>
                <div className="card card-success">
                  <div className="card-header  inner-card-subject-custom">
                    <h3 className="card-title text-dark">{unit.title}</h3>
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
                          unit.active ? "active-btn" : "inactive-btn"
                        }`}
                        onClick={() => toggleActiveStatus(unit._id)}
                      >
                        {unit.active ? "Active" : "Inactive"}
                      </button>
                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn subject-custom-btn edit-btn"
                        onClick={() => openEditModal(unit)} // Open edit modal
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
                        <span className="info-item-details"> {unit.url}</span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <strong className="subject-card-custom">
                        Description:{" "}
                      </strong>
                      <span
                        className="info-item-details"
                        dangerouslySetInnerHTML={{
                          __html: Array.isArray(unit.content)
                            ? unit.content.join("")
                            : unit.content,
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
                            {unit.createdBy}{" "}
                          </span>
                        </div>
                        <div className="col-md-12">
                          <strong className="info-item mb-2">
                            Created On:{" "}
                          </strong>
                          <span className="info-item-details">
                            {" "}
                            {unit.createdOn}
                          </span>
                        </div>
                        <div className="col-md-12">
                          <strong className="info-item mb-2">
                            Updated By:{" "}
                          </strong>
                          <span className="info-item-details">
                            {" "}
                            {unit.updatedBy}
                          </span>
                        </div>
                        <div className="col-md-12">
                          <strong className="info-item mb-2">
                            Updated On:{" "}
                          </strong>
                          <span className="info-item-details">
                            {" "}
                            {unit.updatedOn}
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
        <EditInnerSubjectUnit
          unit={selectedUnit}
          setInnerSubjectUnits={setInnerSubjectUnits}
          closeEditModal={closeEditModal}
          innerSubjectUnits={innerSubjectUnits}
        />
      )}
    </>
  );
};

export default InnerSubjectUnit;
