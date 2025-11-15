/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

import "../../../Admin/AdminJS.js";
import "../../../Admin/AdminCSS.css";

function EditSubTopic({ topic, setSubTopicsUnits, closeEditModal }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (topic) {
      setTitle(topic.title);
      setUrl(topic.url);
      setContent(topic.content);
      setIsActive(topic.active);
    }
  }, [topic]);

  const formatDate = () => {
    const date = new Date();
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedSubTopic = {
        ...topic,
        title,
        url,
        content,
        active: isActive,
        updatedBy: "admin",
        updatedOn: formatDate(),
      };

      const response = await fetch(
        `http://localhost:5000/api/auth/subtopic/subtopic/${topic._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSubTopic),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update Sub Topic");
      }

      const updatedData = await response.json();

      setSubTopicsUnits(prevData =>
        prevData.map(topic =>
          topic._id === updatedData._id ? updatedData : topic
        )
      );

      closeEditModal(); // Close the modal after saving
    } catch (error) {
      setError("Error updating Edit Sub Topic: " + error.message); // Handle error
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
      "Are you sure you want to delete this Units?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/subtopic/subtopic/${topic._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete Sub Topics");
        }

        // After deletion, update the streams list
        setSubTopicsUnits(prevData =>
          prevData.filter(s => s._id !== topic._id)
        );

        closeEditModal(); // Close the modal after deleting
      } catch (error) {
        setError("Error deleting Units: " + error.message); // Handle error
      }
    }
  };

  return (
    <Modal show={true} onHide={closeEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Sub Topic</Modal.Title>
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

        {/* Stream Title */}
        <Form.Group className="mb-3" controlId="formSubjectTitle">
          <Form.Label>Sub Topic Name</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter Sub Topic Name"
          />
        </Form.Group>

        {/* Stream URL */}
        <Form.Group className="mb-3" controlId="formSubjectURL">
          <Form.Label>Sub Topic URL</Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Enter Sub Topic URL"
          />
        </Form.Group>

        {/* Stream Content (Plain Text) */}
        <Form.Group className="mb-3" controlId="formSubjectDescription">
          <Form.Label>Sub Topic Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Enter Sub Topic Description"
          />
        </Form.Group>

        {/* Error message */}
        {error && <p className="text-danger">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="btn-cancle-back"
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
          className="btn-cancle-back"
          onClick={handleSave}
          disabled={loading} // Disable save button while loading
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditSubTopic;
