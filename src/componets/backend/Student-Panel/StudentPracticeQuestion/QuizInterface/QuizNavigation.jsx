/* eslint-disable react/prop-types */
const QuizNavigation = ({
  currentQuestion,
  totalQuestions,
  selectedAnswers,
  questions,
  isSubmitted,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
  onShowResults,
  setCurrentQuestion,
}) => {
  return (
    <div className="student_practice_srs_quiz_navigation">
      <div className="row">
        <div className="col-md-4">
          <button
            className="student_practice_srs_nav_btn student_practice_srs_prev_btn"
            onClick={onPrevious}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>
        </div>

        <div className="col-md-4">
          <div className="student_practice_srs_question_dots">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`student_practice_srs_dot ${
                  index === currentQuestion ? "active" : ""
                } ${
                  selectedAnswers[questions[index].id] !== undefined
                    ? "answered"
                    : ""
                } ${isSubmitted ? "submitted" : ""}`}
                onClick={() => setCurrentQuestion(index)}
                title={`Question ${index + 1} - ${
                  questions[index].marks
                } marks`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="col-md-4 text-end">
          {!isSubmitted && !isSubmitting ? (
            currentQuestion < totalQuestions - 1 ? (
              <button
                className="student_practice_srs_nav_btn student_practice_srs_next_btn"
                onClick={onNext}
              >
                Next →
              </button>
            ) : (
              <button
                className="student_practice_srs_nav_btn student_practice_srs_submit_btn"
                onClick={onSubmit}
              >
                Submit Quiz
              </button>
            )
          ) : isSubmitting ? (
            <div className="text-center">
              <div
                className="spinner-border spinner-border-sm text-warning me-2"
                role="status"
              ></div>
              <span className="text-warning">Submitting...</span>
            </div>
          ) : (
            <div className="student_practice_srs_submit_status">
              <span className="badge bg-success p-2 mb-2">Quiz Submitted</span>
              <br />
              <button
                className="student_practice_srs_nav_btn student_practice_srs_results_btn"
                onClick={onShowResults}
              >
                View Results
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizNavigation;
