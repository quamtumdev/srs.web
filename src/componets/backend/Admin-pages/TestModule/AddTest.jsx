import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap"; // To use Form components like Input
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import ExamType from "./ExamType.jsx";
import TestTypeWithSubTopic from "./TestTypeWithSubTopic.jsx";
import Guideline from "./Guideline.jsx";
import MarkingSchme from "./MarkingSchme.jsx";
import Tags from "./Tags.jsx";

import SectionInput from "./SectionInput.jsx";

// eslint-disable-next-line react/prop-types
function AddTest({ addNewTest }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isActiveHasSection, setIsActiveHasSection] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [examType, setExamType] = useState(null);
  const [testType, setTestType] = useState(null);
  const [subTopic, setSubTopic] = useState("");
  const [subjectsData, setSubjectsData] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [topic, setTopic] = useState("");
  const [unit, setUnit] = useState("");
  const [maxQuestions, setMaxQuestions] = useState("");
  const [duration, setDuration] = useState("");
  const [guideline, setGuideline] = useState(null);
  const [markingScheme, setMarkingScheme] = useState(null);
  const [startDate, setStartDate] = useState(""); // Start date
  const [endDate, setEndDate] = useState(""); // End date
  const [solutionUnlockDate, setSolutionUnlockDate] = useState("");
  const [tags, setTags] = useState([]); // Tags
  const [sections, setSections] = useState([
    {
      sectionName: "",
      sectionDescription: "",
      sectionDisplayOrder: "",
      sectionGuideline: "",
      sectionMarkingScheme: "",
      isActiveSection: false,
    },
  ]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleAddNewSection = () => {
    setSections([
      ...sections,
      {
        sectionName: "",
        sectionDescription: "",
        sectionDisplayOrder: "",
        sectionGuideline: "",
        sectionMarkingScheme: "",
        isActiveSection: false,
      },
    ]); // Add a new empty section
  };

  // Handle the change of any section field
  const handleFieldChange = (index, field, value) => {
    const updatedSections = [...sections];
    if (field === "isActiveSection") {
      // Toggle logic for isActiveSection
      updatedSections[index][field] = !updatedSections[index][field];
    } else {
      updatedSections[index][field] = value;
    }
    setSections(updatedSections);
  };

  // Handle Delete for a specific SectionInput component
  const handleDeleteSection = index => {
    if (index !== 0) {
      // Prevent deletion of the first section (index 0)
      const updatedSections = sections.filter((_, idx) => idx !== index);
      setSections(updatedSections); // Remove the section at the clicked index
    }
  };
  const handleTogglehasSection = () => {
    setIsActiveHasSection(prevState => !prevState);
  };

  const handleSaveTags = tags => {
    setTags(tags);
  };

  const handleMarkingSchemeChange = selectedOption => {
    setMarkingScheme(selectedOption); // Update state with the selected option
  };

  const handleSaveGuideline = selectedGuideline => {
    setGuideline(selectedGuideline); // Store the selected guideline in state
  };
  // Save exam type
  const handleSaveExamType = selectedExamType => {
    setExamType(selectedExamType); // Update the selected exam type in the state
  };

  // Save test type
  const handleSaveTestType = selectedTestType => {
    setTestType(selectedTestType); // Set test type in parent
    setSubTopic(""); // Reset sub-topic when test type changes
  };

  const handleSaveSubTopic = newSubTopic => {
    setSubTopic(newSubTopic); // Set sub-topic in parent
  };
  const handleSaveSubject = newSubject => {
    setSubjectsData(newSubject); // Set sub-topic in parent
  };
  const handleSaveSyllabus = syllabus => {
    setSyllabus(syllabus);
  };

  const handleSaveTopic = newtopic => {
    setTopic(newtopic);
  };

  const handleSaveUnit = unit => {
    setUnit(unit);
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
    setIsActive(false);
    setError(null);
    setTestType(null); // Reset test type
    setSubTopic("");
    setExamType("");
    setTestType("");
    setSubTopic("");
    setSyllabus("");
    setUnit("");
    setTopic("");
    setSubjectsData("");
    setMaxQuestions("");
    setDuration("");
    setGuideline("");
    setMarkingScheme("");
    setStartDate("");
    setEndDate("");
    setSolutionUnlockDate("");
    setTags("");
    setSections("");
    setIsActiveHasSection("");
  }

  // Toggle active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  // Handle Save Test
  const handleSave = async () => {
    // Basic validation
    if (
      !title ||
      !url ||
      !examType ||
      !testType ||
      !maxQuestions ||
      !duration ||
      !guideline ||
      !markingScheme ||
      !startDate ||
      !endDate ||
      !tags ||
      !solutionUnlockDate
    ) {
      setError("Please provide a title, URL, and description.");
      return;
    }

    if (!Array.isArray(tags) || tags.length === 0) {
      setError("Please provide at least one tag.");
      return;
    }

    // Format the date
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());

    // Assume sections state holds all sections added
    const formattedSections = sections.map(section => ({
      sectionName: section.sectionName,
      sectionDescription: section.sectionDescription,
      sectionDisplayOrder: section.sectionDisplayOrder,
      sectionGuideline: section.sectionGuideline,
      sectionMarkingScheme: section.sectionMarkingScheme,
      isActiveSection: section.isActiveSection,
    }));

    const newTest = {
      title,
      url,
      content,
      examType,
      testType: [
        {
          testType,
          subTopic,
          subjectsData,
          syllabus,
          topic,
          unit,
        },
      ],
      maxQuestions,
      duration,
      guideline,
      markingScheme,
      startDate,
      endDate,
      solutionUnlockDate,
      tags,
      isActiveHasSection,
      sections: formattedSections, // Include the sections array here
      createdOn: formattedDate,
      updatedOn: formattedDate,
      active: isActive,
    };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/testlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTest),
      });

      if (response.ok) {
        const savedTest = await response.json();
        addNewTest(savedTest);
        handleClose();
      } else {
        throw new Error("Failed to save test.");
      }
    } catch (error) {
      setError("Error saving test: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button to trigger modal */}
      <Button className="me-2 mb-2" onClick={handleShow}>
        Add New Test
      </Button>

      {/* Fullscreen Modal */}
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Active/Inactive Toggle */}
          <Form.Group
            className="mb-3 toggle-test-active"
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

          {/* Test Title */}
          <Form.Group className="mb-3" controlId="formTestTitle">
            <Form.Label>Test Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Test Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Test URL */}
          <Form.Group className="mb-3" controlId="formTestURL">
            <Form.Label>Test URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Test URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </Form.Group>

          {/* Test Description */}
          <Form.Group className="mb-3" controlId="formTestDescription">
            <Form.Label>Test Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter Test Description"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              {/* Exam Type */}
              <ExamType
                onSaveExamType={handleSaveExamType}
                selectedExamType={examType}
              />
            </Col>
            <Col md={6}>
              <TestTypeWithSubTopic
                onSaveTestType={handleSaveTestType}
                selectedTestType={testType}
                onSaveSubTopic={handleSaveSubTopic}
                subTopic={subTopic}
                onSaveSubject={handleSaveSubject}
                subjectsData={subjectsData}
                onSaveSyllabus={handleSaveSyllabus}
                syllabus={syllabus}
                onSaveTopic={handleSaveTopic}
                topic={topic}
                onSaveUnit={handleSaveUnit}
                unit={unit}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formTestURL">
                <Form.Label>Max Questions</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Enter Test Max Questions"
                  value={maxQuestions}
                  onChange={e => setMaxQuestions(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formTestURL">
                <Form.Label>Duration In Minute</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Enter Test Duration In Minute"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Guideline onSaveGuideline={handleSaveGuideline} />
            </Col>
            <Col md={6}>
              <MarkingSchme onSaveMarkingScheme={handleMarkingSchemeChange} />
            </Col>
          </Row>

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
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formTestSeriesEndDate">
                <Form.Label>Solution Unlock Date</Form.Label>
                <Form.Control
                  type="date"
                  value={solutionUnlockDate}
                  onChange={e => setSolutionUnlockDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Tags onSaveTags={handleSaveTags} />
            </Col>
          </Row>
          <div>
            <Form.Group
              className="mb-3 toggle-test-active"
              controlId="formActiveToggle"
            >
              <span>Has Section</span>
              <Form.Check
                type="switch"
                id="active-toggle"
                label={isActiveHasSection ? "Active" : "Inactive"}
                checked={isActiveHasSection}
                onChange={handleTogglehasSection}
              />
            </Form.Group>
            {isActiveHasSection && (
              <div>
                {sections.map((section, index) => (
                  <div key={index} className="test-section">
                    <h4>Section - {index + 1}</h4>
                    <SectionInput
                      sectionName={section.sectionName}
                      setSectionName={value =>
                        handleFieldChange(index, "sectionName", value)
                      }
                      sectionDescription={section.sectionDescription}
                      setSectionDescription={value =>
                        handleFieldChange(index, "sectionDescription", value)
                      }
                      sectionDisplayOrder={section.sectionDisplayOrder}
                      setSectionDisplayOrder={value =>
                        handleFieldChange(index, "sectionDisplayOrder", value)
                      }
                      sectionGuideline={section.sectionGuideline}
                      setSectionGuideline={value =>
                        handleFieldChange(index, "sectionGuideline", value)
                      }
                      sectionMarkingScheme={section.sectionMarkingScheme}
                      setSectionMarkingScheme={value =>
                        handleFieldChange(index, "sectionMarkingScheme", value)
                      }
                      isActiveSection={section.isActiveSection}
                      setIsActiveSection={value =>
                        handleFieldChange(index, "isActiveSection", value)
                      }
                    />
                    {/* Add Delete Button for each SectionInput except for the first one (index 0) */}
                    {index !== 0 && (
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteSection(index)}
                        style={{ marginTop: "10px" }}
                      >
                        Delete Section
                      </Button>
                    )}
                  </div>
                ))}

                {/* Button to Add New Section - Only shows if 'isActiveHasSection' is true */}
                <Button variant="primary" onClick={handleAddNewSection}>
                  Add New Section
                </Button>
              </div>
            )}
          </div>
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

export default AddTest;
