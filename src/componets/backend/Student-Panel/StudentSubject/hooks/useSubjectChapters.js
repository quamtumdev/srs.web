import { useState, useEffect } from "react";
import axios from "axios";

export const useSubjectChapters = subjectName => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadChapters = async () => {
      try {
        setLoading(true);
        setError("");

        const storedStudentData = localStorage.getItem("studentData");
        if (!storedStudentData) {
          setError("Please login to view chapters");
          return;
        }

        const studentData = JSON.parse(storedStudentData);

        // Get first enrolled course
        const coursesResponse = await axios.get(
          `http://localhost:5000/api/course/student/${studentData.id}/courses`
        );

        if (
          coursesResponse.data.success &&
          coursesResponse.data.courses.length > 0
        ) {
          const courseId = coursesResponse.data.courses[0].courseId;

          // Fetch chapters for the subject
          const response = await axios.get(
            `http://localhost:5000/api/course/student/${studentData.id}/course/${courseId}/subject/${subjectName}/chapters`
          );

          if (response.data.success) {
            setChapters(response.data.chapters || []);
          } else {
            setError(response.data.message || "Failed to load chapters");
          }
        } else {
          setError("No courses found. Please enroll in a course first.");
        }
      } catch (error) {
        console.error("Error loading chapters:", error);

        if (error.response?.status === 403) {
          setError("You are not enrolled in this course");
        } else if (error.response?.status === 404) {
          setError(`${subjectName} subject not found in your enrolled course`);
        } else if (error.code === "ECONNREFUSED") {
          setError(
            "Unable to connect to server. Please check if server is running."
          );
        } else {
          setError("Failed to load chapters. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (subjectName) {
      loadChapters();
    }
  }, [subjectName]);

  return { chapters, loading, error };
};

// Default export भी add करें
export default useSubjectChapters;
