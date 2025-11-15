import { useState } from "react";
import SubjectList from "./SubjectList/SubjectList";
import ChapterTopicSelection from "./ChapterTopicSelection/ChapterTopicSelection";
import QuizInterface from "./QuizInterface/QuizInterface";

const StudentPractice = () => {
  const [currentView, setCurrentView] = useState("subjects");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Handle subject selection
  const handleSubjectSelect = subject => {
    setSelectedSubject(subject);
    setCurrentView("chapters");
  };

  // Handle chapter selection
  const handleChapterSelect = chapter => {
    setSelectedChapter(chapter);
    setCurrentView("topics");
  };

  // Handle topic selection
  const handleTopicSelect = topic => {
    setSelectedTopic(topic);
    setCurrentView("quiz");
  };

  // Navigation handlers
  const handleBackToSubjects = () => {
    setCurrentView("subjects");
    setSelectedSubject(null);
    setSelectedChapter(null);
    setSelectedTopic(null);
  };

  const handleBackToChapters = () => {
    setCurrentView("chapters");
    setSelectedChapter(null);
    setSelectedTopic(null);
  };

  const handleBackToTopics = () => {
    setCurrentView("topics");
    setSelectedTopic(null);
  };
  const containerStyle = {
    background: "linear-gradient(135deg, #003a9d 0%, #4cb3e5 100%)",
  };
  return (
    <div className="student_practice_srs_container" style={containerStyle}>
      {/* Subjects View */}
      {currentView === "subjects" && (
        <SubjectList onSubjectSelect={handleSubjectSelect} />
      )}

      {/* Chapters View */}
      {currentView === "chapters" && (
        <ChapterTopicSelection
          subject={selectedSubject}
          chapter={null}
          onChapterSelect={handleChapterSelect}
          onTopicSelect={null}
          onBackToSubjects={handleBackToSubjects}
          onBackToChapters={null}
          showTopics={false}
        />
      )}

      {/* Topics View */}
      {currentView === "topics" && (
        <ChapterTopicSelection
          subject={selectedSubject}
          chapter={selectedChapter}
          onChapterSelect={null}
          onTopicSelect={handleTopicSelect}
          onBackToSubjects={handleBackToSubjects}
          onBackToChapters={handleBackToChapters}
          showTopics={true}
        />
      )}

      {/* Quiz View */}
      {currentView === "quiz" && (
        <QuizInterface
          subject={selectedSubject}
          chapter={selectedChapter}
          topic={selectedTopic}
          onBackToTopics={handleBackToTopics}
          onBackToChapters={handleBackToChapters}
        />
      )}
    </div>
  );
};

export default StudentPractice;
