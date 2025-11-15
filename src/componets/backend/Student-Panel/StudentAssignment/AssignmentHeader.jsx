/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const AssignmentHeader = ({ subject, studentId }) => {
  const [assignmentsData, setAssignmentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Subject configuration for dynamic icons and colors
  const subjectConfig = {
    1: {
      name: "Physics",
      icon: "fas fa-atom",
      color: "#4CAF50",
      description: "physics",
    },
    2: {
      name: "Chemistry",
      icon: "fas fa-flask",
      color: "#FF9800",
      description: "chemistry",
    },
    3: {
      name: "Mathematics",
      icon: "fas fa-calculator",
      color: "#2196F3",
      description: "mathematics",
    },
  };

  useEffect(() => {
    if (subject?.id && studentId) {
      fetchSubjectAssignments();
    }
  }, [subject, studentId]);

  const fetchSubjectAssignments = async () => {
    try {
      setLoading(true);
      // Backend API call for subject-specific assignments
      const response = await axios.get(
        `http://localhost:5000/api/assignments/student/${studentId}/subject/${subject.id}/assignments`
      );

      if (response.data.success) {
        setAssignmentsData(response.data.assignments || []);
      }
    } catch (error) {
      console.error("Error fetching subject assignments:", error);
      setAssignmentsData([]);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    if (!assignmentsData || assignmentsData.length === 0) {
      return { total: 0, pending: 0, inProgress: 0, submitted: 0, overdue: 0 };
    }

    const stats = {
      total: assignmentsData.length,
      pending: assignmentsData.filter(
        a => a.status === "pending" || a.status === "not-started"
      ).length,
      inProgress: assignmentsData.filter(a => a.status === "in-progress")
        .length,
      submitted: assignmentsData.filter(a => a.status === "submitted").length,
      overdue: assignmentsData.filter(a => a.status === "overdue").length,
    };
    return stats;
  };

  // ✅ Return null if no subject data
  if (!subject || !subject.id) {
    console.log("AssignmentHeader - Missing subject:", subject);
    return null;
  }

  if (loading) {
    return (
      <div className="row mb-5">
        <div className="col-12">
          <div className="assignment-student-srs-header">
            <div className="text-center py-3">
              <div className="spinner-border text-primary"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = getStats();
  const config = subjectConfig[subject.id] || subjectConfig[1];

  return (
    <div className="row mb-5">
      <div className="col-12">
        <div className="assignment-student-srs-header">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12 mb-4 mb-md-0">
              <h1 className="assignment-student-srs-title">
                <i
                  className={`${config.icon} me-3`}
                  style={{ color: config.color }}
                ></i>
                {config.name} Assignments
              </h1>
              <p className="assignment-student-srs-subtitle">
                Manage and track your {config.description} coursework
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="assignment-student-srs-stats-grid">
                <div className="stat-item pending">
                  <span className="stat-number">{stats.pending}</span>
                  <span className="stat-label">Pending</span>
                </div>
                <div className="stat-item progress-1">
                  <span className="stat-number">{stats.inProgress}</span>
                  <span className="stat-label">In Progress</span>
                </div>
                <div className="stat-item submitted">
                  <span className="stat-number">{stats.submitted}</span>
                  <span className="stat-label">Submitted</span>
                </div>
                <div className="stat-item overdue">
                  <span className="stat-number">{stats.overdue}</span>
                  <span className="stat-label">Overdue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentHeader;
