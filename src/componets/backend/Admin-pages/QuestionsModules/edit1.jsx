/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
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

function EditQuestions({ data, question, setQuestionsData, closeEditModal }) {
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
  const [subTopic, setSubTopic] = useState("");
  const [stream, setStreams] = useState([]);
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState("");
  const [level, setLevel] = useState("");
  const [url, setUrl] = useState("");
  const [hitsSolution, setHitsSolution] = useState("");
  const [fourDigit, setFourDigit] = useState("");
  const [numericAnswerStartRange, setNumericAnswerStartRange] = useState("");
  const [numericAnswerEndRange, setNumericAnswerEndRange] = useState("");
  const [subjectiveAnswerFormat, setSubjectiveAnswerFormat] = useState("");
  const [trueFalseAnswer, setTrueFalseAnswer] = useState(""); // <-- This line should be added
  const [showPreview, setShowPreview] = useState(false);
  // const [comprehensionText, setComprehensionText] = useState("");
  const [subQuestionType, setSubQuestionType] = useState("");
  // const [isActiveC, setIsActiveC] = useState(false);
  // const [urlC, setUrlC] = useState("");
  // const [optionsC, setOptionsC] = useState(["", "", "", ""]);
  // const [correctAnswersC, setCorrectAnswersC] = useState([]);
  // const [hintsSolutionC, setHintsSolutionC] = useState("");
  // const [levelC, setLevelC] = useState("");
  // const [skillsC, setSkillC] = useState("");
  // const [streamC, setStreamC] = useState("");
  // const [tagC, setTagC] = useState("");
  // const [subTopicC, setSubTopicC] = useState("");

  useEffect(() => {
    if (!question || !data) return; // If data or question is missing, exit
    console.log(question);
    console.log(data);

    setQuestionType(question?.questionType || "");
    setEnterQuestion(data?.enterQuestion?.[0] || "");
    setSingleInteger(question?.singleInteger || "");
    setOptions(question?.options || ["", "", "", ""]);
    setCorrectAnswers(question?.correctAnswers || []);
    setMatrixAnswer(question?.matrixAnswer || {});
    setIsActive(data?.active || false);
    setSubjectType(data?.subjectType?.[0] || "");
    setSubTopic(data?.subTopic?.[0] || "");
    setStreams(data.stream);
    setSkills(data.skills);

    // Ensure tags is correctly initialized (as an array or string)
    setTags(Array.isArray(data?.tags) ? data?.tags : [data?.tags]); // If it's a single tag, wrap it in an array

    setLevel(data?.level?.[0] || "");
    setUrl(data?.url || "");
    setHitsSolution(data?.hitsSolution?.[0] || "");
    setFourDigit(question?.fourDigit || "");
    setNumericAnswerStartRange(question?.numericAnswerStartRange || "");
    setNumericAnswerEndRange(question?.numericAnswerEndRange || "");
    setSubjectiveAnswerFormat(question?.subjectiveAnswerFormat || "");
    setTrueFalseAnswer(question?.trueFalseAnswer || "");
    // setComprehensionText(question?.comprehensionText || "");
    setSubQuestionType(data?.subQuestionType || "");
    // setIsActiveC(question?.isActiveC || false);
    // setUrlC(question?.urlC || "");
    // setOptionsC(question?.optionsC || ["", "", "", ""]);
    // setCorrectAnswersC(question?.correctAnswersC || []);
    // setHintsSolutionC(question?.hintsSolutionC || "");
    // setLevelC(question?.levelC || "");
    // setSkillC(question?.skillsC || "");
    // setStreamC(question?.streamC || "");
    // setTagC(question?.tagC || "");
    // setSubTopicC(question?.subTopicC || "");
  }, [question, data]); // Only re-run when question or data changes

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
    console.log("Selected Streams:", selectedStreams); // You can handle this in any way
  };

  const handleSaveSkills = selectedSkills => {
    // Save selected streams data to state or directly to the backend
    setSkills(selectedSkills);
    console.log("Selected Streams:", selectedSkills); // You can handle this in any way
  };
  const handleSaveTags = selectedTags => {
    setTags(selectedTags); // Save the selected tags to the state
    console.log("Selected Tags:", selectedTags);
  };
  const handleSaveLevel = selectedLevels => {
    setLevel(selectedLevels); // Save the selected tags to the state
    console.log("Selected Tags:", selectedLevels);
  };

  // Toggle active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  // Handle Subject Type change and update subtopics accordingly
  const handleSubjectChange = e => {
    const selectedSubject = e.target.value;
    setSubjectType(selectedSubject); // Set the subject
    setSubTopic(""); // Reset the sub-topic when subject changes
  };

  // Handle sub-topic change
  const handleSubTopicChange = e => {
    setSubTopic(e.target.value); // Update selected sub-topic
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

  const handleSave = async () => {
    setLoading(true);
    if (!data._id) {
      console.error("No question ID available to update");
      return;
    }

    const updatedQuestion = {
      enterQuestion, // Assuming enterQuestion is an array of strings
      subjectType, // Assuming subjectType is an array of strings
      questions: [
        {
          questionType, // Assuming questionType is a string like "Multiple Correct" or others
          singleInteger,
          options, // Assuming options is an array of strings
          correctAnswers, // Assuming correctAnswers is an array of numbers
          matrixAnswer, // Assuming matrixAnswer is an object or Map of Boolean
          fourDigit,
          numericAnswerStartRange,
          numericAnswerEndRange,
          subjectiveAnswerFormat,
          trueFalseAnswer: false, // Set default to false if not provided
          // comprehensionText: {
          //   subQuestionType: [subQuestionType], // Ensure subQuestionType is a string.
          //   isActiveC: isActiveC, // Ensure this is a boolean (true or false).
          //   enterQuestionC: comprehensionText, // Ensure this is an array of strings, not an object.
          //   correctAnswersC: correctAnswersC, // This should be an array of numbers (like [1, 2, 3]).
          //   optionsC: optionsC, // This should be an array of strings.
          //   urlC: urlC, // Ensure this is a string, URL or empty.
          //   hintsSolutionC: hintsSolutionC, // This should be an array of strings, not empty strings.
          //   streamC: streamC, // Ensure this is an array of strings.
          //   subTopicC: subTopicC, // This should be an array of strings.
          //   skillsC: skillsC, // This should be an array of strings.
          //   tagC: tagC, // This should be an array of strings.
          //   levelC: levelC, // This should be an array of strings.
          // },
        },
      ],
      subTopic, // Assuming subTopic is an array of strings
      stream, // Assuming stream is an array of strings
      skills, // Assuming skills is an array of strings
      tags, // Assuming tags is an array of strings
      level, // Assuming level is an array of strings
      url,
      hitsSolution,
      createdBy: "admin",
      createdOn: formattedDate, // Assuming formattedDate is a valid string
      updatedBy: "admin",
      updatedOn: formattedDate, // Assuming formattedDate is a valid string
      active: isActive, // Assuming isActive is a boolean value
    };

    try {
      const url2 = `http://localhost:5000/api/auth/ques/${data._id}`;
      const response = await fetch(url2, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuestion),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update question. Status: ${response.status}`
        );
      }

      const updatedData = await response.json();
      setQuestionsData(prevData =>
        prevData.map(q => (q._id === data._id ? updatedData : q))
      );

      closeEditModal();
    } catch (error) {
      setError(`Error updating question: ${error.message}`);
      console.error("Error:", error);
    } finally {
      setLoading(false);
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

  return (
    <>
      <Modal show={true} fullscreen={true} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
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
                    onChange={e => setTrueFalseAnswer(e.target.value)} // Fix typo here
                  />
                  <Form.Check
                    type="radio"
                    label="False"
                    name="trueFalse"
                    value="false"
                    checked={trueFalseAnswer === "false"}
                    onChange={e => setTrueFalseAnswer(e.target.value)} // Fix typo here
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
          {/* 
          {subjectType && (
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group
                  controlId="formSubTopic"
                  onChange={handleSubTopicChange}
                  value={subTopic}
                >
                  <Form.Label>Sub Topic</Form.Label>
                  <Form.Control as="select" name="subTopic">
                    <option value="">Select Sub Topic</option>
                    {subjectData[subjectType]?.map((topic, index) => (
                      <option key={index} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          )} */}
          {subjectType && (
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formSubTopic">
                  <Form.Label>Select Sub-Topic</Form.Label>
                  <Form.Control
                    as="select"
                    value={subTopic}
                    onChange={handleSubTopicChange}
                  >
                    <option value="">Select Sub-Topic</option>
                    {subjectData[subjectType]?.map((topic, index) => (
                      <option key={index} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          )}
          <Row>
            <Col md={4}>
              <Stream
                onSaveStreams={handleSaveStreams}
                selectedStreams={stream}
              />
            </Col>
            <Col md={8}>
              <SkillsQ
                onSaveSkills={handleSaveSkills}
                selectedSkills={skills}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <TagQ onSaveTags={handleSaveTags} selectedTags={tags} />{" "}
              {/* Pass handleSaveTags function */}
            </Col>
            <Col md={6}>
              <DifficultyLevelQ
                onSaveLevel={handleSaveLevel}
                selectedLevels={level}
              />{" "}
              {/* Pass handleSaveTags function */}
            </Col>
          </Row>

          {/* {questionType === "Comprehension" && (
            <ComprehensionInput
              comprehensionText={comprehensionText}
              setComprehensionText={setComprehensionText}
              subQuestionType={subQuestionType}
              setSubQuestionType={setSubQuestionType}
              isActiveC={isActiveC}
              setIsActiveC={setIsActiveC}
              urlC={urlC}
              setUrlC={setUrlC}
              optionsC={optionsC} // Pass options as props
              setOptionsC={setOptionsC} // Pass setter for options
              correctAnswersC={correctAnswersC} // Pass correctAnswers as props
              setCorrectAnswersC={setCorrectAnswersC}
              hintsSolutionC={hintsSolutionC}
              setHintsSolutionC={setHintsSolutionC}
              levelC={levelC} // Pass levelC as a prop to ComprehensionInput
              setLevelC={setLevelC}
              skillsC={skillsC}
              setSkillC={setSkillC}
              streamC={streamC}
              setStreamC={setStreamC}
              tagC={tagC}
              setTagC={setTagC}
              subjectType={subjectType}
              setSubjectType={setSubjectType}
              subTopicC={subTopicC}
              setSubTopicC={setSubTopicC}
            />
          )} */}

          {/* Preview Button */}
          {questionType === "Comprehension" ? (
            <Button variant="primary" className="mt-2">
              Add Sub Question
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={handlePreviewShow}
              className="mt-2" // Function to show preview modal
            >
              Show Preview
            </Button>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
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

export default EditQuestions;
