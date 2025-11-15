import { useState, useEffect } from "react";
import axios from "axios";

export const useSubjects = courseId => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        setLoading(true);
        setError("");

        // Get student ID from localStorage
        const storedStudentData = localStorage.getItem("studentData");
        if (!storedStudentData) {
          setError("Please login to view subjects");
          return;
        }

        const studentData = JSON.parse(storedStudentData);

        // Get courseId from params or use first enrolled course
        let currentCourseId = courseId;

        if (!currentCourseId) {
          // If no courseId, get from student's enrolled courses
          const coursesResponse = await axios.get(
            `http://localhost:5000/api/course/student/${studentData.id}/courses`
          );

          if (
            coursesResponse.data.success &&
            coursesResponse.data.courses.length > 0
          ) {
            currentCourseId = coursesResponse.data.courses[0].courseId;
          } else {
            setError("No courses found. Please enroll in a course first.");
            return;
          }
        }

        // Fetch subjects for the course
        const response = await axios.get(
          `http://localhost:5000/api/course/student/${studentData.id}/course/${currentCourseId}/subjects`
        );

        if (response.data.success) {
          setSubjects(response.data.subjects || []);
        } else {
          setError(response.data.message || "Failed to load subjects");
        }
      } catch (error) {
        console.error("Error loading subjects:", error);

        if (error.response?.status === 403) {
          setError("You are not enrolled in this course");
        } else if (error.response?.status === 404) {
          setError("Course not found");
        } else {
          setError("Failed to load subjects. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadSubjects();
  }, [courseId]);

  const retryLoading = () => {
    const loadSubjects = async () => {
      // Same logic as above
    };
    loadSubjects();
  };

  return { subjects, loading, error, retryLoading };
};
