/* eslint-disable react/prop-types */

import { useState } from "react";
import { formatToIndianDate } from "../utils/dateUtils";

const TestCard = ({ test, onEdit, onDelete, onView }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Debug: Log test data
  console.log("TestCard - Rendering test:", {
    id: test._id || test.id,
    title: test.title,
    subject: test.subject,
  });

  const handleDelete = () => {
    console.log("TestCard - Deleting test:", test._id || test.id);
    onDelete(test._id || test.id);
    setShowDeleteModal(false);
  };

  const handleView = () => {
    console.log("TestCard - Viewing test:", test._id || test.id);
    onView(test._id || test.id);
  };

  const handleEdit = () => {
    console.log("TestCard - Editing test:", test._id || test.id);
    onEdit(test._id || test.id);
  };

  // Format date safely
  const formatDate = dateValue => {
    if (!dateValue) return "N/A";
    try {
      return formatToIndianDate(dateValue);
    } catch (error) {
      console.error("TestCard - Date formatting error:", error);
      return new Date(dateValue).toLocaleDateString("en-IN");
    }
  };

  return (
    <>
      <div className="card test-module-SRS__test-card h-100">
        <div className="card-header test-module-SRS__card-header">
          <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex flex-wrap gap-2">
              <div className="test-module-SRS__subject-badge">
                <i className="fas fa-book me-2"></i>
                {test.subject}
              </div>
            </div>
            <div className="dropdown">
              <button
                className="btn test-module-SRS__card-menu"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={handleView}>
                    <i className="fas fa-eye me-2"></i>View Test
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleEdit}>
                    <i className="fas fa-edit me-2"></i>Edit Test
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => {
                      console.log("TestCard - Opening delete modal");
                      setShowDeleteModal(true);
                    }}
                  >
                    <i className="fas fa-trash me-2"></i>Delete Test
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card-body test-module-SRS__card-body">
          <h5
            className="card-title test-module-SRS__card-title"
            title={test.title}
          >
            {test.title}
          </h5>

          <div className="test-module-SRS__test-stats">
            <div className="row">
              <div className="col-6">
                <div className="test-module-SRS__stat-item">
                  <i className="fas fa-star text-warning me-2"></i>
                  <span className="test-module-SRS__stat-label">Marks:</span>
                  <span className="test-module-SRS__stat-value">
                    {test.totalMarks}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="test-module-SRS__stat-item">
                  <i className="fas fa-clock text-info me-2"></i>
                  <span className="test-module-SRS__stat-label">Time:</span>
                  <span className="test-module-SRS__stat-value">
                    {test.timeLimit}m
                  </span>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <div className="test-module-SRS__stat-item">
                  <i className="fas fa-question-circle text-success me-2"></i>
                  <span className="test-module-SRS__stat-label">
                    Questions:
                  </span>
                  <span className="test-module-SRS__stat-value">
                    {test.questionsCount || test.questions?.length || 0}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="test-module-SRS__stat-item">
                  <i className="fas fa-calendar text-secondary me-2"></i>
                  <span className="test-module-SRS__stat-label">Created:</span>
                  <span className="test-module-SRS__stat-value">
                    {formatDate(test.createdAt || test.createdDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer test-module-SRS__card-footer">
          <div className="d-flex gap-2">
            <button
              className="btn test-module-SRS__view-btn flex-fill"
              onClick={handleView}
            >
              <i className="fas fa-eye me-2"></i>View Test
            </button>
            <button
              className="btn test-module-SRS__edit-btn"
              onClick={handleEdit}
            >
              <i className="fas fa-edit"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={e => {
            if (e.target === e.currentTarget) {
              setShowDeleteModal(false);
            }
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content test-module-SRS__modal">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-exclamation-triangle text-danger me-2"></i>
                  Confirm Delete
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-2">
                  Are you sure you want to delete the test{" "}
                  <strong>{test.title}</strong>?
                </p>
                <div className="alert alert-warning mb-2">
                  <small>
                    <i className="fas fa-info-circle me-1"></i>
                    <strong>Test Details:</strong>
                    <ul className="mb-0 mt-1">
                      <li>Subject: {test.subject}</li>
                      <li>
                        Questions:{" "}
                        {test.questionsCount || test.questions?.length || 0}
                      </li>
                      <li>Total Marks: {test.totalMarks}</li>
                    </ul>
                  </small>
                </div>
                <p className="text-danger mb-0">
                  <i className="fas fa-exclamation-circle me-1"></i>
                  <strong>This action cannot be undone.</strong>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    console.log("TestCard - Delete cancelled");
                    setShowDeleteModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  <i className="fas fa-trash me-2"></i>
                  Delete Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestCard;
