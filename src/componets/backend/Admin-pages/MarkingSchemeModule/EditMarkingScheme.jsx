/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";

// eslint-disable-next-line react/prop-types
function EditMarkingScheme({ marking, setMarkingData, closeEditModal }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPartialMarking, setIsPartialMarking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);

  // Populate form fields when marking scheme is passed
  useEffect(() => {
    if (marking) {
      setShow(true); // Show the modal
      setIsActive(marking.active || false);
      setTitle(marking.title || "");
      setContent(marking.content || "");
      setIsPartialMarking(marking.isPartialMarking || false);
      setQuestions(marking.questions || []);
    }
  }, [marking]);

  // Toggle active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  // Handle changes in question form fields
  const handleQuestionChange = (index, e) => {
    const { name, value, type, checked } = e.target;

    // Create a copy of the questions array
    const updatedQuestions = [...questions];

    // Handle checkbox and input types
    if (type === "checkbox") {
      updatedQuestions[index][name] = checked;
    } else {
      updatedQuestions[index][name] = value;
    }

    // Update the state with the new array of questions
    setQuestions(updatedQuestions);
  };

  // Add new question set
  const EditNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionType: "",
        marks: {
          notAttemptedMarks: "",
          rightMarks: "",
          wrongMarks: "",
        },
        partialMarks: {
          singleNotAttemptedMarks: "",
          singleRightMarks: "",
          singleWrongMarks: "",
        },
        isPartialMarking: false,
      },
    ]);
  };

  // Delete question set
  const deleteQuestion = index => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Handle Save Marking Scheme
  const handleSave = async () => {
    if (!title || !content || !questions.length) {
      setError(
        "Please provide a title, description, and at least one question."
      );
      return;
    }

    // Validate each question field
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      if (!q.questionType) {
        setError(`Question ${i + 1}: Please select a question type.`);
        return;
      }

      // Validate for each question type
      const marks = q.marks;
      const partialMarks = q.isPartialMarking ? q.partialMarks : {};

      // Check if all necessary fields are provided for marks and partial marks
      if (!marks.notAttemptedMarks || !marks.rightMarks || !marks.wrongMarks) {
        setError(
          `Question ${
            i + 1
          }: Please provide marks for all required fields (Not Attempted Marks, Right Marks, Wrong Marks).`
        );
        return;
      }

      // Validate partial marks if applicable
      if (
        [
          "Multiple Correct",
          "Comprehension MCQ",
          "Matrix 4*5",
          "Matrix 4*6",
          "Matrix 3*4",
        ].includes(q.questionType) &&
        q.isPartialMarking
      ) {
        if (
          !partialMarks.singleNotAttemptedMarks ||
          !partialMarks.singleRightMarks ||
          !partialMarks.singleWrongMarks
        ) {
          setError(
            `Question ${
              i + 1
            }: Please provide all partial marks fields (Single Not Attempted Marks, Single Right Marks, Single Wrong Marks).`
          );
          return;
        }
      }
    }

    // Prepare the data in the correct format
    const updatedMarking = {
      title,
      content,
      isPartialMarking,
      active: isActive,
      questions: questions.map(q => ({
        questionType: q.questionType,
        marks: {
          notAttemptedMarks: parseFloat(q.marks.notAttemptedMarks || 0),
          rightMarks: parseFloat(q.marks.rightMarks || 0),
          wrongMarks: parseFloat(q.marks.wrongMarks || 0),
        },
        partialMarks: q.isPartialMarking
          ? {
              singleNotAttemptedMarks: parseFloat(
                q.partialMarks.singleNotAttemptedMarks || 0
              ),
              singleRightMarks: parseFloat(
                q.partialMarks.singleRightMarks || 0
              ),
              singleWrongMarks: parseFloat(
                q.partialMarks.singleWrongMarks || 0
              ),
            }
          : null,
      })),
    };

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/markingSchemes/markingSchemes/${marking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMarking),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setMarkingData(updated); // Callback to update marking scheme
        closeEditModal(); // Close modal after successful update
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update Marking Scheme");
      }
    } catch (error) {
      setError("Error saving Marking Scheme: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} fullscreen={true} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Marking Scheme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Active/Inactive Toggle */}
          <Form.Group
            className="mb-3 toggle-stream-active"
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

          {/* Scheme Name */}
          <Form.Group className="mb-3" controlId="formSchemeTitle">
            <Form.Label>Scheme Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Scheme Name"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Scheme Description */}
          <Form.Group className="mb-3" controlId="formSchemeDescription">
            <Form.Label>Scheme Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter Scheme Description"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>

          {/* Render dynamic questions */}
          {questions.map((question, index) => {
            return (
              <div key={index} className="question-form">
                {/* Question Type Dropdown */}
                <Form.Group
                  className="mb-3"
                  controlId={`formQuestionType-${index}`}
                >
                  <Form.Label>Question Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="questionType"
                    value={question.questionType || ""}
                    onChange={e => handleQuestionChange(index, e)}
                  >
                    <option value="">Select Question Type</option>
                    <option value="Multiple Correct">Multiple Correct</option>
                    <option value="Single Correct">Single Correct</option>
                    <option value="Comprehension SCQ">Comprehension SCQ</option>
                    <option value="Comprehension MCQ">Comprehension MCQ</option>
                    <option value="Single Digit Integer">
                      Single Digit Integer
                    </option>
                    <option value="Four Digit Integer">
                      Four Digit Integer
                    </option>
                    <option value="Matrix 4*5">Matrix 4*5</option>
                    <option value="Matrix 4*6">Matrix 4*6</option>
                    <option value="Matrix 3*4">Matrix 3*4</option>
                    <option value="Assertion Reasoning">
                      Assertion Reasoning
                    </option>
                    <option value="True False">True False</option>
                    <option value="Subjective">Subjective</option>
                  </Form.Control>
                </Form.Group>

                {/* Show Partial Marking Checkbox only if the scheme is active */}
                {isActive &&
                  [
                    "Multiple Correct",
                    "Comprehension MCQ",
                    "Matrix 4*5",
                    "Matrix 4*6",
                    "Matrix 3*4",
                  ].includes(question.questionType) && (
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Enable Partial Marking"
                        name="isPartialMarking"
                        checked={question.isPartialMarking}
                        onChange={e => handleQuestionChange(index, e)}
                      />
                    </Form.Group>
                  )}

                {/* Marks Inputs */}
                <Row className="mb-3">
                  <Col md={3}>
                    <Form.Group controlId={`formNotAttemptedMarks-${index}`}>
                      <Form.Label>Not Attempted Marks</Form.Label>
                      <Form.Control
                        type="number"
                        name="notAttemptedMarks"
                        value={question.marks.notAttemptedMarks || ""}
                        onChange={e => handleQuestionChange(index, e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId={`formRightMarks-${index}`}>
                      <Form.Label>Right Marks</Form.Label>
                      <Form.Control
                        type="number"
                        name="rightMarks"
                        value={question.marks.rightMarks || ""}
                        onChange={e => handleQuestionChange(index, e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId={`formWrongMarks-${index}`}>
                      <Form.Label>Wrong Marks</Form.Label>
                      <Form.Control
                        type="number"
                        name="wrongMarks"
                        value={question.marks.wrongMarks || ""}
                        onChange={e => handleQuestionChange(index, e)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Conditional Partial Marking Fields */}
                {question.isPartialMarking && (
                  <Row className="mb-3">
                    <Col md={3}>
                      <Form.Group
                        controlId={`formSingleNotAttemptedMarks-${index}`}
                      >
                        <Form.Label>Single Not Attempted Marks</Form.Label>
                        <Form.Control
                          type="number"
                          name="singleNotAttemptedMarks"
                          value={
                            question.partialMarks.singleNotAttemptedMarks || ""
                          }
                          onChange={e => handleQuestionChange(index, e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId={`formSingleRightMarks-${index}`}>
                        <Form.Label>Single Right Marks</Form.Label>
                        <Form.Control
                          type="number"
                          name="singleRightMarks"
                          value={question.partialMarks.singleRightMarks || ""}
                          onChange={e => handleQuestionChange(index, e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId={`formSingleWrongMarks-${index}`}>
                        <Form.Label>Single Wrong Marks</Form.Label>
                        <Form.Control
                          type="number"
                          name="singleWrongMarks"
                          value={question.partialMarks.singleWrongMarks || ""}
                          onChange={e => handleQuestionChange(index, e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                )}

                {/* Delete Button */}
                <Button
                  variant="danger"
                  onClick={() => deleteQuestion(index)}
                  className="delete-question-button"
                >
                  <MdDeleteOutline />
                </Button>
              </div>
            );
          })}

          {/* Add New Question Button */}
          <Button variant="primary" onClick={EditNewQuestion} className="mt-3">
            Add New Question
          </Button>

          {/* Error Message */}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditMarkingScheme;
