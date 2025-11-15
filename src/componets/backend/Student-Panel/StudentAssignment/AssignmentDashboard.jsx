/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AssignmentCard from "./AssignmentCard";
import AssignmentHeader from "./AssignmentHeader";
import AssignmentFilters from "./AssignmentFilters";
import "../../../../assets/backend/dist/css/studentadmin.css";
import { Outlet } from "react-router-dom";

const AssignmentDashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [assignments, setAssignments] = useState([]);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [studentId, setStudentId] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get subject ID from URL

  useEffect(() => {
    // Get student ID from localStorage
    const storedStudentData = localStorage.getItem("studentData");
    if (storedStudentData) {
      try {
        const studentData = JSON.parse(storedStudentData);
        setStudentId(studentData.id);
      } catch (err) {
        console.error("Error parsing student data:", err);
        setError("Invalid student data. Please login again.");
      }
    }
  }, []);

  useEffect(() => {
    if (!id || !studentId) {
      setIsLoading(false);
      return;
    }

    loadSubjectAssignments();
  }, [id, studentId]);

  const loadSubjectAssignments = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Subjects mapping
      const subjects = {
        1: { id: 1, name: "Physics", slug: "physics" },
        2: { id: 2, name: "Chemistry", slug: "chemistry" },
        3: { id: 3, name: "Mathematics", slug: "maths" },
      };

      const subject = subjects[id];
      if (!subject) {
        throw new Error(`Invalid subject ID: ${id}`);
      }

      setCurrentSubject(subject);

      // Backend API call for subject assignments
      const response = await axios.get(
        `http://localhost:5000/api/assignments/student/${studentId}/subject/${id}/assignments`,
        { timeout: 10000 }
      );

      if (response.data.success) {
        setAssignments(response.data.assignments || []);
      } else {
        console.log("No assignments found for subject:", subject?.name);
        setAssignments([]);
      }
    } catch (error) {
      console.error("Error loading assignments:", error);

      if (error.response?.status === 404) {
        setAssignments([]);
        setError(null);
      } else {
        setError("Failed to load assignments");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Filter assignments based on active filter
  const filteredAssignments = assignments.filter(assignment => {
    if (activeFilter === "all") return true;
    // Map backend status to frontend filter
    const status = assignment.status;
    if (activeFilter === "pending") {
      return status === "pending" || status === "not-started";
    }
    return status === activeFilter;
  });

  // Show loading state
  if (isLoading) {
    return (
      <section className="assignment-student-srs-main-section">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
            <p className="mt-3">
              Loading {currentSubject?.name || "subject"} assignments...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show error if needed
  if (error) {
    return (
      <section className="assignment-student-srs-main-section">
        <div className="container">
          <div className="text-center py-5">
            <i className="fas fa-exclamation-triangle fa-4x text-warning mb-3"></i>
            <h4>Error</h4>
            <p>{error}</p>
            <button
              className="btn btn-primary"
              onClick={loadSubjectAssignments}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Show error if subject not found
  if (!currentSubject) {
    return (
      <section className="assignment-student-srs-main-section">
        <div className="container">
          <div className="text-center py-5">
            <i className="fas fa-exclamation-triangle fa-4x text-warning mb-3"></i>
            <h4>Subject Not Found</h4>
            <p>The subject with ID {id} could not be found.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="assignment-student-srs-main-section">
      <div className="container">
        {/* Dynamic Header Component with backend data */}
        <AssignmentHeader subject={currentSubject} studentId={studentId} />

        {/* Filters Component */}
        <AssignmentFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          assignmentsData={assignments}
        />

        {/* Assignment Cards Grid */}
        <div className="row g-4">
          {filteredAssignments.map(assignment => (
            <div key={assignment.id} className="col-xl-6 col-lg-6 col-md-12">
              <AssignmentCard
                assignment={assignment}
                subject={currentSubject}
                studentId={studentId}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAssignments.length === 0 && (
          <div className="row">
            <div className="col-12">
              <div className="assignment-student-srs-empty-state text-center py-5">
                <i className="fas fa-clipboard-list fa-4x text-muted mb-3"></i>
                <h4 className="text-muted">No assignments found</h4>
                <p className="text-muted">
                  {activeFilter === "all"
                    ? `No assignments available for ${currentSubject.name}`
                    : `No ${activeFilter} assignments found. Try changing your filter.`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </section>
  );
};

export default AssignmentDashboard;
