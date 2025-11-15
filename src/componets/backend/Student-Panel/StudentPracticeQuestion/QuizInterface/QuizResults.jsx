/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const QuizResults = ({
  score,
  subject,
  chapter,
  topic,
  onBackToTopics,
  onBackToChapters,
}) => {
  return (
    <div className="student_practice_srs_results_container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="student_practice_srs_results_card"
          >
            <div className="student_practice_srs_results_header">
              <div className="student_practice_srs_score_circle">
                <div className="student_practice_srs_score_value">{score}%</div>
                <div className="student_practice_srs_score_label">Score</div>
              </div>
              <h2 className="student_practice_srs_results_title">
                {score >= 80
                  ? "Excellent!"
                  : score >= 60
                  ? "Good Job!"
                  : "Keep Practicing!"}
              </h2>
              <div className="student_practice_srs_results_details">
                <p>
                  Subject: <strong>{subject.name}</strong>
                </p>
                <p>
                  Chapter: <strong>{chapter.name}</strong>
                </p>
                <p>
                  Topic: <strong>{topic.name}</strong>
                </p>
              </div>
            </div>

            <div className="student_practice_srs_results_actions">
              <button
                className="student_practice_srs_btn student_practice_srs_btn_primary"
                onClick={onBackToTopics}
              >
                Try Another Topic
              </button>
              <button
                className="student_practice_srs_btn student_practice_srs_btn_secondary"
                onClick={onBackToChapters}
              >
                Back to Chapters
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
