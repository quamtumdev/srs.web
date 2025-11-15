import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap"; // To use Row and Col for grid layout
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import Stream from "./Stream.jsx";
import Tags from "./Tags.jsx";

// eslint-disable-next-line react/prop-types
function AddTestSeries({ addNewTestSeries }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState(""); // Test Series description (text)
  const [startDate, setStartDate] = useState(""); // Start date
  const [endDate, setEndDate] = useState(""); // End date
  const [maximumTest, setMaximumTest] = useState(""); // Maximum number of tests
  const [tags, setTags] = useState([]); // Tags
  const [stream, setStreams] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleSaveStreams = selectedStreams => {
    // Save selected streams data to state or directly to the backend
    setStreams(selectedStreams);
  };
  const handleSaveTags = tags => {
    console.log("Selected Tags:", tags);
    setTags(tags);
  };

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
    setStartDate("");
    setEndDate("");
    setMaximumTest("");
    setTags("");
    setIsActive(false);
    setError(null);
  }

  // Toggle active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  // Handle Save Test Series
  const handleSave = async () => {
    // Basic validation
    if (!title || !url || !stream || !startDate || !endDate || !maximumTest) {
      setError("Please provide all fields.");
      return;
    }

    // Format the dates (you can format it based on your required format, but we are keeping it simple)
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short", // Abbreviated month (e.g., "Feb")
      day: "2-digit", // Two-digit day (e.g., "10")
      hour: "2-digit", // Two-digit hour (e.g., "10")
      minute: "2-digit", // Two-digit minute (e.g., "18")
      hour12: true, // Use 12-hour format with AM/PM
    }).format(new Date());

    const newTestSeries = {
      title,
      url,
      content,
      startDate: formattedDate, // Use the raw date string input
      endDate: formattedDate, // Use the raw date string input
      stream,
      maximumTest,
      tags,
      createdOn: formattedDate,
      updatedOn: formattedDate,
      active: isActive,
    };

    setLoading(true); // Set loading state to true while saving

    try {
      // Send POST request to the backend to save the new Test Series
      const response = await fetch(
        "http://localhost:5000/api/auth/test-series", // Change endpoint to your actual API for Test Series
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTestSeries), // Convert the Test Series object to a JSON string
        }
      );

      if (response.ok) {
        const savedTestSeries = await response.json();
        addNewTestSeries(savedTestSeries); // Add the new Test Series to the parent component's list
        handleClose(); // Close the modal and reset the form
      } else {
        throw new Error("Failed to save Test Series.");
      }
    } catch (error) {
      setError("Error saving Test Series: " + error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      {/* Button to trigger modal */}
      <Button className="me-2 mb-2" onClick={handleShow}>
        Add New Test Series
      </Button>

      {/* Fullscreen Modal */}
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Test Series</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Active/Inactive Toggle */}
          <Form.Group
            className="mb-3 toggle-test-series-active"
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

          {/* Test Series Title */}
          <Form.Group className="mb-3" controlId="formTestSeriesTitle">
            <Form.Label>Test Series Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Test Series Name"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Test Series URL */}
          <Form.Group className="mb-3" controlId="formTestSeriesURL">
            <Form.Label>Test Series URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Test Series URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </Form.Group>

          {/* Test Series Description (Normal Text Input) */}
          <Form.Group className="mb-3" controlId="formTestSeriesDescription">
            <Form.Label>Test Series Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter Test Series Description"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>

          <Row>
            {/* Test Series Start Date */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formTestSeriesStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* Test Series End Date */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formTestSeriesEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Stream onSaveStreams={handleSaveStreams} />
            </Col>
            {/* Maximum Number of Tests */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formMaximumTest">
                <Form.Label>Maximum Number of Tests</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter maximum number of tests"
                  value={maximumTest}
                  onChange={e => setMaximumTest(e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* Tags */}
            <Col md={6}>
              <Tags onSaveTags={handleSaveTags} />
            </Col>
          </Row>

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

export default AddTestSeries;
