import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap"; // To use Form components like Input
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";

// eslint-disable-next-line react/prop-types
function AddStream({ addNewStream }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState(""); // Stream description (text)
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

  // Handle Save Stream
  const handleSave = async () => {
    // Basic validation
    if (!title || !url || !content) {
      setError("Please provide a title, URL, and description.");
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

    const newStream = {
      title,
      url,
      content,
      createdOn: formattedDate,
      updatedOn: formattedDate,
      active: isActive,
    };

    setLoading(true); // Set loading state to true while saving

    try {
      // Send POST request to the backend to save the new stream
      const response = await fetch(
        "http://localhost:5000/api/auth/stream/streams",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStream), // Convert the stream object to a JSON string
        }
      );

      if (response.ok) {
        const savedStream = await response.json();
        addNewStream(savedStream); // Add the new stream to the parent component's list
        handleClose(); // Close the modal and reset the form
      } else {
        throw new Error("Failed to save stream.");
      }
    } catch (error) {
      setError("Error saving stream: " + error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      {/* Button to trigger modal */}
      <Button className="me-2 mb-2" onClick={handleShow}>
        Add New Stream
      </Button>

      {/* Fullscreen Modal */}
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Stream</Modal.Title>
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
            <Form.Label>Stream Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Stream Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Stream URL */}
          <Form.Group className="mb-3" controlId="formStreamURL">
            <Form.Label>Stream URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Stream URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </Form.Group>

          {/* Stream Description (Normal Text Input) */}
          <Form.Group className="mb-3" controlId="formStreamDescription">
            <Form.Label>Stream Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter Stream Description"
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

export default AddStream;
