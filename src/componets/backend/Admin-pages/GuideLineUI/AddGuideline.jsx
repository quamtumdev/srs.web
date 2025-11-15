/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap"; // To use Form components like Input

import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import backendStyle from "./guideline.module.css";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
function AddGuideline({ addNewGuideline }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [guidelineName, setGuidelineName] = useState("");
  const [guidelineDescription, setGuidelineDescription] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Show modal
  function handleShow() {
    setShow(true);
  }

  // Close modal and clear form
  function handleClose() {
    setShow(false);
    setGuidelineName("");
    setGuidelineDescription("");
    setIsActive(false);
  }

  // Toggle active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleSave = async () => {
    // Basic validation
    if (!guidelineName || !guidelineDescription) {
      setError("Please provide both a title and description.");
      return;
    }

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short", // Abbreviated month (e.g., "Feb")
      day: "2-digit", // Two-digit day (e.g., "10")
      hour: "2-digit", // Two-digit hour (e.g., "10")
      minute: "2-digit", // Two-digit minute (e.g., "18")
      hour12: true, // Use 12-hour format with AM/PM
    }).format(new Date());

    // Clean content, this strips any tags from the content before saving (if needed)
    const cleanContent = guidelineDescription.replace(/<[^>]*>/g, "");

    const newGuideline = {
      title: guidelineName,
      content: cleanContent,
      createdBy: "admin", // Adjust if needed
      createdOn: formattedDate,
      updatedBy: "admin", // Adjust if needed
      updatedOn: formattedDate,
      active: isActive,
    };

    setLoading(true); // Set loading state to true while saving

    try {
      // Sending the new guideline data to the backend via POST request using fetch
      const response = await fetch(
        "http://localhost:5000/api/auth/guideline/guidelines",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGuideline), // Convert the guideline object to a JSON string
        }
      );

      if (response.ok) {
        const savedGuideline = await response.json();
        // Add the new guideline to the parent component's list (if needed)
        addNewGuideline(savedGuideline);

        // Close the modal and reset states
        handleClose();
      } else {
        throw new Error("Failed to save guideline");
      }
    } catch (error) {
      setError("Error saving guideline: " + error.message);
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  return (
    <>
      {/* Button to trigger modal */}
      <Button className="me-2 mb-2" onClick={handleShow}>
        Add New Guideline
      </Button>

      {/* Fullscreen Modal */}
      <Modal
        show={show}
        fullscreen={true}
        onHide={handleClose}
        className={backendStyle.customModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Guideline</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Active/Inactive Toggle */}
          <Form.Group
            className="mb-3 toggle-guideline-active"
            controlId="formActiveToggle"
          >
            <Form.Check
              type="switch"
              id="active-toggle"
              label={isActive ? "Active" : "Inactive"}
              checked={isActive}
              onChange={handleToggle}
            />
          </Form.Group>

          {/* Guideline Name */}
          <Form.Group className="mb-3" controlId="formGuidelineName">
            <Form.Label>Guideline Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Guideline Name"
              value={guidelineName}
              onChange={e => setGuidelineName(e.target.value)}
            />
          </Form.Group>

          {/* Guideline Description with ReactQuill */}
          <Form.Group className="mb-3" controlId="formGuidelineDescription">
            <Form.Label>Guideline Description</Form.Label>

            <Ckeditor
              value={guidelineDescription}
              onChange={setGuidelineDescription}
              placeholder="Enter Guideline Description"
            />
          </Form.Group>

          {/* Preview Section */}
          <div className="preview-section mt-4">
            <h5>Preview</h5>
            <div
              className="preview-content"
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
                minHeight: "200px",
              }}
              dangerouslySetInnerHTML={{ __html: guidelineDescription }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn-cancle-back"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="btn-cancle-back"
            onClick={handleSave}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddGuideline;
