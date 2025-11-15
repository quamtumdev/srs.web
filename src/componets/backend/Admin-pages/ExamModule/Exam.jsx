import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import AddExam from "./AddExam";
import EditExam from "./EditExam";
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import backendStyle from "../GuideLineUI/guideline.module.css";

const Exam = () => {
  const [examsData, setExamsData] = useState([]); // Initially empty array
  const [selectedExam, setSelectedExam] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch exams data from backend when component mounts
  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/exam/exam"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exams");
        }
        const data = await response.json();
        setExamsData(data); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching exams: " + error.message); // Handle error
      } finally {
        setLoading(false); // Reset loading state after request
      }
    };

    fetchExams(); // Fetch data on mount
  }, []);

  // Add a new exam
  const addNewExam = newExam => {
    setExamsData([...examsData, newExam]);
  };

  // Toggle the active status of an exam
  const toggleActiveStatus = id => {
    setExamsData(prevData =>
      prevData.map(exam =>
        exam._id === id ? { ...exam, active: !exam.active } : exam
      )
    );
  };

  // Open the edit modal
  const openEditModal = exam => {
    setSelectedExam(exam);
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedExam(null);
  };

  // Update exam data
  const updateExamData = updatedExam => {
    setExamsData(prevData =>
      prevData.map(exam => (exam._id === updatedExam._id ? updatedExam : exam))
    );
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="exam-h1">Exams</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <AddExam addNewExam={addNewExam} />
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Loading and Error Handling */}
            {loading && <p>Loading exams...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Loop through fetched exams data and display them */}
            {examsData.map(exam => (
              <div className="col-md-12" key={exam._id}>
                <div className="card collapsed-card">
                  <div className="card-header">
                    <h3 className="card-title">{exam.title}</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                      {/* Toggle Active/Inactive */}
                      <button
                        type="button"
                        className={`${backendStyle.guidelineCustomBtn} ${
                          exam.active
                            ? backendStyle.activeBtn
                            : backendStyle.inactiveBtn
                        }`}
                        onClick={() => toggleActiveStatus(exam._id)}
                      >
                        {exam.active ? "Active" : "Inactive"}
                      </button>

                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn exam-custom-btn edit-btn"
                        onClick={() => openEditModal(exam)}
                      >
                        <FaEdit className="fs-4" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body exam-card-backend">
                    <div className="row">
                      <div className="col-lg-6">
                        <strong>Unique URL:</strong> {exam.uniqueURL}
                      </div>
                      <div className="col-lg-6">
                        <strong>Marking Scheme:</strong> {exam.markingScheme}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <strong>Guideline:</strong> {exam.guildeline}
                      </div>
                      <div className="col-lg-6">
                        <strong>Stream:</strong> {exam.stream}
                      </div>
                    </div>
                    <div className="col-lg-12 d-flex align-items-start">
                      <span className="me-2">
                        <strong>Description:</strong>
                      </span>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: Array.isArray(exam.description)
                            ? exam.description.join("")
                            : exam.description,
                        }}
                      />
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-md-3">
                        <strong>Created By:</strong> {exam.createdBy}
                      </div>
                      <div className="col-md-3">
                        <strong>Created On:</strong> {exam.createdOn}
                      </div>
                      <div className="col-md-3">
                        <strong>Updated By:</strong> {exam.updatedBy}
                      </div>
                      <div className="col-md-3">
                        <strong>Updated On:</strong> {exam.updatedOn}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isEditModalOpen && (
        <EditExam
          exam={selectedExam}
          updateExamData={updateExamData} // Pass the update function as prop
          closeEditModal={closeEditModal}
        />
      )}
    </>
  );
};

export default Exam;
