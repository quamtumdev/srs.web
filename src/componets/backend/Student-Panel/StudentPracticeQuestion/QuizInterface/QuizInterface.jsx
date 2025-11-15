/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import QuizHeader from "./QuizHeader";
import QuestionCard from "./QuestionCard";
import QuizNavigation from "./QuizNavigation";
import QuizResults from "./QuizResults";

const API_BASE_URL = "http://localhost:5000/api/practice";

const QuizInterface = ({
  subject,
  chapter,
  topic,
  onBackToTopics,
  onBackToChapters,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [previousAttempt, setPreviousAttempt] = useState(null);

  // Get studentId from localStorage
  useEffect(() => {
    const getStudentId = () => {
      const studentData = localStorage.getItem("studentData");
      if (studentData) {
        try {
          const parsed = JSON.parse(studentData);
          if (parsed.id) {
            setStudentId(parsed.id);
            console.log("QuizInterface - StudentId found:", parsed.id);
            return;
          }
        } catch (error) {
          console.error("Error parsing studentData:", error);
        }
      }

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
              console.log(`QuizInterface - StudentId found from ${key}:`, id);
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

      console.error("QuizInterface - StudentId not found!");
    };

    getStudentId();
  }, []);

  // Check for previous attempt in localStorage
  useEffect(() => {
    if (!studentId || !topic?.id) return;

    const quizKey = `quiz_attempt_${studentId}_${topic.id}`;
    const savedAttempt = localStorage.getItem(quizKey);

    if (savedAttempt) {
      try {
        const attempt = JSON.parse(savedAttempt);
        console.log("Previous quiz attempt found:", attempt);
        setPreviousAttempt(attempt);
        setFinalScore(attempt.score);
        setShowResults(true);
        setIsSubmitted(true);
        setLoading(false);
      } catch (error) {
        console.error("Error parsing previous attempt:", error);
      }
    }
  }, [studentId, topic?.id]);

  // Load questions with studentId
  useEffect(() => {
    const fetchQuestions = async () => {
      // Skip if already submitted
      if (previousAttempt) {
        console.log("Quiz already attempted, showing results");
        return;
      }

      // Wait for studentId
      if (!studentId) {
        console.log("Waiting for studentId...");
        return;
      }

      try {
        setLoading(true);

        if (subject?.id && chapter?.id && topic?.id) {
          const response = await axios.get(
            `${API_BASE_URL}/student/${studentId}/subjects/${subject.id}/chapters/${chapter.id}/topics/${topic.id}/questions?limit=10`
          );

          console.log("Questions Response:", response.data);

          if (response.data.success) {
            const transformedQuestions = response.data.questions.map(q => ({
              id: q.id,
              question: q.question,
              type: q.type,
              options: q.options,
              correctAnswer: q.correctAnswer,
              difficulty: q.difficulty,
              marks: q.marks || 1,
            }));
            setQuizQuestions(transformedQuestions);
            setQuizStartTime(Date.now());
            console.log(`Loaded ${transformedQuestions.length} questions`);
          }
        }
      } catch (error) {
        console.error("API Error:", error);
        if (error.response) {
          console.error("Error details:", error.response.data);
        }
        setQuizQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subject, chapter, topic, studentId, previousAttempt]);

  // Timer
  useEffect(() => {
    if (
      timeLeft > 0 &&
      !showResults &&
      !loading &&
      !isSubmitted &&
      !isSubmitting
    ) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !loading && !isSubmitted && !isSubmitting) {
      handleSubmit();
    }
  }, [timeLeft, showResults, loading, isSubmitted, isSubmitting]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionId, answer) => {
    if (isSubmitted || isSubmitting) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (
        q.type === "multiple-choice" &&
        selectedAnswers[q.id] === q.correctAnswer
      ) {
        correct++;
      }
    });
    const mcqQuestions = quizQuestions.filter(
      q => q.type === "multiple-choice"
    );
    return mcqQuestions.length > 0
      ? Math.round((correct / mcqQuestions.length) * 100)
      : 0;
  };

  const handleSubmit = async () => {
    if (isSubmitted || isSubmitting || !studentId) {
      if (!studentId) {
        alert("Student authentication required. Please refresh and try again.");
      }
      return;
    }

    console.log("Starting quiz submission...");
    setIsSubmitting(true);

    const timeSpent = quizStartTime
      ? Math.floor((Date.now() - quizStartTime) / 1000)
      : 0;
    const score = calculateScore();
    setFinalScore(score);

    console.log("Submitting quiz:", {
      studentId,
      subjectId: subject.id,
      chapterId: chapter.id,
      topicId: topic.id,
      totalAnswers: Object.keys(selectedAnswers).length,
      score,
      timeSpent,
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/quiz/${studentId}/${subject.id}/${chapter.id}/${topic.id}/submit`,
        {
          answers: selectedAnswers,
          timeSpent: timeSpent,
        }
      );

      console.log("Quiz submission response:", response.data);

      if (response.data.success) {
        console.log("Quiz saved to database!");

        // Save attempt to localStorage
        const quizKey = `quiz_attempt_${studentId}_${topic.id}`;
        const attemptData = {
          score: score,
          totalQuestions: quizQuestions.length,
          answeredQuestions: Object.keys(selectedAnswers).length,
          timeSpent: timeSpent,
          submittedAt: new Date().toISOString(),
          subject: {
            id: subject.id,
            name: subject.name,
          },
          chapter: {
            id: chapter.id,
            name: chapter.name,
          },
          topic: {
            id: topic.id,
            name: topic.name,
          },
        };

        localStorage.setItem(quizKey, JSON.stringify(attemptData));
        console.log("Quiz attempt saved to localStorage");
      }
    } catch (error) {
      console.error("Quiz submission failed:", error);
      if (error.response) {
        console.error("Error details:", error.response.data);
      }
    } finally {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }

    setShowResults(true);
  };

  // Show loading if studentId is not available
  if (!studentId) {
    return (
      <div className="student_practice_srs_quiz_container">
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading student data...</span>
          </div>
          <p className="mt-2">Please wait, loading student information...</p>
        </div>
      </div>
    );
  }

  if (loading && !previousAttempt) {
    return (
      <div className="student_practice_srs_quiz_container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Show results if quiz was already attempted
  if (showResults || previousAttempt) {
    const score = finalScore !== null ? finalScore : calculateScore();
    return (
      <QuizResults
        score={score}
        subject={subject}
        chapter={chapter}
        topic={topic}
        onBackToTopics={onBackToTopics}
        onBackToChapters={onBackToChapters}
        previousAttempt={previousAttempt}
      />
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="student_practice_srs_quiz_container">
        <div className="text-center py-5">
          <h3>No questions available for this topic</h3>
          <p className="text-muted">
            This topic does not have any questions assigned yet.
          </p>
          <button
            className="student_practice_srs_btn student_practice_srs_btn_primary mt-3"
            onClick={onBackToTopics}
          >
            Back to Topics
          </button>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <div className="student_practice_srs_quiz_container">
      <QuizHeader
        subject={subject}
        chapter={chapter}
        topic={topic}
        currentQuestion={currentQuestion}
        totalQuestions={quizQuestions.length}
        timeLeft={timeLeft}
        isSubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        finalScore={finalScore}
        formatTime={formatTime}
        onBackToTopics={onBackToTopics}
      />

      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-12">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion}
              question={currentQ}
              selectedAnswer={selectedAnswers[currentQ.id]}
              onAnswerSelect={answer => handleAnswerSelect(currentQ.id, answer)}
              isSubmitted={isSubmitted}
              isSubmitting={isSubmitting}
            />
          </AnimatePresence>
        </div>
      </div>

      <QuizNavigation
        currentQuestion={currentQuestion}
        totalQuestions={quizQuestions.length}
        selectedAnswers={selectedAnswers}
        questions={quizQuestions}
        isSubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        onShowResults={() => setShowResults(true)}
        setCurrentQuestion={setCurrentQuestion}
      />
    </div>
  );
};

export default QuizInterface;
