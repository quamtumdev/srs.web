import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap";
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import { MdDeleteOutline } from "react-icons/md";

// eslint-disable-next-line react/prop-types
function AddMarkingScheme({ addNewMarkingScheme }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Scheme description
  const [isPartialMarking, setIsPartialMarking] = useState(true); // Partial marking checkbox state set to true by default
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [questions, setQuestions] = useState([]); // State for multiple questions

  // Show modal
  function handleShow() {
    setShow(true);
  }

  // Close modal and reset form
  function handleClose() {
    setShow(false);
    setTitle("");
    setContent("");
    setIsActive(false);
    setQuestions([]);
    setIsPartialMarking(true); // Reset Partial Marking checkbox to true
    setError(null);
  }

  // Toggle active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  // Add new question set
  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionType: "",
        notAttemptedMarks: "",
        rightMarks: "",
        wrongMarks: "",
        isPartialMarking: true, // Default to false
        singleNotAttemptedMarks: "",
        singleRightMarks: "",
        singleWrongMarks: "",
      },
    ]);
  };

  // Delete question set
  const deleteQuestion = index => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Handle changes in question form fields
  const handleQuestionChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedQuestions = [...questions];
    if (type === "checkbox") {
      updatedQuestions[index][name] = checked;
    } else {
      updatedQuestions[index][name] = value;
    }
    setQuestions(updatedQuestions);
  };

  // Handle Save Marking Scheme
  const handleSave = async () => {
    // Basic validation
    if (!title || !content || !questions.length) {
      setError(
        "Please provide a title, description, and at least one question."
      );
      return;
    }

    // Validate each question field
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      // Check if the questionType is empty
      if (!q.questionType) {
        setError(`Question ${i + 1}: Please select a question type.`);
        return;
      }

      // For Single Correct, Comprehension SCQ, Four Digit Integer, Assertion Reasoning, True False, Subjective
      if (
        [
          "Single Correct",
          "Comprehension SCQ",
          "Single Digit Integer",
          "Four Digit Integer",
          "Assertion Reasoning",
          "True False",
          "Subjective",
        ].includes(q.questionType)
      ) {
        // Check if required marks fields are filled
        if (
          q.notAttemptedMarks === "" ||
          q.rightMarks === "" ||
          q.wrongMarks === ""
        ) {
          setError(
            `Question ${
              i + 1
            }: Please provide marks for all required fields (Not Attempted Marks, Right Marks, Wrong Marks).`
          );
          return;
        }
      }

      // For Multiple Correct, Comprehension MCQ, Matrix 4*5, Matrix 4*6, Matrix 3*4
      if (
        [
          "Multiple Correct",
          "Comprehension MCQ",
          "Matrix 4*5",
          "Matrix 4*6",
          "Matrix 3*4",
        ].includes(q.questionType)
      ) {
        // Check if required marks fields are filled
        if (
          q.notAttemptedMarks === "" ||
          q.rightMarks === "" ||
          q.wrongMarks === ""
        ) {
          setError(
            `Question ${
              i + 1
            }: Please provide marks for all required fields (Not Attempted Marks, Right Marks, Wrong Marks).`
          );
          return;
        }

        // If partial marking is enabled, validate the partial marks fields as well
        if (q.isPartialMarking) {
          if (
            q.singleNotAttemptedMarks === "" ||
            q.singleRightMarks === "" ||
            q.singleWrongMarks === ""
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
    }

    // If validation passes, proceed with saving the marking scheme
    setError(null); // Reset error message

    // If validation passes, create the new marking object
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());

    const newMarking = {
      title,
      content,
      isPartialMarking,
      createdOn: formattedDate,
      updatedOn: formattedDate,
      active: isActive,
      questions: questions.map(q => ({
        questionType: q.questionType,
        marks: {
          notAttemptedMarks: Number(q.notAttemptedMarks),
          rightMarks: Number(q.rightMarks),
          wrongMarks: Number(q.wrongMarks),
        },
        partialMarks: q.isPartialMarking
          ? {
              singleNotAttemptedMarks: Number(q.singleNotAttemptedMarks),
              singleRightMarks: Number(q.singleRightMarks),
              singleWrongMarks: Number(q.singleWrongMarks),
            }
          : null,
      })),
    };

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/markingSchemes/markingSchemes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMarking), // Convert object to JSON string
        }
      );

      if (response.ok) {
        const savedMarkingScheme = await response.json();
        addNewMarkingScheme(savedMarkingScheme);
        handleClose();
      } else {
        throw new Error("Failed to save Marking Scheme");
      }
    } catch (error) {
      setError("Error saving Marking Scheme: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button to trigger modal */}
      <Button className="me-2 mb-2" onClick={handleShow}>
        Add Marking Scheme
      </Button>

      {/* Fullscreen Modal */}
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Marking Scheme</Modal.Title>
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
          {questions.map((questions, index) => (
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
                  value={questions.questionType}
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
                  <option value="Four Digit Integer">Four Digit Integer</option>
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

              {/* Marks fields (conditionally render based on question type) */}
              {[
                "Single Correct",
                "Comprehension SCQ",
                "Single Digit Integer",
                "Four Digit Integer",
                "Assertion Reasoning",
                "True False",
                "Subjective",
              ].includes(questions.questionType) && (
                <>
                  <Row className="mb-3">
                    <Col md={3}>
                      <Form.Group controlId={`formNotAttemptedMarks-${index}`}>
                        <Form.Label>Not Attempted Marks</Form.Label>
                        <Form.Control
                          type="number"
                          name="notAttemptedMarks"
                          value={questions.notAttemptedMarks}
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
                          value={questions.rightMarks}
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
                          value={questions.wrongMarks}
                          onChange={e => handleQuestionChange(index, e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              )}

              {[
                "Multiple Correct",
                "Comprehension MCQ",
                "Matrix 4*5",
                "Matrix 4*6",
                "Matrix 3*4",
              ].includes(questions.questionType) && (
                <>
                  <Row className="mb-3">
                    <Col md={3}>
                      <Form.Group controlId={`formNotAttemptedMarks-${index}`}>
                        <Form.Label>Not Attempted Marks</Form.Label>
                        <Form.Control
                          type="number"
                          name="notAttemptedMarks"
                          value={questions.notAttemptedMarks}
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
                          value={questions.rightMarks}
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
                          value={questions.wrongMarks}
                          onChange={e => handleQuestionChange(index, e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Partial Marking Checkbox */}
                  <Form.Group
                    className="mb-3"
                    controlId={`formPartialMarking-${index}`}
                  >
                    <Form.Check
                      type="checkbox"
                      label="Enable Partial Marking"
                      name="isPartialMarking"
                      checked={questions.isPartialMarking}
                      onChange={e => handleQuestionChange(index, e)}
                    />
                  </Form.Group>

                  {/* Conditional partial marks fields */}
                  {questions.isPartialMarking && (
                    <Row className="mb-3">
                      <Col md={3}>
                        <Form.Group
                          controlId={`formSingleNotAttemptedMarks-${index}`}
                        >
                          <Form.Label>Single Not Attempted Marks</Form.Label>
                          <Form.Control
                            type="number"
                            name="singleNotAttemptedMarks"
                            value={questions.singleNotAttemptedMarks}
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
                            value={questions.singleRightMarks}
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
                            value={questions.singleWrongMarks}
                            onChange={e => handleQuestionChange(index, e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  )}
                </>
              )}

              {/* Delete Question Button */}
              <Button
                onClick={() => deleteQuestion(index)}
                className="btn btn-danger btn-marking-delete"
              >
                <MdDeleteOutline />
              </Button>
            </div>
          ))}

          <Button
            variant="secondary"
            onClick={addNewQuestion}
            className="btn-cancle-back"
          >
            Add Questions
          </Button>

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

export default AddMarkingScheme;
