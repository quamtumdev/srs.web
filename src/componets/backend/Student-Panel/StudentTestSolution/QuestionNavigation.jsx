/* eslint-disable react/prop-types */
import StudentInfo from "./StudentInfo";
import QuestionGrid from "./QuestionGrid";
import QuestionLegend from "./QuestionLegend";

const QuestionNavigation = ({
  totalQuestions,
  activeTab,
  getQuestionStatus,
  onQuestionSelect,
}) => {
  return (
    <div className="tsm-sidebar">
      <StudentInfo />

      <div className="tsm-timer">
        <span className="tsm-timer-icon">⏱️</span>
        <span className="tsm-timer-text">00 min : 00 sec</span>
      </div>

      <div className="tsm-subject-dropdown">
        <select className="form-select" value={activeTab} disabled>
          <option>PHYSICS</option>
          <option>CHEMISTRY</option>
          <option>BIOLOGY-I</option>
          <option>BIOLOGY-II</option>
        </select>
      </div>

      <QuestionGrid
        totalQuestions={totalQuestions}
        getQuestionStatus={getQuestionStatus}
        onQuestionSelect={onQuestionSelect}
      />

      <QuestionLegend />
    </div>
  );
};

export default QuestionNavigation;
