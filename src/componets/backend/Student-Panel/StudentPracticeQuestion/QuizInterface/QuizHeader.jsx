/* eslint-disable react/prop-types */
const QuizHeader = ({
  subject,
  chapter,
  topic,
  currentQuestion,
  totalQuestions,
  timeLeft,
  isSubmitted,
  isSubmitting,
  finalScore,
  formatTime,
  onBackToTopics,
}) => {
  return (
    <div className="student_practice_srs_quiz_header">
      <div className="row">
        <div className="col-lg-8 col-md-7">
          <div className="student_practice_srs_quiz_breadcrumb">
            <span>{subject.name}</span>
            <span> → </span>
            <span>{chapter.name}</span>
            <span> → </span>
            <span className="student_practice_srs_active_topic">
              {topic.name}
            </span>
          </div>
          <div className="student_practice_srs_progress_section">
            <div className="student_practice_srs_progress_text">
              Question {currentQuestion + 1} of {totalQuestions}
              {isSubmitted && (
                <span className="text-success ms-2">(Submitted)</span>
              )}
              {isSubmitting && (
                <span className="text-warning ms-2">(Submitting...)</span>
              )}
            </div>
            <div className="student_practice_srs_progress_bar">
              <div
                className="student_practice_srs_progress_fill"
                style={{
                  width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-5">
          <div className="student_practice_srs_timer_section">
            <div className="student_practice_srs_timer">
              <span>Time: </span>
              <span className="student_practice_srs_time_left">
                {isSubmitted || isSubmitting
                  ? "Completed"
                  : formatTime(timeLeft)}
              </span>
            </div>
            {isSubmitted && finalScore !== null && (
              <div className="student_practice_srs_final_score">
                <strong>Final Score: {finalScore}%</strong>
              </div>
            )}
            <button
              className="student_practice_srs_back_to_topics"
              onClick={onBackToTopics}
            >
              ←
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
