/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import styles from "../../Admin-pages/GuideLineUI/guideline.module.css"; // Import the CSS Module
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";

const EditTest = ({ test, setTestsData, closeEditModal }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [testScope, setTestScope] = useState("");

  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (test) {
      setTitle(test.title);
      setUrl(test.url);
      setDescription(test.description);
      setTestScope(test.testScope);

      setIsActive(test.active);
    }
  }, [test]);

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
      const updatedTest = {
        ...test,
        title,
        url,
        description,
        testScope,
        active: isActive,
        updatedBy: "admin",
        updatedOn: formatDate(),
      };

      const response = await fetch(
        `http://localhost:5000/api/auth/test/test/${test._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTest),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update Test: ${response.statusText}`);
      }

      const updatedData = await response.json();

      setTestsData(prevData =>
        prevData.map(s => (s._id === test._id ? updatedData : s))
      );

      closeEditModal();
    } catch (error) {
      setError("Error updating test: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle the active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  //   // Handle stream deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stream?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/test/test/${test._id}`,
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
        setTestsData(prevData => prevData.filter(s => s._id !== test._id));

        closeEditModal(); // Close the modal after deleting
      } catch (error) {
        setError("Error deleting stream: " + error.message); // Handle error
      }
    }
  };

  return (
    <Modal show={true} onHide={closeEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Test Type</Modal.Title>
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
          <Form.Label>Test Type Name</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </Form.Group>

        {/* Stream URL */}
        <Form.Group className={`mb-3 ${styles.formControl}`}>
          <Form.Label>Test Type URL</Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Enter stream URL"
          />
        </Form.Group>

        <Form.Group className={`mb-3 ${styles.formControl}`}>
          <Form.Label> Test Type Name Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter Test Type Name Description "
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formStreamSelect">
          <Form.Label>Test Scope</Form.Label>
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

export default EditTest;
