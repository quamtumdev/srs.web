/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";

const useChapterTopics = (subject, chapterNumber) => {
  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Convert subject route to proper subject name
  const getSubjectName = subjectRoute => {
    const subjectMapping = {
      physics: "Physics",
      chemistry: "Chemistry",
      maths: "Mathematics",
    };
    return subjectMapping[subjectRoute?.toLowerCase()] || subjectRoute;
  };

  const loadChapterData = async () => {
    try {
      setLoading(true);
      setError("");

      const storedStudentData = localStorage.getItem("studentData");
      if (!storedStudentData) {
        setError("Please login to view chapter");
        return;
      }

      const studentData = JSON.parse(storedStudentData);
      const subjectName = getSubjectName(subject);

      // Get first enrolled course
      const coursesResponse = await axios.get(
        `http://localhost:5000/api/course/student/${studentData.id}/courses`
      );

      if (
        coursesResponse.data.success &&
        coursesResponse.data.courses.length > 0
      ) {
        const courseId = coursesResponse.data.courses[0].courseId;

        // Fetch chapter topics for any subject
        const response = await axios.get(
          `http://localhost:5000/api/course/student/${studentData.id}/course/${courseId}/subject/${subjectName}/chapter/${chapterNumber}/topics`
        );

        if (response.data.success) {
          setChapterData({
            title: response.data.chapter.title,
            number: response.data.chapter.number,
            description: response.data.chapter.description,
            topics: response.data.topics || [],
            subject: subjectName,
            subjectRoute: subject,
            chapterNumber: chapterNumber,
            topicsCount: response.data.topics?.length || 0,
          });
        } else {
          setError(response.data.message || "Failed to load chapter");
        }
      } else {
        setError("No courses found. Please enroll in a course first.");
      }
    } catch (error) {
      console.error("Error loading chapter data:", error);

      if (error.response?.status === 404) {
        setError(
          `Chapter ${chapterNumber} not found for ${getSubjectName(subject)}`
        );
      } else if (error.response?.status === 403) {
        setError("You are not enrolled in this course");
      } else if (error.code === "ECONNREFUSED") {
        setError(
          "Unable to connect to server. Please check if server is running."
        );
      } else {
        setError("Failed to load chapter. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const retryLoading = () => {
    loadChapterData();
  };

  useEffect(() => {
    if (subject && chapterNumber) {
      loadChapterData();
    }
  }, [subject, chapterNumber]);

  return {
    chapterData,
    loading,
    error,
    retryLoading,
  };
};

export default useChapterTopics;
