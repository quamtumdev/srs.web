/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap";
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import ReactQuill from "react-quill"; // Import react-quill for the rich text editor
import { subjectData } from "../../Data/subjectData.js";
import Stream from "./Stream";
import SkillsQ from "./SkillsQ";
import TagQ from "./TagQ";
import DifficultyLevelQ from "./DifficultyLevelQ";
import ComprehensionInput from "./ComprehensionInput";
import Select from "react-select";
function AddNewQuestion({ addNewQuestions }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [questionType, setQuestionType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enterQuestion, setEnterQuestion] = useState("");
  const [singleInteger, setSingleInteger] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]); // Store options as an array of strings
  const [correctAnswers, setCorrectAnswers] = useState([]); // Store selected answers as an array of option indices
  const [matrixAnswer, setMatrixAnswer] = useState({}); // New state to manage matrix checkbox selections
  const [subjectType, setSubjectType] = useState("");
  const [subTopic, setSubTopic] = useState([]);
  const [stream, setStreams] = useState([
    "Commerce",
    "Medical",
    "Foundation",
    "Engineering",
  ]);
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState("");
  const [level, setLevel] = useState("");
  const [url, setUrl] = useState("");
  const [hitsSolution, setHitsSolution] = useState("");
  const [fourDigit, setFourDigit] = useState("");
  const [numericAnswerStartRange, setNumericAnswerStartRange] = useState("");
  const [numericAnswerEndRange, setNumericAnswerEndRange] = useState("");
  const [subjectiveAnswerFormat, setSubjectiveAnswerFormat] = useState("");
  const [trueFalseAnswer, setTueFalseAnswer] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [comprehensionText, setComprehensionText] = useState("");
  const [subQuestionType, setSubQuestionType] = useState("");
  const [isActiveC, setIsActiveC] = useState(false);
  const [urlC, setUrlC] = useState("");
  const [optionsC, setOptionsC] = useState(["", "", "", ""]);
  const [correctAnswersC, setCorrectAnswersC] = useState([]);
  const [hintsSolutionC, setHintsSolutionC] = useState("");
  const [levelC, setLevelC] = useState("");
  const [skillsC, setSkillC] = useState("");
  const [streamC, setStreamC] = useState("");
  const [tagC, setTagC] = useState("");
  const [subTopicC, setSubTopicC] = useState("");
  const [comprehensionQuestions, setComprehensionQuestions] = useState([
    // Initial empty comprehension question object
    {
      comprehensionText: "",
      subQuestionType: "",
      isActiveC: false,
      urlC: "",
      optionsC: ["", "", "", ""], // Initial empty options
      correctAnswersC: [],
      hintsSolutionC: "",
      levelC: "",
      skillsC: "",
      streamC: "",
      tagC: "",
      subTopicC: "",
    },
  ]);
  const handleAddSubQuestion = () => {
    setComprehensionQuestions([
      ...comprehensionQuestions, // Spread previous questions
      {
        comprehensionText: "",
        subQuestionType: "",
        isActiveC: false,
        urlC: "",
        optionsC: ["", "", "", ""], // Initial empty options
        correctAnswersC: [],
        hintsSolutionC: "",
        levelC: "",
        skillsC: "",
        streamC: "",
        tagC: "",
        subTopicC: "",
      },
    ]);
  };
  const handleRemoveSubQuestion = index => {
    const updatedQuestions = comprehensionQuestions.filter(
      (_, i) => i !== index
    );
    setComprehensionQuestions(updatedQuestions);
  };
  // Function to handle preview modal toggle
  const stripHtmlTags = str => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const handlePreviewShow = () => {
    setShowPreview(true);
  };

  const handlePreviewClose = () => {
    setShowPreview(false);
  };

  function handleShow() {
    setShow(true);
  }
  // Function to handle stream data
  const handleSaveStreams = selectedStreams => {
    // Save selected streams data to state or directly to the backend
    setStreams(selectedStreams);
  };

  const handleSaveSkills = selectedSkills => {
    // Save selected streams data to state or directly to the backend
    setSkills(selectedSkills);
  };
  const handleSaveTags = selectedTags => {
    setTags(selectedTags); // Save the selected tags to the state
  };
  const handleSaveLevel = selectedLevels => {
    setLevel(selectedLevels); // Save the selected tags to the state
  };
  // Close modal and clear form
  const handleClose = () => {
    setShow(false);

    setIsActive(false);
    setError(null);
    setEnterQuestion("");
    setSingleInteger("");
    setOptions(["", "", "", ""]);
    setCorrectAnswers([]);
    setMatrixAnswer({});
    setSubTopic([]);
    setSkills([]);
    setTags("");
    setUrl("");
    setHitsSolution("");
    setFourDigit("");
    setNumericAnswerStartRange("");
    setNumericAnswerEndRange("");
    setSubjectiveAnswerFormat("");
    // eslint-disable-next-line no-undef
    setTrueFalseAnswer("");
    setComprehensionText("");
    setSubQuestionType("");
    setIsActiveC(false);
    setUrlC("");
    setOptionsC(["", "", "", ""]);
    setCorrectAnswersC([]);
    setHintsSolutionC("");
    setLevelC("");
    setSkillsC("");
    setStreamC("");
    setTagC("");
    setSubTopicC("");
  };

  // Toggle active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  // Handle Subject Type change and update subtopics accordingly
  const handleSubjectChange = e => {
    setSubjectType(e.target.value);
    setSubTopic(""); // Reset subtopic when subject changes
  };

  // Handle subtopic selection
  // Handle sub-topic change (from react-select)
  const handleSubTopicChange = selectedOptions => {
    // Check if selectedOptions is an array (since we're allowing multi-selection)
    const selectedValues = selectedOptions
      ? selectedOptions.map(option => option.value)
      : [];
    setSubTopic(selectedValues); // Set selected sub-topics (array of values)
  };
  const handleSave = async () => {
    // Basic validation
    if (!enterQuestion || !questionType) {
      setError("Please provide a question and question type.");
      return;
    }

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());

    const newQuestionData = {
      enterQuestion,
      subjectType,
      questions: [
        {
          questionType,
          singleInteger,
          options,
          correctAnswers,
          matrixAnswer,
          fourDigit,
          numericAnswerStartRange,
          numericAnswerEndRange,
          subjectiveAnswerFormat,
          trueFalseAnswer,
          comprehensionText: {
            subQuestionType: [subQuestionType],
            isActiveC,
            enterQuestionC: [comprehensionText], // Save comprehension text here
            correctAnswersC,
            optionsC,
            urlC,
            hintsSolutionC,
            streamC,
            subTopicC,
            skillsC,
            tagC,
            levelC,
          },
        },
      ],
      subTopic,
      stream,
      skills,
      tags,
      level,
      url,
      hitsSolution,

      createdBy: "admin",
      createdOn: formattedDate,
      updatedBy: "admin",
      updatedOn: formattedDate,
      active: isActive,
    };

    setLoading(true); // Set loading state to true while saving

    try {
      console.log("Sending data:", newQuestionData);

      // Send POST request to the backend to save the new question data
      const response = await fetch("http://localhost:5000/api/auth/ques/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestionData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Saved question:", responseData);
        addNewQuestions(responseData.data); // Add the new question to the parent component's list
        handleClose(); // Close the modal and reset the form
      } else {
        const responseBody = await response.text();
        throw new Error("Failed to save question. Response: " + responseBody);
      }
    } catch (error) {
      console.error("Error saving question:", error);
      setError("Error saving question: " + error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e; // Update the specific option text (string)
    setOptions(newOptions);
  };

  const handleCheckboxChangeOption = (e, index) => {
    // Update the selectedAnswers array based on the checkbox status
    const newSelectedAnswers = e.target.checked
      ? [...correctAnswers, index] // Add the option index if checked
      : correctAnswers.filter(item => item !== index); // Remove index if unchecked
    setCorrectAnswers(newSelectedAnswers);
  };

  const handleCheckboxChangeMatrix = (e, row, col) => {
    // Update the checkedValues for matrix cells
    const newCheckedValues = { ...matrixAnswer };
    const cell = `${row}_${col}`;
    newCheckedValues[cell] = e.target.checked; // Update the specific matrix cell
    setMatrixAnswer(newCheckedValues);
  };

  const getMatrixDimensions = () => {
    // Extract rows and columns from the questionType string (e.g., "3*4", "4*5", etc.)
    const match = questionType.match(/^Matrix (\d+)\*(\d+)$/);
    if (match) {
      const rows = parseInt(match[1]);
      const cols = parseInt(match[2]);
      return { rows, cols };
    }
    return { rows: 0, cols: 0 }; // Default to 0 if not a matrix type
  };

  const { rows, cols } = getMatrixDimensions(); // Get the rows and cols based on questionType

  // Column headers P, Q, R, S, T
  const columnHeaders = ["P", "Q", "R", "S", "T", "U"];
  // Row headers A, B, C, D
  const rowHeaders = ["A", "B", "C", "D"];
  // Function to add a new sub-question (comprehension question)

  return (
    <>
      <Button className="me-2 mb-2" onClick={handleShow}>
        Add New Question
      </Button>
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
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

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formQuestionType">
                <Form.Label>Question Type</Form.Label>
                <Form.Control
                  as="select"
                  name="questionType"
                  onChange={e => setQuestionType(e.target.value)}
                  value={questionType}
                >
                  <option value="">Select Question Type</option>
                  <option value="Multiple Correct">Multiple Correct</option>
                  <option value="Single Correct">Single Correct</option>
                  <option value="Comprehension">Comprehension</option>
                  <option value="Single Digit Integer">
                    Single Digit Integer
                  </option>
                  <option value="Four Digit Integer">Four Digit Integer</option>
                  <option value="Numeric Value">Numeric Value</option>
                  <option value="Matrix 4*5">Matrix 4*5</option>
                  <option value="Matrix 4*6">Matrix 4*6</option>
                  <option value="Matrix 3*4">Matrix 3*4</option>
                  <option value="Assertion Reasoning">
                    Assertion Reasoning
                  </option>
                  <option value="Matrix Single Correct">
                    Matrix Single Correct
                  </option>
                  <option value="True False">True False</option>
                  <option value="Subjective">Subjective</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formSubjectType">
                <Form.Label>Subject Type</Form.Label>
                <Form.Control
                  as="select"
                  name="subjectType"
                  onChange={handleSubjectChange}
                  value={subjectType}
                >
                  <option value="">Select Subject Type</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Legal Studies">Legal Studies</option>
                  <option value="Economics">Economics</option>

                  <option value="Biology">Biology</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Business Studies">Business Studies</option>
                  <option value="English">English</option>
                  <option value="Social Science Foundation">
                    Social Science Foundation
                  </option>
                  <option value="General Knowledge">General Knowledge</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Enter Question</Form.Label>
                <ReactQuill
                  value={enterQuestion}
                  onChange={setEnterQuestion}
                  placeholder="Enter Question"
                  theme="snow"
                  style={{ height: "230px" }}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mt-5" controlId="formStreamURL">
                <Form.Label>Question URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Question URL"
                  value={url} // Bind the input value to the 'url' state
                  onChange={e => setUrl(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          {(questionType === "Multiple Correct" ||
            questionType === "Single Correct" ||
            questionType === "Assertion Reasoning" ||
            questionType === "Matrix Single Correct") && (
            <Row className="mb-3">
              {["A", "B", "C", "D"].map((letter, index) => (
                <Col md={6} key={letter}>
                  <Form.Group
                    className="mb-3 mt-3"
                    controlId={`formOption${letter}`}
                  >
                    <Form.Label>Option {letter}</Form.Label>
                    <ReactQuill
                      value={options[index]}
                      onChange={e => handleOptionChange(e, index)} // Update the option text based on the index
                      placeholder={`Option ${letter}`}
                      theme="snow"
                      style={{ height: "230px" }}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Answer"
                      checked={correctAnswers.includes(index)} // Check if option index is in selected answers
                      onChange={e => handleCheckboxChangeOption(e, index)} // Handle checkbox change
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>
          )}

          {questionType.startsWith("Matrix") && rows > 0 && cols > 0 && (
            <Row className="mb-3">
              <Col md={12}>
                <Form.Label className="mt-5">Matrix Question</Form.Label>
                <div className="matrix-container">
                  <div className="matrix-header">
                    <div className="matrix-cell"></div>
                    {columnHeaders.slice(0, cols).map(header => (
                      <div key={header} className="matrix-cell">
                        {header}
                      </div>
                    ))}
                  </div>
                  {rowHeaders.slice(0, rows).map((row, rowIndex) => (
                    <div key={row} className="matrix-row">
                      <div className="matrix-cell">{row}</div>
                      {Array.from({ length: cols }).map((_, colIndex) => (
                        <Form.Check
                          type="checkbox"
                          key={`${rowIndex}_${colIndex}`}
                          label=""
                          checked={
                            matrixAnswer[`${row}_${columnHeaders[colIndex]}`] ||
                            false
                          }
                          onChange={e =>
                            handleCheckboxChangeMatrix(
                              e,
                              row,
                              columnHeaders[colIndex]
                            )
                          }
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          )}

          {questionType === "Single Digit Integer" && (
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formSingleInteger">
                  <Form.Label>Enter Single Digit Answer</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Single Digit Answer"
                    value={singleInteger}
                    onChange={e => setSingleInteger(e.target.value)} // Set the single digit answer value
                    maxLength={1} // Ensure only single digit input is allowed
                  />
                </Form.Group>
              </Col>
            </Row>
          )}
          {questionType === "Four Digit Integer" && (
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formSingleInteger">
                  <Form.Label>Enter Four Digit Answer</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Four Digit Answer"
                    value={fourDigit}
                    onChange={e => setFourDigit(e.target.value)} // Set the single digit answer value
                    maxLength={1} // Ensure only single digit input is allowed
                  />
                </Form.Group>
              </Col>
            </Row>
          )}
          {questionType === "Numeric Value" && (
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formSingleInteger">
                  <Form.Label>Enter Numeric Answer Start Range</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Numeric Answer Start Range"
                    value={numericAnswerStartRange}
                    onChange={e => setNumericAnswerStartRange(e.target.value)} // Set the single digit answer value
                    maxLength={1} // Ensure only single digit input is allowed
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formSingleInteger">
                  <Form.Label>Enter Numeric Answer End Range</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Numeric Answer End Range"
                    value={numericAnswerEndRange}
                    onChange={e => setNumericAnswerEndRange(e.target.value)} // Set the single digit answer value
                    maxLength={1} // Ensure only single digit input is allowed
                  />
                </Form.Group>
              </Col>
            </Row>
          )}
          {questionType === "True False" && (
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="trueFalseGroup">
                  <Form.Label>Enter Answer</Form.Label>

                  <Form.Check
                    type="radio"
                    label="True"
                    name="trueFalse"
                    value="true"
                    checked={trueFalseAnswer === "true"}
                    onChange={e => setTueFalseAnswer(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="False"
                    name="trueFalse"
                    value="false"
                    checked={trueFalseAnswer === "false"}
                    onChange={e => setTueFalseAnswer(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}
          {questionType === "Subjective" && (
            <Row className="mb-5">
              <Col>
                <Form.Group controlId="trueFalseGroup">
                  <Form.Label>Enter Answer</Form.Label>
                  <ReactQuill
                    placeholder="Enter Answer"
                    theme="snow"
                    style={{ height: "200px" }}
                    value={subjectiveAnswerFormat}
                    onChange={setSubjectiveAnswerFormat}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}
          <Row className="mb-5 mt-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Hint and Solution</Form.Label>
                <ReactQuill
                  placeholder="Hint and Solution"
                  theme="snow"
                  style={{ height: "230px" }}
                  value={hitsSolution}
                  onChange={setHitsSolution} // This sets the state
                />
              </Form.Group>
            </Col>
          </Row>

          {subjectType && (
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group
                  controlId="formSubTopic"
                  onChange={handleSubTopicChange}
                  value={subTopic}
                >
                  <Form.Label>Sub Topic</Form.Label>

                  <Select
                    options={subjectData[subjectType]?.map(topic => ({
                      value: topic,
                      label: topic,
                    }))}
                    value={
                      subTopic
                        ? subTopic.map(topic => ({
                            value: topic,
                            label: topic,
                          }))
                        : []
                    } // Update to handle multiple values
                    onChange={handleSubTopicChange}
                    placeholder="Select Sub Topic"
                    isClearable
                    isMulti // Correct prop to enable multi-selection
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          <Row>
            <Col md={6}>
              <Stream onSaveStreams={handleSaveStreams} />
            </Col>
            <Col md={6}>
              <SkillsQ onSaveSkills={handleSaveSkills} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <TagQ onSaveTags={handleSaveTags} />{" "}
              {/* Pass handleSaveTags function */}
            </Col>
            <Col md={6}>
              <DifficultyLevelQ onSaveLevel={handleSaveLevel} />{" "}
              {/* Pass handleSaveTags function */}
            </Col>
          </Row>
          {questionType === "Comprehension" &&
            comprehensionQuestions.map((question, index) => (
              <div key={index}>
                <ComprehensionInput
                  comprehensionText={question.comprehensionText}
                  setComprehensionText={value => {
                    const updatedQuestions = [...comprehensionQuestions];
                    updatedQuestions[index].comprehensionText = value;
                    setComprehensionQuestions(updatedQuestions);
                  }}
                  subQuestionType={question.subQuestionType}
                  setSubQuestionType={value => {
                    const updatedQuestions = [...comprehensionQuestions];
                    updatedQuestions[index].subQuestionType = value;
                    setComprehensionQuestions(updatedQuestions);
                  }}
                  isActiveC={question.isActiveC}
                  setIsActiveC={value => {
                    const updatedQuestions = [...comprehensionQuestions];
                    updatedQuestions[index].isActiveC = value;
                    setComprehensionQuestions(updatedQuestions);
                  }}
                  urlC={question.urlC}
                  setUrlC={value => {
                    const updatedQuestions = [...comprehensionQuestions];
                    updatedQuestions[index].urlC = value;
                    setComprehensionQuestions(updatedQuestions);
                  }}
                  optionsC={question.optionsC}
                  setOptionsC={options => {
                    const updatedQuestions = [...comprehensionQuestions];
                    updatedQuestions[index].optionsC = options;
                    setComprehensionQuestions(updatedQuestions);
                  }}
                  correctAnswersC={question.correctAnswersC}
                  setCorrectAnswersC={answers => {
                    const updatedQuestions = [...comprehensionQuestions];
                    updatedQuestions[index].correctAnswersC = answers;
                    setComprehensionQuestions(updatedQuestions);
                  }}
                  hintsSolutionC={question.hintsSolutionC}
                  setHintsSolutionC={value => {
                    const updatedQuestions = [...comprehensionQuestions];
                    updatedQuestions[index].hintsSolutionC = value;
                    setComprehensionQuestions(updatedQuestions);
                  }}
                  levelC={question.levelC}
                  setLevelC={value => {
                    const updatedQuestions = [...comprehensionQuestions];
                    updatedQuestions[index].levelC = value;
                    setComprehensionQuestions(updatedQuestions);
                  }}
                  skillsC={question.skillsC}
                  setSkillC={value => {
                    const updatedQuestions = [...comprehensionQuestions];
                    updatedQuestions[index].skillsC = value;
                    setComprehensionQuestions(updatedQuestions);
                  }}
                  streamC={question.streamC}
                  setStreamC={value => {
                    const updatedQuestions = [...comprehensionQuestions];
                    updatedQuestions[index].streamC = value;
                    setComprehensionQuestions(updatedQuestions);
                  }}
                  tagC={question.tagC}
                  setTagC={value => {
                    const updatedQuestions = [...comprehensionQuestions];
                    updatedQuestions[index].tagC = value;
                    setComprehensionQuestions(updatedQuestions);
                  }}
                  subTopicC={question.subTopicC}
                  setSubTopicC={value => {
                    const updatedQuestions = [...comprehensionQuestions];
                    updatedQuestions[index].subTopicC = value;
                    setComprehensionQuestions(updatedQuestions);
                  }}
                />
                {/* Delete Button */}
                <Button
                  variant="danger"
                  onClick={() => handleRemoveSubQuestion(index)} // Trigger remove function
                  className="mt-2"
                >
                  Remove Sub Question
                </Button>
              </div>
            ))}

          <Button variant="primary" onClick={handleAddSubQuestion}>
            Add Sub Question
          </Button>

          <Button
            variant="secondary"
            onClick={handlePreviewShow}
            className="mt-2"
          >
            Show Preview
          </Button>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Preview Modal */}

      <Modal show={showPreview} onHide={handlePreviewClose}>
        <Modal.Header closeButton>
          <Modal.Title>Question Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "auto" }}>
          <div>
            <h5>Question:</h5>
            <div dangerouslySetInnerHTML={{ __html: enterQuestion }}></div>
          </div>
          <hr />
          <div>
            {(questionType === "Multiple Correct" ||
              questionType === "Single Correct" ||
              questionType === "Assertion Reasoning" ||
              questionType === "Matrix Single Correct") && (
              <Row className="mb-3">
                {["A", "B", "C", "D"].map((letter, index) => (
                  <Col md={6} key={letter}>
                    <Form.Group
                      className="mb-3 mt-3"
                      controlId={`formOption${letter}`}
                    >
                      <Form.Label>Option {letter}</Form.Label>
                      {/* Remove HTML tags and display only plain text */}
                      <div>{stripHtmlTags(options[index])}</div>

                      <Form.Check
                        type="checkbox"
                        label="Answer"
                        checked={correctAnswers.includes(index)} // Check if option index is in selected answers
                        disabled // Disable checkbox since it's only for display
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            )}
          </div>

          <hr />
          <div>
            <h5>Hint and Solution:</h5>
            <div dangerouslySetInnerHTML={{ __html: hitsSolution }}></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePreviewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewQuestion;
