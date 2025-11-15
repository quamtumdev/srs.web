/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const AddExam = ({ addNewExam }) => {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [examTitle, setExamTitle] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedGuideline, setSelectedGuideline] = useState("");
  const [selectedMarkingScheme, setSelectedMarkingScheme] = useState("");
  const [description, setDescription] = useState(""); // Exam Description
  const [uniqueURL, setUniqueURL] = useState(""); // Unique URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Show Modal
  const handleShow = () => setShow(true);

  // Close Modal and Reset Form
  const handleClose = () => {
    setShow(false);
    setExamTitle("");
    setSelectedStream("");
    setSelectedGuideline("");
    setSelectedMarkingScheme("");
    setDescription("");
    setUniqueURL("");
    setIsActive(false);
    setError(null);
  };

  // Toggle Active Status
  const handleToggle = () => setIsActive(!isActive);

  // Handle Save Exam
  const handleSave = async () => {
    if (
      !examTitle ||
      !selectedStream ||
      !selectedGuideline ||
      !selectedMarkingScheme ||
      !description ||
      !uniqueURL
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    // Format Date
    const formattedDate = new Date().toISOString();

    // Build the exam object to match backend format
    const newExam = {
      title: examTitle,
      uniqueURL: uniqueURL,
      description: description,
      markingScheme: selectedMarkingScheme,
      guildeline: selectedGuideline, // Correct spelling of "guildeline"
      stream: selectedStream,
      createdOn: formattedDate, // Use current date as createdOn
      updatedOn: formattedDate, // Use current date as updatedOn
      active: isActive.toString(), // Convert boolean to string "true"/"false"
    };

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/exam/exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExam),
      });

      if (response.ok) {
        const savedExam = await response.json();
        addNewExam(savedExam); // Call parent's addNewExam function
        handleClose(); // Close the modal
      } else {
        throw new Error("Failed to save exam.");
      }
    } catch (error) {
      setError("Error saving exam: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleShow}>Add New Exam</Button>

      <Modal show={show} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Add Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Error Message */}
          {error && <p className="text-danger">{error}</p>}

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

          {/* Exam Title */}
          <Form.Group className="mb-3" controlId="formExamTitle">
            <Form.Label>Exam Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Exam Title"
              value={examTitle}
              onChange={e => setExamTitle(e.target.value)}
            />
          </Form.Group>

          {/* Unique URL */}
          <Form.Group className="mb-3" controlId="formUniqueURL">
            <Form.Label>Unique URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Unique URL"
              value={uniqueURL}
              onChange={e => setUniqueURL(e.target.value)}
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>

          {/* Stream Selection */}
          <Form.Group className="mb-3" controlId="formStreamSelect">
            <Form.Label>Stream</Form.Label>
            <Form.Control
              as="select"
              value={selectedStream}
              onChange={e => setSelectedStream(e.target.value)}
            >
              <option value="">Select Stream</option>
              <option value="Science">Science</option>
              <option value="Arts">Arts</option>
              <option value="Commerce">Commerce</option>
            </Form.Control>
          </Form.Group>

          {/* Guideline Selection */}
          <Form.Group className="mb-3" controlId="formGuidelineSelect">
            <Form.Label>Guideline</Form.Label>
            <Form.Control
              as="select"
              value={selectedGuideline}
              onChange={e => setSelectedGuideline(e.target.value)}
            >
              <option value="">Select Guideline</option>
              <option value="Guideline A">Guideline A</option>
              <option value="Guideline B">Guideline B</option>
              <option value="Guideline C">Guideline C</option>
            </Form.Control>
          </Form.Group>

          {/* Marking Scheme Selection */}
          <Form.Group className="mb-3" controlId="formMarkingSchemeSelect">
            <Form.Label>Marking Scheme</Form.Label>
            <Form.Control
              as="select"
              value={selectedMarkingScheme}
              onChange={e => setSelectedMarkingScheme(e.target.value)}
            >
              <option value="">Select Marking Scheme</option>
              <option value="Scheme A">Scheme A</option>
              <option value="Scheme B">Scheme B</option>
              <option value="Scheme C">Scheme C</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Exam"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddExam;
