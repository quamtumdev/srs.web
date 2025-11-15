import { useState } from "react";
import TestResultModal from "./TestResultModal";

const QuestionActions = () => {
  const [showResultModal, setShowResultModal] = useState(false);

  const handleResultClick = () => {
    setShowResultModal(true);
  };

  const handleCloseModal = () => {
    setShowResultModal(false);
  };

  return (
    <>
      <div className="tsm-action-buttons">
        <button className="tsm-btn tsm-btn-correct">
          <i className="fas fa-check"></i> Correct Answer
        </button>
        <button className="tsm-btn tsm-btn-my-answer">
          <i className="fas fa-times"></i> My Answer -N.A.
        </button>
        <button className="tsm-btn tsm-btn-result" onClick={handleResultClick}>
          Result
        </button>
        <button className="tsm-btn tsm-btn-skip">Skip</button>
      </div>

      {/* Result Modal */}
      {showResultModal && <TestResultModal onClose={handleCloseModal} />}
    </>
  );
};

export default QuestionActions;
