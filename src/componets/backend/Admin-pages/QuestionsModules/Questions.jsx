import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { BiAlarmExclamation } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap"; // For modal functionality
import { FaBook, FaTag } from "react-icons/fa"; // Add your icons
import AddNewQuestion from "./AddNewQuestion";
import EditQuestions from "./EditQuestions";
import StreamFilter from "./StreamFilter";
import axios from "axios";
import SubjectTypeSelector from "./SubjectTypeSelector";
import SubTopicSelector from "./SubTopicSelector";
import SkillsFilter from "./SkillsFilter";
import ComplexityLevelFilter from "./ComplexityLevelFilter";
import QuestionTypeFilter from "./QuestionTypeFilter";
import StatusFilter from "./StatusFilter";
import SRSUniqueFilter from "./SRSUniqueFilter";
import QuestionFilter from "./QuestionFilter";
import ResetAllFiltersButton from "./ResetAllFiltersButton";

const Questions = () => {
  const [questionsData, setQuestionsData] = useState([]); // Store the questions data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Handle any fetch errors
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false); // To control modal visibility
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStream, setSelectedStream] = useState(""); // Track selected stream
  const [selectedSubjectType, setSelectedSubjectType] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedquestionType, setSelectedQuestionType] = useState(null);
  const [selectedActive, setSelectedActive] = useState(null);
  const [selectedUniqueCode, setSelectedUniqueCode] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState("");
  const addNewQuestions = newQuestions => {
    setQuestionsData(prevData => [...prevData, newQuestions]);
  };

  // Open the edit modal for a selected question
  const openEditModal = (data, question) => {
    setSelectedQuestion({ data, question });
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedQuestion(null);
  };

  // Handle the update of a question
  const handleUpdateQuestion = async updatedData => {
    try {
      // Optimistic update (immediate update on the frontend for faster response)
      setQuestionsData(prevData =>
        prevData.map(item => {
          if (item._id === updatedData._id) {
            return {
              ...item,
              questions: item.questions.map(question =>
                question._id === updatedData._id ? updatedData : question
              ),
            };
          }
          return item;
        })
      );

      // Now refetch the updated data from the backend
      const response = await fetch("http://localhost:5000/api/auth/ques/");
      if (!response.ok) throw new Error("Failed to fetch questions");

      const data = await response.json();
      if (Array.isArray(data)) {
        setQuestionsData(data); // Update questions data with fresh data from the backend
      }
    } catch (error) {
      console.error("Error updating question:", error);
      setError("Error updating question: " + error.message);
    }
  };

  // Reset filters to their initial state
  const handleResetFilters = () => {
    setSelectedStream("");
    setSelectedSubjectType("");
    setSelectedSubTopic("");
    setSelectedSkill(null);
    setSelectedLevel(null);
    setSelectedQuestionType(null);
    setSelectedActive(null);
    setSelectedUniqueCode("");
    setSelectedQuestions("");
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "http://localhost:5000/api/auth/ques/";

        if (
          selectedStream &&
          selectedSubjectType &&
          selectedSubTopic &&
          selectedSkill &&
          selectedLevel &&
          selectedquestionType &&
          setSelectedActive &&
          selectedUniqueCode &&
          selectedQuestions
        ) {
          url = `http://localhost:5000/api/auth/ques/streamSubjectSubTopic?stream=${selectedStream.value}&subjectType=${selectedSubjectType.value}&subTopic=${selectedSubTopic.value}`;
        } else if (selectedStream && selectedSubjectType) {
          url = `http://localhost:5000/api/auth/ques/streamSubject?stream=${selectedStream.value}&subjectType=${selectedSubjectType.value}`;
        } else if (selectedStream) {
          url = `http://localhost:5000/api/auth/ques/filter?stream=${selectedStream.value}`;
        } else if (selectedSubjectType) {
          url = `http://localhost:5000/api/auth/ques/subject?subjectType=${selectedSubjectType.value}`;
        } else if (selectedSubTopic) {
          url = `http://localhost:5000/api/auth/ques/filter-by-subtopic?subTopic=${selectedSubTopic.value}`;
        } else if (selectedSkill) {
          url = `http://localhost:5000/api/auth/ques/filter-by-skill?skill=${selectedSkill.value}`;
        } else if (selectedLevel) {
          url = `http://localhost:5000/api/auth/ques/filter-by-level?level=${selectedLevel.value}`;
        } else if (selectedquestionType) {
          url = `http://localhost:5000/api/auth/ques/filter-by-type?questionType=${selectedquestionType.value}`;
        } else if (selectedActive) {
          url = `http://localhost:5000/api/auth/ques/filter-by-status?status=${selectedActive.value}`;
        } else if (selectedUniqueCode) {
          url = `http://localhost:5000/api/auth/ques/filter-by-SRSUniqueCode?SRSUniqueCode=${selectedUniqueCode}`;
        } else if (selectedQuestions) {
          url = `http://localhost:5000/api/auth/ques/filter-by-enterQuestion?enterQuestion=${selectedQuestions}`;
        } else {
          url = `http://localhost:5000/api/auth/ques/reset`;
        }

        const response = await axios.get(url);
        if (Array.isArray(response.data) && response.data.length === 0) {
          setQuestionsData([]);
          setError("No data found for the selected filters.");
        } else {
          setQuestionsData(response.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Error fetching questions: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [
    selectedStream,
    selectedSubjectType,
    selectedSubTopic,
    selectedSkill,
    selectedLevel,
    selectedquestionType,
    selectedActive,
    selectedUniqueCode,
    selectedQuestions,
  ]);

  // Open the preview modal with the selected question
  const openPreviewModal = (data, question) => {
    setSelectedQuestion({ data, question }); // Store both data and question
    setIsPreviewModalOpen(true); // Open the modal
  };

  // Close the preview modal
  const closePreviewModal = () => {
    setIsPreviewModalOpen(false);
    setSelectedQuestion(null);
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-lg-3">
              <StreamFilter onStreamSelect={setSelectedStream} />
            </div>
            <div className="col-lg-3">
              {" "}
              <SubjectTypeSelector onSubjectSelect={setSelectedSubjectType} />
            </div>
            <div className="col-lg-3">
              {" "}
              <SubTopicSelector
                selectedSubject={selectedSubjectType}
                onSubTopicSelect={setSelectedSubTopic}
              />
            </div>
            <div className="col-lg-3">
              <SkillsFilter onSkillSelect={setSelectedSkill} />
            </div>
          </div>
          <div className="mt-3">
            <div className="row">
              <div className="col-lg-3 ">
                <ComplexityLevelFilter onComplexitySelect={setSelectedLevel} />{" "}
              </div>
              <div className="col-lg-3 ">
                <QuestionTypeFilter
                  onQuestionTypeSelect={setSelectedQuestionType}
                />
              </div>
              <div className="col-lg-3 ">
                <StatusFilter onStatusSelect={setSelectedActive} />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="row">
              <div className="col-lg-3 ">
                <SRSUniqueFilter onChange={setSelectedUniqueCode} />
              </div>
              <div className="col-lg-3 ">
                <QuestionFilter onQuestionSearch={setSelectedQuestions} />
              </div>
              <div className="col-lg-3 ">
                <ResetAllFiltersButton onResetFilters={handleResetFilters} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <h1 className="stream-h1 mt-3">Questions</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right mt-3">
                <AddNewQuestion addNewQuestions={addNewQuestions} />
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="row">
          {/* Loading state */}
          {loading && <p>Loading questions...</p>}

          {/* Error state */}
          {error && <p className="text-dark">{error}</p>}

          {questionsData.length === 0 ? (
            <p>No questions available for the selected stream.</p>
          ) : (
            <div className="col-12">
              <div className="card">
                <div className="card-body table-responsive p-0">
                  <table className="table table-head-fixed text-nowrap">
                    <thead>
                      <tr className="skyblue-clr">
                        <th>Unique Code</th>
                        <th>Question</th>
                        <th>Question Type</th>
                        <th>Difficulty Level</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionsData.map((data, index) => {
                        const questions = Array.isArray(data?.questions)
                          ? data.questions
                          : [];

                        if (questions.length === 0) {
                          return (
                            <tr key={index}>
                              <td colSpan="6">
                                No questions available for this set.
                              </td>
                            </tr>
                          );
                        }

                        return questions.map((question, subIndex) => {
                          return (
                            <tr key={`${data.SRSUniqueCode}-${subIndex}`}>
                              <td>{data.SRSUniqueCode}</td>
                              <td>{data.enterQuestion}</td>
                              <td>{question.questionType}</td>
                              <td>{data.level.join(", ")}</td>
                              <td>{data.active ? "Active" : "Inactive"}</td>
                              <td>
                                <span>
                                  <MdEdit
                                    className="edit-question"
                                    onClick={() =>
                                      openEditModal(data, question)
                                    }
                                  />
                                </span>
                                <span>
                                  <BiAlarmExclamation
                                    className="preview-questions"
                                    onClick={() =>
                                      openPreviewModal(data, question)
                                    } // Pass both data and question
                                  />{" "}
                                </span>
                              </td>
                            </tr>
                          );
                        });
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {isEditModalOpen && selectedQuestion && (
        <EditQuestions
          data={selectedQuestion.data}
          question={selectedQuestion.question}
          setQuestionsData={handleUpdateQuestion}
          closeEditModal={closeEditModal}
        />
      )}

      {/* Preview Modal */}
      {/* Preview Modal */}
      {isPreviewModalOpen && selectedQuestion && (
        <Modal show={isPreviewModalOpen} onHide={closePreviewModal}>
          <Modal.Header closeButton>
            <Modal.Title>Question Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-3">
              <div className="col-12">
                <p>
                  {" "}
                  <strong>Question Type: </strong>
                  {selectedQuestion.question.questionType}
                </p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <h5>Question: {selectedQuestion.data.enterQuestion}</h5>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12">
                <p>
                  <strong>Question URL:</strong>{" "}
                  {selectedQuestion.data.url || "Not Provided"}
                </p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12">
                <p>
                  <strong>Hint and Solution:</strong>{" "}
                  {selectedQuestion.data.hitsSolution || "Not Provided"}
                </p>
              </div>
            </div>

            {/* Stream */}
            <div className="row mb-3">
              <div className="col-md-6">
                <p>
                  <FaBook />
                  <strong>Stream:</strong>{" "}
                  {selectedQuestion.data.stream || "Not Specified"}
                </p>
              </div>

              {/* Skills */}
              <div className="col-md-6">
                <p>
                  <strong>Skills:</strong>{" "}
                  {selectedQuestion.data.skills?.join(", ") || "Not Specified"}
                </p>
              </div>
            </div>

            {/* Sub Topics and Subject */}
            <div className="row mb-3">
              <div className="col-md-6">
                <p>
                  <strong>Sub Topics:</strong>{" "}
                  {selectedQuestion.data.subTopic || "Not Specified"}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Subject:</strong>{" "}
                  {selectedQuestion.data.subjectType || "Not Specified"}
                </p>
              </div>
            </div>

            {/* Difficulty Level */}
            <div className="row mb-3">
              <div className="col-12">
                <p>
                  <strong>Difficulty Level:</strong>{" "}
                  {selectedQuestion.data.level?.join(", ") || "Not Specified"}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="row mb-3">
              <div className="col-12">
                <p>
                  <FaTag />
                  <strong>Tags:</strong>{" "}
                  {selectedQuestion.data.tags?.join(", ") || "Not Specified"}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="row mb-3">
              <div className="col-12">
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedQuestion.data.active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-3">
                <p>Created By: {selectedQuestion.data.createdBy}</p>
              </div>
              <div className="col-3">
                <p>Updated By: {selectedQuestion.data.updatedBy}</p>
              </div>
              <div className="col-3">
                <p>Created On: {selectedQuestion.data.createdOn}</p>
              </div>
              <div className="col-3">
                <p>Updated On: {selectedQuestion.data.updatedOn}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closePreviewModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Questions;
