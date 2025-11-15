/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Form, Row, Col } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import LevelC from "./LevelC";
import SkillsC from "./SkillsC";
import StreamC from "./StreamC";
import TagC from "./TagC";
import Modal from "react-bootstrap/Modal";

import { subjectData } from "../../Data/subjectData.js"; // Import subjectData
const ComprehensionInput = ({
  enterQuestionC,
  setEnterQuestionC,
  subQuestionType,
  setSubQuestionType,
  isActiveC,
  setIsActiveC,
  urlC,
  setUrlC,
  optionsC = ["", "", "", ""],
  setOptionsC,
  correctAnswersC,
  setCorrectAnswersC,
  hintsSolutionC,
  setHintsSolutionC,

  levelC,
  setLevelC,

  skillsC,
  setSkillC,

  streamC,
  setStreamC,

  tagC,
  setTagC,
  subjectType,
  setSubjectType,
  subTopicC,
  setSubTopicC,
}) => {
  const [showPreview, setShowPreview] = useState(false);

  // Handle change for Subtopic selection
  const handleSubTopicChangeC = e => {
    setSubTopicC(e.target.value); // Update the parent component's state for subTopic
  };

  const handlePreviewShow = () => {
    setShowPreview(true);
  };

  // Handle Preview Close
  const handlePreviewClose = () => {
    setShowPreview(false);
  };
  // Function to get subtopics based on the selected subject
  const getSubtopicsForSubject = subject => {
    return subjectData[subject] || []; // Get subtopics from subjectData based on selected subject
  };
  // Handle change for Sub Question Type
  const handleSubQuestionTypeChange = e => {
    setSubQuestionType(e.target.value); // Update the parent component's state for subQuestionType
  };

  // Function to strip HTML tags from a string
  const stripHtmlTags = str => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  // Toggle Active/Inactive state
  const handleToggle = () => {
    setIsActiveC(prevState => !prevState); // Toggle the isActive state when the switch is toggled
  };

  // Handle change for Comprehension Text with HTML tags stripped
  const handleComprehensionTextChange = value => {
    const cleanedText = stripHtmlTags(value); // Clean the text by stripping HTML tags
    setEnterQuestionC(cleanedText); // Update state with the cleaned text
  };
  const handleHintsChange = value => {
    const cleanedText = stripHtmlTags(value); // Clean the text by stripping HTML tags
    setHintsSolutionC(cleanedText); // Update state with the cleaned text
  };

  // Handle change for options
  const handleOptionChangeC = (value, index) => {
    const updatedOptions = [...optionsC];
    updatedOptions[index] = value; // Update the specific option
    setOptionsC(updatedOptions);
  };

  // Handle checkbox change for selecting the correct answer
  const handleCheckboxChangeOptionC = (e, index) => {
    const isChecked = e.target.checked;
    setCorrectAnswersC(prevState => {
      if (isChecked) {
        return [...prevState, index]; // Add the index if checked
      } else {
        return prevState.filter(item => item !== index); // Remove the index if unchecked
      }
    });
  };

  return (
    <>
      {/* Sub Question Type Dropdown */}
      <Form.Group className="mb-3" controlId="formTags">
        <Form.Label>Sub Question Type</Form.Label>
        <Form.Control
          as="select"
          value={subQuestionType} // Bind the selected value to subQuestionType state
          onChange={handleSubQuestionTypeChange}
        >
          <option value="">Select Sub Question Type</option>
          <option value="Comprehension SCQ">Comprehension SCQ</option>
          <option value="Comprehension MCQ">Comprehension MCQ</option>
        </Form.Control>
      </Form.Group>

      <div className="comprehension">
        {/* Active Toggle */}
        <Form.Group
          className="mb-3 toggle-stream-active"
          controlId="formActiveToggle"
        >
          <Form.Check
            type="switch"
            id="active-toggle"
            label={isActiveC ? "Active" : "Inactive"} // Display label based on isActive
            checked={isActiveC}
            onChange={handleToggle} // Call handleToggle to change isActive state
          />
        </Form.Group>

        {/* Comprehension Text (ReactQuill for rich text input) */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group className="mb-3" controlId="formComprehensionText">
              <Form.Label>Comprehension Text</Form.Label>
              <ReactQuill
                value={enterQuestionC} // Binding comprehensionText value to Quill
                onChange={handleComprehensionTextChange} // Handle change to strip HTML tags
                theme="snow"
                style={{
                  height: "230px",
                  backgroundColor: "white", // Explicit white background for the editor
                  borderRadius: "4px", // Optional: to give a more polished appearance
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)", // Optional: adding some shadow for better visibility
                }}
              />
            </Form.Group>
          </Col>

          {/* Question URL Input */}
          <Col md={12}>
            <Form.Group className="mt-5" controlId="formUrl">
              <Form.Label>Question URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Question URL"
                value={urlC} // Bind the input value to the 'urlC' state
                onChange={e => setUrlC(e.target.value)} // Handle change for URL
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Options Section */}
        <Row className="mb-3">
          {["A", "B", "C", "D"].map((letter, index) => (
            <Col md={6} key={letter}>
              <Form.Group
                className="mb-3 mt-3"
                controlId={`formOption${letter}`}
              >
                <Form.Label>Option {letter}</Form.Label>
                <ReactQuill
                  value={optionsC[index]}
                  onChange={e => handleOptionChangeC(e, index)} // Update the option text based on the index
                  placeholder={`Option ${letter}`}
                  theme="snow"
                  style={{
                    height: "230px",
                    backgroundColor: "white", // Explicit white background for the editor
                    borderRadius: "4px", // Optional: to give a more polished appearance
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)", // Optional: adding some shadow for better visibility
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="Answer"
                  checked={correctAnswersC.includes(index)} // Check if option index is in selected answers
                  onChange={e => handleCheckboxChangeOptionC(e, index)} // Handle checkbox change
                />
              </Form.Group>
            </Col>
          ))}
        </Row>
        <Row className="mb-5 mt-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Hint and Solution</Form.Label>
              <ReactQuill
                placeholder="Hint and Solution"
                theme="snow"
                style={{
                  height: "230px",
                  backgroundColor: "white", // Explicit white background for the editor
                  borderRadius: "4px", // Optional: to give a more polished appearance
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)", // Optional: adding some shadow for better visibility
                }}
                value={hintsSolutionC}
                onChange={handleHintsChange} // This sets the state
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {/* Pass setLevelC to LevelC */}
            <LevelC onSaveLevel={setLevelC} selectedLevel={levelC} />
          </Col>
          <Col md={3}>
            <SkillsC onSaveSkills={setSkillC} selectedSkills={skillsC} />
          </Col>
          <Col md={3}>
            <StreamC onSaveStreams={setStreamC} selectedStreams={streamC} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {/* Pass setLevelC to LevelC */}
            <TagC onSaveTags={setTagC} selectedTags={tagC} />
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="formSubTopic">
              <Form.Label>Subtopic</Form.Label>
              <Form.Control
                as="select"
                name="subTopic"
                value={subTopicC}
                onChange={handleSubTopicChangeC}
                disabled={!subjectType} // Disable if no subjectType selected
              >
                <option value="">Select Subtopic</option>
                {getSubtopicsForSubject(subjectType).map(sub => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Preview Modal */}
        {/* Other form fields */}
        <Button onClick={handlePreviewShow}>Show Preview</Button>

        {/* Preview Modal */}
        <Modal show={showPreview} onHide={handlePreviewClose}>
          <Modal.Header closeButton>
            <Modal.Title>Question Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ overflowY: "auto" }}>
            <div>
              <h5>Question:</h5>
              <div dangerouslySetInnerHTML={{ __html: enterQuestionC }}></div>
            </div>
            <hr />
            <div>
              <h5>Options:</h5>
              <ul>
                {["A", "B", "C", "D"].map((letter, index) => (
                  <li key={letter}>
                    <strong>{letter}:</strong>
                    <div
                      dangerouslySetInnerHTML={{ __html: optionsC[index] }}
                    />
                    {/* Display if the option is correct */}
                    {correctAnswersC.includes(index) ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        {" "}
                        (Correct)
                      </span>
                    ) : (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        {" "}
                        (Incorrect)
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div>
              <h5>Hint and Solution:</h5>
              <div dangerouslySetInnerHTML={{ __html: hintsSolutionC }}></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlePreviewClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ComprehensionInput;
