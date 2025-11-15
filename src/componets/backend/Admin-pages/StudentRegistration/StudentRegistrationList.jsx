import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from "../GuideLineUI/guideline.module.css";
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import axios from "axios";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";

const StudentRegistrationList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Fetch students data
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/studentRegistration/students"
      );

      if (response.data.success) {
        setStudents(response.data.students || []);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setMessage("Error fetching students");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = student => {
    setEditingStudent(student);
  };

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Success/Error Messages */}
      {message && (
        <div
          className={`alert ${
            messageType === "success" ? "alert-success" : "alert-danger"
          } alert-dismissible fade show mb-4`}
        >
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setMessage("");
              setMessageType("");
            }}
          ></button>
        </div>
      )}

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center pt-4 mb-4">
        <div>
          <h2>Students</h2>
        </div>
        <Button
          variant="primary"
          className={`btn-cancle-back ${styles.btnCancelBack}`}
          onClick={() => setShowAddModal(true)}
        >
          Add New Student
        </Button>
      </div>

      {/* Students Table */}
      <div className="card shadow">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Course/Stream</th>
                  <th>Qualification</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.studentName}</td>
                      <td>{student.studentEmail}</td>
                      <td>{student.studentPhone}</td>
                      <td>{student.course}</td>
                      <td>{student.qualification}</td>
                      <td>{student.address}</td>

                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(student)}
                          title="Edit Student"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      <div className="text-muted">
                        <h5>No Students Registered</h5>
                        <p>
                          Click Add New Student to register the first student
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            setMessage("Student added successfully!");
            setMessageType("success");
            fetchStudents();
          }}
        />
      )}

      {/* Edit Modal */}
      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          setStudentsData={setStudents}
          onClose={() => setEditingStudent(null)}
          onSuccess={() => {
            setEditingStudent(null);
            setMessage("Student updated successfully!");
            setMessageType("success");
          }}
        />
      )}
    </div>
  );
};

export default StudentRegistrationList;
