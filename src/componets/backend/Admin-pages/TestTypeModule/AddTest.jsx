import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap"; // To use Form components like Input
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";

// eslint-disable-next-line react/prop-types
function AddTest({ addNewTests }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [testScope, setTestScope] = useState("");
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
    setDescription("");
    setTestScope("");
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
    if (!title || !url || !description || !testScope) {
      setError("Please provide a title, URL, and description. , TestScope");
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

    const newTests = {
      title,
      url,
      description,
      testScope,
      createdBy: "superadmin",
      createdOn: formattedDate,
      updatedBy: "superadmin",
      updatedOn: formattedDate,
      active: isActive,
    };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/test/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTests), // Convert the stream object to a JSON string
      });

      if (response.ok) {
        const savedTest = await response.json();
        addNewTests(savedTest); // Add the new stream to the parent component's list
        handleClose(); // Close the modal and reset the form
      } else {
        throw new Error("Failed to save Tests");
      }
    } catch (error) {
      setError("Error saving Test: " + error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      {/* Button to trigger modal */}
      <Button className="me-2 mb-2" onClick={handleShow}>
        Add New Test Type
      </Button>

      {/* Fullscreen Modal */}
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Test Types</Modal.Title>
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
            <Form.Label>Test Type Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Test Type Name"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Stream URL */}
          <Form.Group className="mb-3" controlId="formStreamURL">
            <Form.Label>Test Type URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Test Type Name URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </Form.Group>

          {/* Stream Description (Normal Text Input) */}
          <Form.Group className="mb-3" controlId="formStreamDescription">
            <Form.Label>Test Type Name Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter Stream Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStreamSelect">
            <Form.Label>Stream</Form.Label>
            <Form.Control
              as="select"
              value={testScope}
              onChange={e => setTestScope(e.target.value)}
            >
              <option value="">Select Test Scope</option>
              <option value="Any">Any</option>
              <option value="Subject">Subject</option>
              <option value="Unit">Unit</option>
              <option value="Sub_Topic">Sub_Topic</option>
            </Form.Control>
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

export default AddTest;
