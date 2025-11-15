/* eslint-disable react/prop-types */
const QuestionGrid = ({
  totalQuestions,
  getQuestionStatus,
  onQuestionSelect,
}) => {
  const questionNumbers = Array.from(
    { length: totalQuestions },
    (_, i) => i + 1
  );

  return (
    <div className="tsm-question-grid">
      {questionNumbers.map(num => {
        const status = getQuestionStatus(num);
        return (
          <button
            key={num}
            className={`tsm-question-number ${status}`}
            onClick={() => onQuestionSelect(num - 1)}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionGrid;
