/* eslint-disable react/prop-types */
const QuestionTable = ({ questions }) => {
  return (
    <div className="reports-student-dashboard-srs-table-wrapper">
      <table className="reports-student-dashboard-srs-table">
        <thead>
          <tr>
            <th>Q.No.</th>
            <th>Question Status</th>
            <th>Correct Answer</th>
            <th>Your Answer</th>
            <th>Your Score</th>
            <th>Your Time</th>
            <th>Topper Time</th>
            <th>View Solution</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(question => (
            <tr key={question.qNo}>
              <td>
                <strong>{question.qNo}</strong>
              </td>
              <td>
                <span className="reports-student-dashboard-srs-status-dash">
                  {question.questionStatus}
                </span>
              </td>
              <td>
                <span className="reports-student-dashboard-srs-answer-badge reports-student-dashboard-srs-correct-answer">
                  {question.correctAnswer}
                </span>
              </td>
              <td>
                <span className="reports-student-dashboard-srs-answer-badge reports-student-dashboard-srs-your-answer">
                  {question.yourAnswer}
                </span>
              </td>
              <td>
                <span
                  className={
                    question.yourScore === 0
                      ? "reports-student-dashboard-srs-zero-score"
                      : ""
                  }
                >
                  {question.yourScore}
                </span>
              </td>
              <td className="reports-student-dashboard-srs-time-cell">
                {question.yourTime}
              </td>
              <td className="reports-student-dashboard-srs-topper-time-cell">
                {question.topperTime}
              </td>
              <td>
                <button className="reports-student-dashboard-srs-view-solution-btn">
                  <span className="reports-student-dashboard-srs-eye-icon">
                    👁
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;
