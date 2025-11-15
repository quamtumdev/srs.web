import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap"; // To use Form components like Input
import { FaTimes } from "react-icons/fa"; // Import React Icons for close button
import "../../Admin/AdminJS.js";
import "../../Admin/AdminCSS.css";
// eslint-disable-next-line react/prop-types
function AddSubject({ addNewSubject }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState(""); // Subject content (text)
  const [streams, setStreams] = useState([]); // Multiple streams selected
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Available streams for selection
  const availableStreams = ["Commerce", "Medical", "Foundation", "Engineering"];

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
    setStreams([]); // Reset the streams
    setIsActive(false);
    setError(null);
  }

  // Toggle active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  // Handle stream selection
  const handleStreamChange = stream => {
    if (streams.includes(stream)) {
      // Remove stream if already selected
      setStreams(streams.filter(s => s !== stream));
    } else {
      // Add stream to selected list
      setStreams([...streams, stream]);
    }
  };

  // Remove a stream from selected list
  const removeStream = stream => {
    setStreams(streams.filter(s => s !== stream));
  };

  // Handle Save Subject

  const handleSave = async () => {
    // Basic validation
    if (!title || !url || !content || streams.length === 0) {
      setError(
        "Please provide a title, URL, description, and select at least one stream."
      );
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

    const newSubject = {
      title,
      url,
      content,
      stream: streams, // Send the entire streams array
      createdBy: "superadmin", // Default value
      createdOn: formattedDate, // Date in the desired format
      updatedBy: "superadmin", // Default value
      updatedOn: formattedDate, // Date in the desired format
      active: isActive,
    };

    setLoading(true); // Set loading state to true while saving

    try {
      // Send POST request to the backend to save the new subject
      const response = await fetch(
        "http://localhost:5000/api/auth/subject/subjects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSubject), // Send the entire subject object as JSON
        }
      );

      if (response.ok) {
        const savedSubject = await response.json();
        addNewSubject(savedSubject); // Add the new subject to the parent component's list
        handleClose(); // Close the modal and reset the form
      } else {
        const errorData = await response.json(); // Parse the error response
        setError(
          `Failed to save subject: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error details:", error); // Log the full error to console for debugging
      setError("Error saving subject: " + error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      {/* Button to trigger modal */}
      <Button className="me-2 mb-2" onClick={handleShow}>
        Add New Subject
      </Button>

      {/* Fullscreen Modal */}
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subject</Modal.Title>
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
            <Form.Label>Subject Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Subject Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Subject URL */}
          <Form.Group className="mb-3" controlId="formSubjectURL">
            <Form.Label>Subject URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Subject URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </Form.Group>

          {/* Subject Description */}
          <Form.Group className="mb-3" controlId="formSubjectDescription">
            <Form.Label>Subject Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter Subject Description"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>

          {/* Display selected streams above the checkboxes */}
          <div className="selected-streams">
            {streams.map(stream => (
              <span key={stream} className="selected-stream">
                {stream}
                <FaTimes
                  onClick={() => removeStream(stream)}
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                />
              </span>
            ))}
          </div>

          {/* Checkbox Selection for Streams */}
          <Form.Group className="mb-3" controlId="formSubjectStream">
            <Form.Label>Select Stream(s)</Form.Label>
            <div className="checkboxes">
              {availableStreams.map(stream => (
                <Form.Check
                  key={stream}
                  type="checkbox"
                  label={stream}
                  checked={streams.includes(stream)}
                  onChange={() => handleStreamChange(stream)} // Handle checkbox click
                />
              ))}
            </div>
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

export default AddSubject;
