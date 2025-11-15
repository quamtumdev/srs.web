/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const TopicCard = ({ topic, index, onClick, truncateText }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="student_practice_srs_topic_card"
        onClick={() => onClick(topic)}
      >
        <div className="student_practice_srs_topic_content">
          <div className="student_practice_srs_topic_number">
            {String(index + 1).padStart(2, "0")}
          </div>
          <h5 className="student_practice_srs_topic_name" title={topic.name}>
            {truncateText(topic.name, 1)}
          </h5>
          <p className="student_practice_srs_topic_questions">
            {topic.questionsCount} Questions
          </p>
          <div className="student_practice_srs_topic_arrow">▶</div>
        </div>
      </motion.div>
    </div>
  );
};

export default TopicCard;
