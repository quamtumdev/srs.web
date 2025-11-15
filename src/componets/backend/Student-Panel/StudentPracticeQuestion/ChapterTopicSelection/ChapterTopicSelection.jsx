/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import SelectionBreadcrumb from "./SelectionBreadcrumb";
import ChapterCard from "./ChapterCard";
import TopicCard from "./TopicCard";

const API_BASE_URL = "http://localhost:5000/api/practice";

const ChapterTopicSelection = ({
  subject,
  chapter,
  onChapterSelect,
  onTopicSelect,
  onBackToSubjects,
  onBackToChapters,
  showTopics = false,
}) => {
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState(null);

  // Get studentId from localStorage
  useEffect(() => {
    const getStudentId = () => {
      const studentData = localStorage.getItem("studentData");
      if (studentData) {
        try {
          const parsed = JSON.parse(studentData);
          if (parsed.id) {
            setStudentId(parsed.id);
            console.log("✅ StudentId found:", parsed.id);
          }
        } catch (error) {
          console.error("Error parsing studentData:", error);
        }
      }
    };

    getStudentId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Wait for studentId to be available
      if (!studentId) {
        console.log("⏳ Waiting for studentId...");
        return;
      }

      setLoading(true);

      try {
        if (!showTopics && subject?.id) {
          // Fetch chapters with studentId
          const response = await axios.get(
            `${API_BASE_URL}/student/${studentId}/subjects/${subject.id}/chapters`
          );

          console.log("📚 Chapters Response:", response.data);

          if (response.data.success) {
            const transformedChapters = response.data.chapters.map(ch => ({
              id: ch._id,
              name: ch.name,
              description: ch.description,
              icon: ch.icon,
              difficulty: ch.difficulty,
              questions: ch.questions,
              topicsCount: ch.topicsCount,
            }));
            setChapters(transformedChapters);
          }
        } else if (showTopics && subject?.id && chapter?.id) {
          // Fetch topics with studentId
          const response = await axios.get(
            `${API_BASE_URL}/student/${studentId}/subjects/${subject.id}/chapters/${chapter.id}/topics`
          );

          console.log("📝 Topics Response:", response.data);

          if (response.data.success) {
            const transformedTopics = response.data.topics.map(topic => ({
              id: topic._id,
              name: topic.name,
              description: topic.description,
              questionsCount: topic.questionsCount,
              difficulty: topic.difficulty,
              estimatedTime: topic.estimatedTime,
            }));
            setTopics(transformedTopics);
          }
        }
      } catch (error) {
        console.error("❌ API Error:", error);
        if (error.response) {
          console.error("Error details:", error.response.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subject?.id, chapter?.id, showTopics, studentId]);

  const getDifficultyColor = difficulty => {
    switch (difficulty) {
      case "Easy":
        return "#43e97b";
      case "Medium":
        return "#fdcb6e";
      case "Hard":
        return "#e17055";
      default:
        return "#74b9ff";
    }
  };

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  // Show loading if studentId is not yet available
  if (!studentId) {
    return (
      <div className="student_practice_srs_selection_container">
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading student data...</span>
          </div>
          <p className="mt-2">Please wait, loading student information...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="student_practice_srs_selection_container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">
            {!showTopics ? "Loading chapters..." : "Loading topics..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="student_practice_srs_selection_container">
      <SelectionBreadcrumb
        subject={subject}
        chapter={chapter}
        onBackToSubjects={onBackToSubjects}
      />

      <div className="student_practice_srs_selection_header">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 text-center">
            <h2 className="student_practice_srs_selection_title">
              {!showTopics ? "Choose Chapter" : "Select Topic"}
            </h2>
            <p className="student_practice_srs_selection_subtitle">
              {!showTopics
                ? `Select a chapter from ${subject?.name} to continue`
                : `Choose a topic from ${chapter?.name}`}
            </p>
          </div>
        </div>
      </div>

      {!showTopics && chapters.length === 0 && (
        <div className="alert alert-info text-center">
          <p>No chapters found for this subject.</p>
          <button className="btn btn-primary mt-2" onClick={onBackToSubjects}>
            Back to Subjects
          </button>
        </div>
      )}

      {!showTopics && chapters.length > 0 && (
        <div className="row g-4">
          {chapters.map((chapterItem, index) => (
            <ChapterCard
              key={chapterItem.id}
              chapter={chapterItem}
              index={index}
              onClick={onChapterSelect}
              getDifficultyColor={getDifficultyColor}
              truncateText={truncateText}
            />
          ))}
        </div>
      )}

      {showTopics && topics.length === 0 && (
        <div className="alert alert-info text-center mt-4">
          <p>No topics found for this chapter.</p>
          <button className="btn btn-primary mt-2" onClick={onBackToChapters}>
            Back to Chapters
          </button>
        </div>
      )}

      {showTopics && topics.length > 0 && (
        <div className="student_practice_srs_topics_section">
          <div className="row">
            <div className="col-12">
              <button
                className="student_practice_srs_back_btn"
                onClick={onBackToChapters}
              >
                ← Back to Chapters
              </button>
            </div>
          </div>

          <div className="row g-3">
            {topics.map((topic, index) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                index={index}
                onClick={onTopicSelect}
                truncateText={truncateText}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterTopicSelection;
