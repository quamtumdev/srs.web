import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

import "../../../Admin/AdminJS.js";
import "../../../Admin/AdminCSS.css";

// eslint-disable-next-line react/prop-types
function AddSubTopic({ addNewSubTopicsUnit, topicId }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState(""); // Unit content (text)
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Show modal
  function handleShow() {
    setShow(true);
  }

  // Close modal and clear form
  function handleClose() {
    setShow(false);
    setTitle("");
    setUrl("");
    setContent("");
    setIsActive(false);
    setError(null);
  }

  // Toggle active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  // Handle Save Inner Subject Unit
  const handleSave = async () => {
    // Basic validation
    if (!title || !url || !content) {
      setError("Please provide a title, URL, description");
      return;
    }

    // Format the current date to "Nov 21, 2024, 12:40 PM"
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric", // Full year (2024)
      month: "short", // Abbreviated month (Nov)
      day: "2-digit", // Two-digit day (21)
      hour: "2-digit", // Two-digit hour (12)
      minute: "2-digit", // Two-digit minute (40)
      hour12: true, // Use 12-hour clock with AM/PM
    }).format(new Date());

    const newSubTopic = {
      topicId,
      title,
      content,
      url,
      createdOn: formattedDate,
      updatedOn: formattedDate,
      active: isActive,
    };

    setLoading(true);

    try {
      // Send POST request to the backend to save the new inner subject unit
      const response = await fetch(
        "http://localhost:5000/api/auth/subtopic/subtopic/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSubTopic),
        }
      );

      if (response.ok) {
        const savedUnit = await response.json();
        addNewSubTopicsUnit(savedUnit);
        handleClose();
      } else {
        throw new Error("Failed to save Sub Topic");
      }
    } catch (error) {
      setError("Error saving Sub Topic: " + error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      {/* Button to trigger modal */}
      <Button className="me-2 mb-2" onClick={handleShow}>
        Add Sub Topic
      </Button>

      {/* Fullscreen Modal */}
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Sub Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Active/Inactive Toggle */}
          <Form.Group
            className="mb-3 toggle-subject-active"
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

          {/* Subject Title */}
          <Form.Group className="mb-3" controlId="formSubjectTitle">
            <Form.Label>Sub Topic Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Sub Topic Name"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Subject URL */}
          <Form.Group className="mb-3" controlId="formSubjectURL">
            <Form.Label>Sub Topic URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Sub Topic URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </Form.Group>

          {/* Subject Description */}
          <Form.Group className="mb-3" controlId="formSubjectDescription">
            <Form.Label>Sub Topic Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter Sub Topic Description"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>

          {/* Error Message */}
          {error && <p className="text-danger">{error}</p>}
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

export default AddSubTopic;
