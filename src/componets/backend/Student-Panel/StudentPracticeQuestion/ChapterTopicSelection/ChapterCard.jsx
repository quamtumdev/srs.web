/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const ChapterCard = ({
  chapter,
  index,
  onClick,
  getDifficultyColor,
  truncateText,
}) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className="student_practice_srs_chapter_card"
        onClick={() => onClick(chapter)}
      >
        <div className="student_practice_srs_chapter_header">
          <div className="student_practice_srs_chapter_icon">
            {chapter.icon}
          </div>
          <div
            className="student_practice_srs_difficulty_badge"
            style={{
              backgroundColor: getDifficultyColor(chapter.difficulty),
            }}
          >
            {chapter.difficulty}
          </div>
        </div>

        <div className="student_practice_srs_chapter_body">
          <h4
            className="student_practice_srs_chapter_name"
            title={chapter.name}
          >
            {truncateText(chapter.name, 3)}
          </h4>
          <p
            className="student_practice_srs_chapter_description"
            title={chapter.description}
          >
            {truncateText(chapter.description, 7)}
          </p>
          <p className="student_practice_srs_chapter_stats">
            {chapter.questions} Questions
          </p>
        </div>

        <div className="student_practice_srs_chapter_footer">
          <div className="student_practice_srs_chapter_btn">
            <span>Explore Topics</span>
            <span> →</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChapterCard;
