/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import styles from "../GuideLineUI/guideline.module.css"; // Import the CSS Module
import Stream from "./Stream.jsx";
import Tags from "./Tags.jsx";

import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";

const EditTestSeries = ({ testSeries, setTestSeriesData, closeEditModal }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState(""); // Keep content as plain text
  const [isActive, setIsActive] = useState(false); // Active status
  const [startDate, setStartDate] = useState(""); // Start date
  const [endDate, setEndDate] = useState(""); // End date
  const [maximumTest, setMaximumTest] = useState(""); // Maximum number of tests
  const [tags, setTags] = useState([]); // Tags
  const [stream, setStreams] = useState([]);
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track errors

  // Set form values when the modal is opened
  useEffect(() => {
    if (testSeries) {
      setTitle(testSeries.title);
      setUrl(testSeries.url);
      setContent(testSeries.content);
      setIsActive(testSeries.active);
      const formattedStartDate = new Date(testSeries.startDate)
        .toISOString()
        .split("T")[0];
      const formattedEndDate = new Date(testSeries.endDate)
        .toISOString()
        .split("T")[0];

      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);

      setMaximumTest(testSeries.maximumTest);
      setStreams(testSeries.stream);
      setTags(testSeries.tags);
    }
  }, [testSeries]);

  const handleSaveStreams = updatedStreams => {
    // Save selected streams data to state or directly to the backend
    setStreams(updatedStreams);
  };
  const handleSaveTags = selectedTags => {
    setTags(selectedTags); // Save the selected tags to the state
    console.log("Selected Tags:", selectedTags);
  };
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

  // Handle saving the updated test series
  const handleSave = async () => {
    setLoading(true); // Set loading to true while making the API request
    try {
      const updatedTestSeries = {
        ...testSeries,
        title,
        url,
        content,
        startDate,
        endDate,
        maximumTest,
        stream,
        tags,
        active: isActive,
        updatedBy: "admin",
        updatedOn: formatDate(),
      };

      const response = await fetch(
        `http://localhost:5000/api/auth/test-series/${testSeries._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTestSeries),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update test series");
      }

      const updatedData = await response.json();
      // Update the test series list with the modified test series
      setTestSeriesData(prevData =>
        prevData.map(s => (s._id === testSeries._id ? updatedData : s))
      );

      closeEditModal(); // Close the modal after saving
    } catch (error) {
      setError("Error updating test series: " + error.message); // Handle error
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  // Toggle the active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  // Handle test series deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test series?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/test-series/${testSeries._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete test series");
        }

        // After deletion, update the test series list
        setTestSeriesData(prevData =>
          prevData.filter(s => s._id !== testSeries._id)
        );

        closeEditModal(); // Close the modal after deleting
      } catch (error) {
        setError("Error deleting test series: " + error.message); // Handle error
      }
    }
  };

  return (
    <Modal show={true} onHide={closeEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Test Series</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          maxHeight: "70vh", // Sets the max height of modal body
          overflowY: "auto", // Enables scrolling
        }}
      >
        <Form>
          {/* Active/Inactive Toggle */}
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formActiveToggle">
                <Form.Check
                  type="switch"
                  id="active-toggle"
                  label={isActive ? "Active" : "Inactive"}
                  checked={isActive}
                  onChange={handleToggle}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Test Series Title */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formTestSeriesTitle">
                <Form.Label>Test Series Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Enter title"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Test Series URL */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formTestSeriesURL">
                <Form.Label>Test Series URL</Form.Label>
                <Form.Control
                  type="text"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="Enter test series URL"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Test Series Content (Plain Text) */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formTestSeriesContent">
                <Form.Label>Test Series Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Enter test series content"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {/* Test Series Start Date */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formTestSeriesStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate || ""}
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
                  value={endDate || ""}
                  onChange={e => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Stream
                onSaveStreams={handleSaveStreams}
                selectedStreams={stream}
              />
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
              <Tags onSaveTags={handleSaveTags} selectedTags={tags} />
            </Col>
          </Row>
          {/* Error message */}
          {error && (
            <Row>
              <Col>
                <p className="text-danger">{error}</p>
              </Col>
            </Row>
          )}
        </Form>
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

export default EditTestSeries;
