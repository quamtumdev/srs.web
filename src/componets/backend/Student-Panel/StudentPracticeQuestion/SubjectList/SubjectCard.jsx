/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const SubjectCard = ({ subject, index, onClick }) => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="student_practice_srs_subject_card"
        onClick={() => onClick(subject)}
        style={{ "--subject-color": subject.color }}
      >
        <div className="student_practice_srs_card_glow"></div>

        <div className="student_practice_srs_card_header">
          <div className="student_practice_srs_subject_icon_container">
            <span className="student_practice_srs_subject_emoji">
              {subject.icon}
            </span>
          </div>
          <div className="student_practice_srs_image_container">
            <img
              src={subject.image}
              alt={subject.alt}
              className="student_practice_srs_subject_image"
              onError={e => {
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>

        <div className="student_practice_srs_card_body">
          <h3 className="student_practice_srs_subject_title">{subject.name}</h3>
          <p className="student_practice_srs_subject_description">
            {subject.description}
          </p>

          <div className="student_practice_srs_stats">
            <div className="student_practice_srs_stat_item">
              <span className="student_practice_srs_stat_number">
                {subject.totalChapters}
              </span>
              <span className="student_practice_srs_stat_label">Chapters</span>
            </div>
            <div className="student_practice_srs_stat_divider"></div>
            <div className="student_practice_srs_stat_item">
              <span className="student_practice_srs_stat_number">
                {subject.totalQuestions}+
              </span>
              <span className="student_practice_srs_stat_label">Questions</span>
            </div>
          </div>
        </div>

        <div className="student_practice_srs_card_footer">
          <div className="student_practice_srs_action_btn">
            <span className="student_practice_srs_btn_text">
              Start Learning
            </span>
            <span> →</span>
          </div>
        </div>

        <div className="student_practice_srs_hover_overlay"></div>
      </motion.div>
    </div>
  );
};

export default SubjectCard;
