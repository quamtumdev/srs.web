/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FaTimes } from "react-icons/fa"; // React Icons for removing selected streams
import "../../Admin/AdminJS.js";
import "../../Admin/AdminCSS.css";
function EditSubject({ subject, setSubjectsData, closeEditModal }) {
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Available streams for selection
  const availableStreams = ["Commerce", "Medical", "Foundation", "Engineering"];

  // Set form values when the modal is opened or subject changes
  useEffect(() => {
    if (subject) {
      setTitle(subject.title);
      setUrl(subject.url);
      setContent(subject.content);
      setIsActive(subject.active);
      setStreams(subject.stream);
    }
  }, [subject]);

  // Close modal and clear form
  function handleClose() {
    closeEditModal();
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

  // Format the current date as 'Nov 20, 2024, 12:58 PM'
  const formatDate = () => {
    const date = new Date();
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short", // Abbreviated month (e.g., "Nov")
      day: "2-digit", // Two-digit day (e.g., "20")
      hour: "2-digit", // Two-digit hour (e.g., "12")
      minute: "2-digit", // Two-digit minute (e.g., "58")
      hour12: true, // Use 12-hour format with AM/PM
    }).format(date);
  };

  const handleSave = async () => {
    setLoading(true); // Set loading to true while making the API request
    try {
      const updatedSubject = {
        ...subject,
        title,
        url,
        content,
        active: isActive,
        updatedBy: "admin",
        updatedOn: formatDate(),
      };

      const response = await fetch(
        `http://localhost:5000/api/auth/subjects/subjects/${subject._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSubject),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update stream");
      }

      const updatedData = await response.json();
      // Update the streams list with the modified stream
      setSubjectsData(prevData =>
        prevData.map(s => (s._id === subject._id ? updatedData : s))
      );

      closeEditModal(); // Close the modal after saving
    } catch (error) {
      setError("Error updating subject: " + error.message); // Handle error
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  // Handle Delete Subject
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/subjects/subjects/${subject._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete subject");
        }

        // After deletion, update the streams list
        setSubjectsData(prevData =>
          prevData.filter(s => s._id !== subject._id)
        );

        closeEditModal(); // Close the modal after deleting
      } catch (error) {
        setError("Error deleting subject: " + error.message); // Handle error
      }
    }
  };

  return (
    <>
      {/* Fullscreen Modal */}
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Active/Inactive Toggle */}
          <Form.Group className="mb-3" controlId="formActiveToggle">
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
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete} // Trigger delete
          >
            Delete
          </Button>
          <Button
            variant="primary"
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

export default EditSubject;
