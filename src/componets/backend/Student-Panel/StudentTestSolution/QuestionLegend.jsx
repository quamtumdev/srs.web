const QuestionLegend = () => {
  return (
    <div className="tsm-legend">
      <div className="tsm-legend-item">
        <span className="tsm-legend-box correct">●</span>
        <span>Correct</span>
      </div>
      <div className="tsm-legend-item">
        <span className="tsm-legend-box incorrect">●</span>
        <span>Incorrect</span>
      </div>
      <div className="tsm-legend-item">
        <span className="tsm-legend-box unanswered">●</span>
        <span>Unattempted</span>
      </div>
      <div className="tsm-legend-item">
        <span className="tsm-legend-box skip">●</span>
        <span>Skip</span>
      </div>
    </div>
  );
};

export default QuestionLegend;
