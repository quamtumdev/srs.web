/* eslint-disable react/prop-types */
const QuestionSolution = ({ explanation }) => {
  return (
    <div className="tsm-solution">
      <div className="tsm-solution-header">Solution.</div>
      <div className="tsm-solution-content">{explanation}</div>
    </div>
  );
};

export default QuestionSolution;
