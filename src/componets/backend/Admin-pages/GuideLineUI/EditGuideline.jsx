/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import ReactQuill from "react-quill"; // Import react-quill for the rich text editor
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import styles from "./guideline.module.css"; // Import the CSS Module
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";

const EditGuideline = ({ guideline, setGuidelinesData, closeEditModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Keep content as HTML or Delta
  const [isActive, setIsActive] = useState(false); // Active status
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track errors

  // Set form values when the modal is opened
  useEffect(() => {
    if (guideline) {
      setTitle(guideline.title);

      // Check if the content is an array or HTML and handle accordingly
      if (Array.isArray(guideline.content)) {
        setContent(guideline.content.join("\n"));
      } else {
        setContent(guideline.content);
      }

      // Set the active status of the guideline
      setIsActive(guideline.active);
    }
  }, [guideline]);

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

  // Handle saving the updated guideline
  const handleSave = async () => {
    setLoading(true); // Set loading to true while making the API request
    try {
      const updatedGuideline = {
        ...guideline,
        title,
        content, // Save content as raw HTML or Delta
        active: isActive, // Include the updated active status
        updatedBy: "admin", // You can dynamically set this based on user data
        updatedOn: formatDate(), // Use the formatted date
      };

      const response = await fetch(
        `http://localhost:5000/api/auth/guideline/guidelines/${guideline._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedGuideline),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update guideline");
      }

      const updatedData = await response.json();
      // Update the guidelines list with the modified guideline
      setGuidelinesData(prevData =>
        prevData.map(g => (g._id === guideline._id ? updatedData : g))
      );

      closeEditModal(); // Close the modal after saving
    } catch (error) {
      setError("Error updating guideline: " + error.message); // Handle error
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  // Toggle the active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  // Handle guideline deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this guideline?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/guideline/guidelines/${guideline._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete guideline");
        }

        // After deletion, update the guidelines list
        setGuidelinesData(prevData =>
          prevData.filter(g => g._id !== guideline._id)
        );

        closeEditModal(); // Close the modal after deleting
      } catch (error) {
        setError("Error deleting guideline: " + error.message); // Handle error
      }
    }
  };

  return (
    <Modal show={true} onHide={closeEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Guideline</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Active/Inactive Toggle */}
        <Form.Group
          className={`mb-3 ${styles.toggleGuidelineActive}`}
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

        {/* Guideline Title */}
        <Form.Group className={`mb-3 ${styles.formControl}`}>
          <Form.Label>Guideline Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </Form.Group>

        {/* Guideline Content */}
        <Form.Group className={`mb-3 ${styles.formControl}`}>
          <Form.Label>Guideline Content</Form.Label>
          <ReactQuill
            value={content} // Use raw HTML or Delta for the content
            onChange={setContent} // Allow Quill to update the content
            placeholder="Enter guideline content"
            theme="snow"
          />
        </Form.Group>

        {/* Preview Section */}
        <div className="preview-section mt-4">
          <h5>Preview</h5>
          <div
            className={styles.previewContent} // Apply styles from the CSS module
            dangerouslySetInnerHTML={{ __html: content }} // Render HTML content for preview
          />
        </div>

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

export default EditGuideline;
