/* eslint-disable react/prop-types */
const QuestionNavButtons = ({ onPrevious, onNext, hasPrevious, hasNext }) => {
  return (
    <div className="tsm-navigation">
      <button
        className="tsm-nav-btn tsm-prev-btn"
        onClick={onPrevious}
        disabled={!hasPrevious}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        className="tsm-nav-btn tsm-next-btn"
        onClick={onNext}
        disabled={!hasNext}
      >
        NEXT <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default QuestionNavButtons;
