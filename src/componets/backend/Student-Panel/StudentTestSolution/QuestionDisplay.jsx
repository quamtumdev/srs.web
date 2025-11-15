/* eslint-disable react/prop-types */
import QuestionOptions from "./QuestionOptions";
import QuestionActions from "./QuestionActions";
import QuestionSolution from "./QuestionSolution";
import QuestionNavButtons from "./QuestionNavButtons";

const QuestionDisplay = ({
  question,
  questionIndex,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}) => {
  if (!question) {
    return (
      <div className="tsm-question-content">
        <div className="tsm-no-records">
          <p>No record found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tsm-question-content">
      <div className="tsm-question-header">
        <span className="tsm-question-label">Question {questionIndex + 1}</span>
        <div className="tsm-question-meta">
          <span className="tsm-max-marks">Maximum Marks: {question.marks}</span>
          <span className="tsm-neg-marks">Negative Marks: 1.00</span>
          <span className="tsm-time">Time: ⏱️ N/A</span>
        </div>
      </div>

      <div className="tsm-question-text">
        <p>{question.question}</p>
      </div>

      <QuestionOptions
        options={question.options}
        correctAnswer={question.correctAnswer}
        userAnswer={question.userAnswer}
      />

      <QuestionActions />

      <QuestionSolution explanation={question.explanation} />

      <QuestionNavButtons
        onPrevious={onPrevious}
        onNext={onNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />
    </div>
  );
};

export default QuestionDisplay;
