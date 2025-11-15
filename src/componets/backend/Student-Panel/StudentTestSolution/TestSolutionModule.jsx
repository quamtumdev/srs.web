import { useState } from "react";
import TestHeader from "./TestHeader";
import SubjectTabs from "./SubjectTabs";
import QuestionDisplay from "./QuestionDisplay";
import QuestionNavigation from "./QuestionNavigation";

const TestSolutionModule = () => {
  const [activeTab, setActiveTab] = useState("PHYSICS");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const tabs = ["PHYSICS", "CHEMISTRY", "BIOLOGY-I", "BIOLOGY-II"];

  const questionsBySubject = {
    PHYSICS: [
      {
        id: 1,
        question:
          "A 1 kg stone at the end of 1 m long string is whirled in a vertical circle at constant speed of 4 m/sec. The tension in the string is 6N, when the stone is at (given g=10m/sec²) -",
        options: [
          "Top of the circle",
          "Bottom of the circle",
          "Half way down",
          "None of these",
        ],
        correctAnswer: 0,
        userAnswer: 0,
        isCorrect: true,
        explanation: "N.A.",
        marks: 4,
        subject: "PHYSICS",
      },
      {
        id: 2,
        question: "Sample Physics Question 2",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 1,
        userAnswer: null,
        isCorrect: false,
        explanation: "N.A.",
        marks: 4,
        subject: "PHYSICS",
      },
    ],
    CHEMISTRY: [],
    "BIOLOGY-I": [],
    "BIOLOGY-II": [],
  };

  const getQuestionStatus = num => {
    if ([3, 6, 16, 17, 29].includes(num)) return "correct";
    if ([4, 13, 14, 22, 24, 42, 45].includes(num)) return "incorrect";
    if ([23, 26, 32, 46, 48].includes(num)) return "unanswered";
    return "unanswered";
  };

  const currentQuestions = questionsBySubject[activeTab] || [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleTabChange = tab => {
    setActiveTab(tab);
    setCurrentQuestionIndex(0);
  };

  const handleQuestionChange = index => {
    setCurrentQuestionIndex(index);
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="tsm-container">
      <TestHeader />

      <div className="tsm-main-content">
        <div className="row g-0">
          {/* Left Panel - Question Display */}
          <div className="col-lg-8 col-md-7">
            <div className="tsm-question-panel">
              <div className="tsm-test-title">
                <h6>MINOR TEST - 09 (M66838) | 19 March 2023 | OFFLINE</h6>
              </div>

              <SubjectTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />

              <QuestionDisplay
                question={currentQuestion}
                questionIndex={currentQuestionIndex}
                onNext={handleNext}
                onPrevious={handlePrevious}
                hasNext={currentQuestionIndex < currentQuestions.length - 1}
                hasPrevious={currentQuestionIndex > 0}
              />
            </div>
          </div>

          {/* Right Panel - Question Navigation */}
          <div className="col-lg-4 col-md-5">
            <QuestionNavigation
              totalQuestions={50}
              activeTab={activeTab}
              getQuestionStatus={getQuestionStatus}
              onQuestionSelect={handleQuestionChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSolutionModule;
