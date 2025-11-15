/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

import "../../../Admin/AdminJS.js";
import "../../../Admin/AdminCSS.css";

function EditInnerSubjectUnit({ unit, setInnerSubjectUnits, closeEditModal }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState(""); // Keep content as plain text
  const [isActive, setIsActive] = useState(false); // Active status
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track errors

  // Set form values when the modal is opened
  useEffect(() => {
    console.log(unit);
    if (unit) {
      setTitle(unit.title);
      setUrl(unit.url);
      setContent(unit.content); // Plain text content
      setIsActive(unit.active);
    }
  }, [unit]); // Dependency on unit prop

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
      const updatedInnerSubject = {
        ...unit,
        title,
        url,
        content, // Plain text content
        active: isActive, // Include the updated active status
        updatedBy: "admin",
        updatedOn: formatDate(), // Use the formatted date
      };

      const response = await fetch(
        `http://localhost:5000/api/auth/innerSubjectUnits/innerSubjectUnits/${unit._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedInnerSubject),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update InnerUnits");
      }

      const updatedData = await response.json();

      // Update the innerSubjectUnits in the parent component (passed via props)
      setInnerSubjectUnits(prevData =>
        prevData.map(unit =>
          unit._id === updatedData._id ? updatedData : unit
        )
      );

      closeEditModal(); // Close the modal after saving
    } catch (error) {
      setError("Error updating Edit InnerSubject Units: " + error.message); // Handle error
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
          `http://localhost:5000/api/auth/innerSubjectUnits/innerSubjectUnits/${unit._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete Units");
        }

        // After deletion, update the streams list
        setInnerSubjectUnits(prevData =>
          prevData.filter(s => s._id !== unit._id)
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
        <Modal.Title>Edit Stream</Modal.Title>
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
          <Form.Label>Unit Name</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter Unit Name"
          />
        </Form.Group>

        {/* Stream URL */}
        <Form.Group className="mb-3" controlId="formSubjectURL">
          <Form.Label>Unit URL</Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Enter Unit URL"
          />
        </Form.Group>

        {/* Stream Content (Plain Text) */}
        <Form.Group className="mb-3" controlId="formSubjectDescription">
          <Form.Label>Unit Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Enter Unit Description"
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

export default EditInnerSubjectUnit;
