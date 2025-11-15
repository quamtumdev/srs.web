/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import SubjectHeader from "./SubjectHeader";
import SubjectCard from "./SubjectCard";

const SubjectList = ({ onSubjectSelect }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState(null);

  const limitToFourWords = text => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > 4 ? words.slice(0, 4).join(" ") + "..." : text;
  };

  // Get studentId from localStorage
  useEffect(() => {
    const getStudentId = () => {
      const studentData = localStorage.getItem("studentData");
      if (studentData) {
        try {
          const parsed = JSON.parse(studentData);
          if (parsed.id) {
            setStudentId(parsed.id);

            return;
          }
        } catch (error) {
          console.error("Error parsing studentData:", error);
        }
      }

      // Fallback
      const fallbackKeys = [
        "studentregistrations",
        "currentStudent",
        "studentInfo",
      ];
      for (const key of fallbackKeys) {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            const parsed = JSON.parse(value);
            const id = parsed.id || parsed._id;
            if (id) {
              setStudentId(id);

              return;
            }
          } catch (error) {
            if (value.length === 24) {
              setStudentId(value);
              return;
            }
          }
        }
      }

      setError("Student authentication required. Please login first.");
    };

    getStudentId();
  }, []);

  // Fetch subjects with studentId
  useEffect(() => {
    const fetchSubjects = async () => {
      // Wait for studentId
      if (!studentId) {
        console.log("⏳ Waiting for studentId...");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Updated URL with studentId
        const response = await axios.get(
          `http://localhost:5000/api/practice/student/${studentId}/subjects`
        );

        if (response.data.success) {
          const transformedSubjects = response.data.subjects.map(subject => ({
            id: subject._id,
            name: subject.name,
            description: limitToFourWords(subject.description),
            icon: subject.icon,
            image: subject.image,
            alt: subject.alt,
            color: subject.color,
            totalChapters: subject.totalChapters,
            totalQuestions: subject.totalQuestions,
          }));

          setSubjects(transformedSubjects);
          console.log(
            ` Loaded ${transformedSubjects.length} subjects for student`
          );
        } else {
          setError("Failed to fetch subjects");
        }
      } catch (error) {
        console.error(" API Error:", error);
        if (error.response) {
          console.error("Error details:", error.response.data);
          setError(
            error.response.data.message ||
              "Failed to fetch subjects. Please try again."
          );
        } else {
          setError(
            `Error: ${error.message}. Make sure backend server is running on port 5000.`
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [studentId]); // Dependency on studentId

  // Show loading if studentId is not available
  if (!studentId) {
    return (
      <div className="student_practice_srs_subject_container">
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading student data...</span>
          </div>
          <SubjectHeader
            title="Loading"
            subtitle="Please wait, loading student information..."
            icon="⏳"
          />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="student_practice_srs_subject_container">
        <SubjectHeader
          title="Practice Questions"
          subtitle="Loading your subjects..."
          icon="⏳"
        />
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="student_practice_srs_subject_container">
        <SubjectHeader title="Error" subtitle={error} icon="⚠️" />
        <div className="text-center mt-3">
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="student_practice_srs_subject_container">
        <SubjectHeader
          title="No Subjects Found"
          subtitle="No subjects have been assigned to you yet. Please contact your administrator."
          icon="📭"
        />
        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="student_practice_srs_subject_container">
      <SubjectHeader
        title="Practice Questions"
        subtitle={`Choose your subject and start your learning journey (${subjects.length} subjects available)`}
      />

      <div className="row g-4 justify-content-center">
        {subjects.map((subject, index) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            index={index}
            onClick={onSubjectSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
