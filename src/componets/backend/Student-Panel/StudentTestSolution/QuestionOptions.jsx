/* eslint-disable react/prop-types */
const QuestionOptions = ({ options, correctAnswer, userAnswer }) => {
  return (
    <div className="tsm-options">
      {options.map((option, index) => {
        const isCorrect = correctAnswer === index;
        const isUserAnswer = userAnswer === index;

        return (
          <div
            key={index}
            className={`tsm-option ${isCorrect ? "correct" : ""} ${
              isUserAnswer && !isCorrect ? "incorrect" : ""
            }`}
          >
            <input
              type="radio"
              name="answer"
              id={`option-${index}`}
              checked={isUserAnswer}
              readOnly
            />
            <label htmlFor={`option-${index}`}>
              <span className="tsm-option-label">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="tsm-option-text">{option}</span>
            </label>
            {isCorrect && (
              <i className="fas fa-check-circle tsm-correct-icon"></i>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionOptions;
