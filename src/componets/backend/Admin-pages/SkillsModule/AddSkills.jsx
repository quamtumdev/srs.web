import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap"; // To use Form components like Input
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";

// eslint-disable-next-line react/prop-types
function AddSkills({ addNewSkills }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Handle Save Stream
  const handleSave = async () => {
    // Basic validation
    if (!title || !url || !content) {
      setError("Please provide a title, URL, and description.");
      return;
    }

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());

    const newSkills = {
      title,
      url,
      content,
      createdOn: formattedDate,
      updatedOn: formattedDate,
      active: isActive,
    };

    setLoading(true);

    try {
      // Send POST request to the backend to save the new stream
      const response = await fetch(
        "http://localhost:5000/api/auth/skills/skills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSkills), // Convert the stream object to a JSON string
        }
      );

      if (response.ok) {
        const savedStream = await response.json();
        addNewSkills(savedStream); // Add the new stream to the parent component's list
        handleClose(); // Close the modal and reset the form
      } else {
        throw new Error("Failed to save skills.");
      }
    } catch (error) {
      setError("Error saving skills: " + error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      {/* Button to trigger modal */}
      <Button className="me-2 mb-2" onClick={handleShow}>
        Add New Skills
      </Button>

      {/* Fullscreen Modal */}
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Skills</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Active/Inactive Toggle */}
          <Form.Group
            className="mb-3 toggle-stream-active"
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

          {/* Stream Title */}
          <Form.Group className="mb-3" controlId="formStreamTitle">
            <Form.Label>Skill Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Stream Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Stream URL */}
          <Form.Group className="mb-3" controlId="formStreamURL">
            <Form.Label>Skill URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Skills URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </Form.Group>

          {/* Stream Description (Normal Text Input) */}
          <Form.Group className="mb-3" controlId="formStreamDescription">
            <Form.Label>Skill Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter Skill Description"
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

export default AddSkills;
