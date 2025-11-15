/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import styles from "../GuideLineUI/guideline.module.css"; // Import the CSS Module
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import ExamType from "./ExamType.jsx";
import TestTypeWithSubTopic from "./TestTypeWithSubTopic.jsx";
import Guideline from "./Guideline.jsx";
import MarkingSchme from "./MarkingSchme.jsx";
import Tags from "./Tags.jsx";
import SectionInput from "./SectionInput.jsx";
const EditTest = ({ test, setTestsData, closeEditModal }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isActiveHasSection, setIsActiveHasSection] = useState(false);
  const [examType, setExamType] = useState([]);
  const [testType, setTestType] = useState(null);
  const [subTopic, setSubTopic] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [topic, setTopic] = useState("");
  const [unit, setUnit] = useState("");
  const [subjectsData, setSubjectsData] = useState("");
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
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track errors

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

  const handleSaveExamType = updatedExamType => {
    setExamType(updatedExamType);
  };
  const handleSaveTestType = updatedTestType => {
    setTestType(updatedTestType);
  };

  const handleSaveSubTopic = newSubTopic => {
    setSubTopic(newSubTopic); // Set sub-topic in parent
  };
  const handleSaveSyllabus = syllabus => {
    setSyllabus(syllabus);
  };
  const handleSaveSubject = newSubject => {
    setSubjectsData(newSubject); // Set sub-topic in parent
  };
  const handleSaveTopic = newtopic => {
    setTopic(newtopic);
  };

  const handleSaveUnit = newUnit => {
    setUnit(newUnit);
  };

  const handleSaveTags = updatedTags => {
    setTags(updatedTags);
  };

  const handleMarkingSchemeChange = updatedMarkingScheme => {
    setMarkingScheme(updatedMarkingScheme);
  };

  const handleSaveGuideline = selectedGuideline => {
    setGuideline(selectedGuideline); // Store the selected guideline in state
  };
  // Set form values when the modal is opened
  useEffect(() => {
    if (test) {
      console.log("Test data received:", test); // Log to inspect test data

      // Update individual state fields
      setTitle(test.title);
      setUrl(test.url);
      setContent(test.content); // Assuming content is an array, take the first element
      setIsActive(test.active);
      setExamType(test.examType); // Assuming examType is an array, take the first element

      // Check if testType array has any elements
      if (test.testType && test.testType.length > 0) {
        const firstTestType = test.testType[0]; // Get the first element of the testType array

        setTestType(firstTestType.testType[0] || ""); // Assuming testType is an array, take the first element
        setSubTopic(firstTestType.subTopic[0] || ""); // Assuming subTopic is an array, take the first element
        setSyllabus(firstTestType.syllabus[0] || ""); // Assuming syllabus is an
        setSubjectsData(firstTestType.subjectsData[0] || "");
        setTopic(firstTestType.topic[0] || ""); // Assuming topic is an array, take the first element
        setUnit(firstTestType.unit[0] || ""); // Assuming unit is an array, take the first element
      }
      setMaxQuestions(test.maxQuestions);
      setDuration(test.duration);

      // Set guideline and markingScheme correctly
      setGuideline(test.guideline || ""); // If guideline is empty or undefined, set an empty string
      setMarkingScheme(test.markingScheme); // Same for markingScheme
      const formattedStartDate = new Date(test.startDate)
        .toISOString()
        .split("T")[0];
      const formattedEndDate = new Date(test.endDate)
        .toISOString()
        .split("T")[0];

      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
      // Handle Solution Unlock Date
      const solutionUnlockDateObj = new Date(test.solutionUnlockDate);
      if (isNaN(solutionUnlockDateObj.getTime())) {
        console.error("Invalid solutionUnlockDate:", test.solutionUnlockDate);
        return;
      }

      // If the date is valid, format it
      const formattedSolutionUnlockDate = solutionUnlockDateObj
        .toISOString()
        .split("T")[0];

      // Set the formatted date
      setSolutionUnlockDate(formattedSolutionUnlockDate);
      setTags(test.tags || []);
      setIsActiveHasSection(test.isActiveHasSection);
      if (test.sections && test.sections.length > 0) {
        setSections(test.sections); // Assuming sections is an array in the test data
      } else {
        // Initialize with an empty section if no sections are provided
        setSections([
          {
            sectionName: "",
            sectionDescription: "",
            sectionDisplayOrder: "",
            sectionGuideline: "",
            sectionMarkingScheme: "",
            isActiveSection: false,
          },
        ]);
      }
    }
  }, [test]);

  // Format the current date as 'Nov 20, 2024, 12:58 PM'
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

  // Handle saving the updated test
  const handleSave = async () => {
    // Assume sections state holds all sections added
    const formattedSections = sections.map(section => ({
      sectionName: section.sectionName,
      sectionDescription: section.sectionDescription,
      sectionDisplayOrder: section.sectionDisplayOrder,
      sectionGuideline: section.sectionGuideline,
      sectionMarkingScheme: section.sectionMarkingScheme,
      isActiveSection: section.isActiveSection,
    }));
    setLoading(true); // Set loading to true while making the API request
    try {
      const updatedTest = {
        ...test,
        title: title,
        url: url,
        content: content,
        active: isActive,
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
        sections: formattedSections,
        updatedOn: formattedDate,
      };

      const response = await fetch(
        `http://localhost:5000/api/auth/testlists/${test._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTest),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update test");
      }

      const updatedData = await response.json();
      // Update the tests list with the modified test
      setTestsData(prevData =>
        prevData.map(t => (t._id === test._id ? updatedData : t))
      );

      closeEditModal(); // Close the modal after saving
    } catch (error) {
      setError("Error updating test: " + error.message); // Handle error
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  // Toggle the active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  // Handle test deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/testlists/${test._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete test");
        }

        // After deletion, update the tests list
        setTestsData(prevData => prevData.filter(t => t._id !== test._id));

        closeEditModal(); // Close the modal after deleting
      } catch (error) {
        setError("Error deleting test: " + error.message); // Handle error
      }
    }
  };

  return (
    <Modal show={true} onHide={closeEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Test</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          maxHeight: "auto", // Sets the max height of modal body
          overflowY: "auto", // Enables scrolling
        }}
      >
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
            <Guideline
              onSaveGuideline={handleSaveGuideline}
              selectedGuideline={guideline}
            />
          </Col>
          <Col md={6}>
            <MarkingSchme
              onSaveMarkingScheme={handleMarkingSchemeChange}
              selectedMarkingScheme={markingScheme}
            />
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
            <Tags onSaveTags={handleSaveTags} selectedTags={tags} />
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
