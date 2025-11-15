/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import styles from "../GuideLineUI/guideline.module.css"; // Import the CSS Module
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";

const EditStream = ({ stream, setStreamsData, closeEditModal }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState(""); // Keep content as plain text
  const [isActive, setIsActive] = useState(false); // Active status
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track errors

  // Set form values when the modal is opened
  useEffect(() => {
    if (stream) {
      setTitle(stream.title);
      setUrl(stream.url);
      setContent(stream.content); // Plain text content
      setIsActive(stream.active);
    }
  }, [stream]);

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

  // Handle saving the updated stream
  const handleSave = async () => {
    setLoading(true); // Set loading to true while making the API request
    try {
      const updatedStream = {
        ...stream,
        title,
        url,
        content,
        active: isActive,
        updatedBy: "admin",
        updatedOn: formatDate(),
      };

      const response = await fetch(
        `http://localhost:5000/api/auth/stream/streams/${stream._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStream),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update stream");
      }

      const updatedData = await response.json();
      // Update the streams list with the modified stream
      setStreamsData(prevData =>
        prevData.map(s => (s._id === stream._id ? updatedData : s))
      );

      closeEditModal(); // Close the modal after saving
    } catch (error) {
      setError("Error updating stream: " + error.message); // Handle error
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  // Toggle the active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  // Handle stream deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stream?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/stream/streams/${stream._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete stream");
        }

        // After deletion, update the streams list
        setStreamsData(prevData => prevData.filter(s => s._id !== stream._id));

        closeEditModal(); // Close the modal after deleting
      } catch (error) {
        setError("Error deleting stream: " + error.message); // Handle error
      }
    }
  };

  return (
    <Modal show={true} onHide={closeEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Stream</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Active/Inactive Toggle */}
        <Form.Group
          className={`mb-3 ${styles.toggleStreamActive}`}
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
        <Form.Group className={`mb-3 ${styles.formControl}`}>
          <Form.Label>Stream Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </Form.Group>

        {/* Stream URL */}
        <Form.Group className={`mb-3 ${styles.formControl}`}>
          <Form.Label>Stream URL</Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Enter stream URL"
          />
        </Form.Group>

        {/* Stream Content (Plain Text) */}
        <Form.Group className={`mb-3 ${styles.formControl}`}>
          <Form.Label>Stream Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Enter stream content"
          />
        </Form.Group>

        {/* Error message */}
        {error && <p className="text-danger">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className={`btn-cancle-back ${styles.btnCancelBack}`}
          onClick={closeEditModal}
        >
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
          className={`btn-cancle-back ${styles.btnCancelBack}`}
          onClick={handleSave}
          disabled={loading} // Disable save button while loading
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditStream;
