/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const QuestionCard = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  isSubmitted,
  isSubmitting,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className={`student_practice_srs_question_card ${
        isSubmitted ? "submitted" : ""
      } ${isSubmitting ? "submitting" : ""}`}
    >
      <div className="student_practice_srs_question_header">
        <span className="student_practice_srs_question_type">
          {question.type.replace("-", " ").toUpperCase()}
        </span>
        &nbsp;&nbsp;
        <span className="student_practice_srs_question_marks">
          {question.marks} Mark{question.marks > 1 ? "s" : ""}
        </span>
      </div>

      <h3 className="student_practice_srs_question_text">
        {question.question}
      </h3>

      <div className="student_practice_srs_answer_section">
        {question.type === "multiple-choice" && (
          <div className="student_practice_srs_options">
            {question.options.map((option, index) => (
              <motion.label
                key={index}
                whileHover={
                  !isSubmitted && !isSubmitting ? { scale: 1.02 } : {}
                }
                whileTap={!isSubmitted && !isSubmitting ? { scale: 0.98 } : {}}
                className={`student_practice_srs_option ${
                  selectedAnswer === index ? "selected" : ""
                } ${isSubmitted || isSubmitting ? "disabled" : ""}`}
                onClick={() => onAnswerSelect(index)}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index}
                  checked={selectedAnswer === index}
                  onChange={() => onAnswerSelect(index)}
                  disabled={isSubmitted || isSubmitting}
                />
                <span className="student_practice_srs_option_marker">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="student_practice_srs_option_text">
                  {option}
                </span>
              </motion.label>
            ))}
          </div>
        )}

        {question.type === "fill-in-blank" && (
          <div className="student_practice_srs_fill_blank">
            <input
              type="text"
              className="student_practice_srs_text_input"
              placeholder="Enter your answer..."
              value={selectedAnswer || ""}
              onChange={e => onAnswerSelect(e.target.value)}
              disabled={isSubmitted || isSubmitting}
              readOnly={isSubmitted || isSubmitting}
            />
          </div>
        )}

        {question.type === "descriptive" && (
          <div className="student_practice_srs_descriptive">
            <textarea
              className="student_practice_srs_textarea"
              placeholder="Write your detailed answer here..."
              rows="6"
              value={selectedAnswer || ""}
              onChange={e => onAnswerSelect(e.target.value)}
              disabled={isSubmitted || isSubmitting}
              readOnly={isSubmitted || isSubmitting}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
