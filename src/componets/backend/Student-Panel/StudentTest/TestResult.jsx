import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TestResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedResult = localStorage.getItem(`test_result_${id}`);
    if (savedResult) {
      setResult(JSON.parse(savedResult));
      setLoading(false);
    } else {
      navigate(`/student/tests/${id}`);
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="Test-result-srs-educares">
        <div className="container-fluid">
          <div className="text-center py-5">
            <div
              className="spinner-border Test-result-srs-educares__spinner"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const percentage = parseFloat(result.percentage);

  const getGrade = percent => {
    if (percent >= 90) return { grade: "A+", color: "#28a745", emoji: "🏆" };
    if (percent >= 80) return { grade: "A", color: "#28a745", emoji: "🌟" };
    if (percent >= 70) return { grade: "B", color: "#17a2b8", emoji: "👍" };
    if (percent >= 60) return { grade: "C", color: "#ffc107", emoji: "📝" };
    if (percent >= 50) return { grade: "D", color: "#fd7e14", emoji: "⚠️" };
    return { grade: "F", color: "#dc3545", emoji: "😔" };
  };

  const gradeInfo = getGrade(percentage);

  return (
    <div className="Test-result-srs-educares">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Success Header */}
            <div className="text-center mb-4">
              <div className="Test-result-srs-educares__success-header">
                <h1 className="Test-result-srs-educares__success-title">
                  <i className="fas fa-check-circle me-3"></i>
                  Test Submitted Successfully!
                </h1>
                <p className="Test-result-srs-educares__success-subtitle">
                  Congratulations! Your test has been evaluated.
                </p>
              </div>
            </div>

            {/* Main Result Card */}
            <div className="card Test-result-srs-educares__card mb-4">
              <div className="card-header Test-result-srs-educares__card-header">
                <h3 className="Test-result-srs-educares__card-title">
                  <i className="fas fa-chart-bar me-2"></i>
                  {result.testTitle}
                </h3>
              </div>

              <div className="card-body Test-result-srs-educares__card-body">
                {/* Grade Circle */}
                <div className="Test-result-srs-educares__grade-section">
                  <div className="d-inline-block position-relative">
                    <div className="Test-result-srs-educares__grade-circle">
                      {gradeInfo.grade}
                      <div className="Test-result-srs-educares__grade-emoji"></div>
                    </div>
                  </div>

                  <div className="Test-result-srs-educares__score-display">
                    <h2 className="Test-result-srs-educares__score-number">
                      {result.obtainedMarks}{" "}
                      <span className="Test-result-srs-educares__score-total">
                        / {result.totalMarks}
                      </span>
                    </h2>
                    <p
                      className="Test-result-srs-educares__percentage"
                      style={{ color: gradeInfo.color }}
                    >
                      {result.percentage}% Score
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="row g-4 mb-4">
                  <div className="col-md-3 col-6">
                    <div className="Test-result-srs-educares__stat-card Test-result-srs-educares__stat-card--correct">
                      <i className="fas fa-check-circle Test-result-srs-educares__stat-icon"></i>
                      <h3 className="Test-result-srs-educares__stat-value">
                        {result.correctAnswers}
                      </h3>
                      <p className="Test-result-srs-educares__stat-label">
                        Correct
                      </p>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="Test-result-srs-educares__stat-card Test-result-srs-educares__stat-card--wrong">
                      <i className="fas fa-times-circle Test-result-srs-educares__stat-icon"></i>
                      <h3 className="Test-result-srs-educares__stat-value">
                        {result.wrongAnswers}
                      </h3>
                      <p className="Test-result-srs-educares__stat-label">
                        Wrong
                      </p>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="Test-result-srs-educares__stat-card Test-result-srs-educares__stat-card--unanswered">
                      <i className="fas fa-question-circle Test-result-srs-educares__stat-icon"></i>
                      <h3 className="Test-result-srs-educares__stat-value">
                        {result.unanswered}
                      </h3>
                      <p className="Test-result-srs-educares__stat-label">
                        Unanswered
                      </p>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="Test-result-srs-educares__stat-card Test-result-srs-educares__stat-card--time">
                      <i className="fas fa-clock Test-result-srs-educares__stat-icon"></i>
                      <h3
                        className="Test-result-srs-educares__stat-value"
                        style={{ fontSize: "14px" }}
                      >
                        {result.timeTaken}
                      </h3>
                      <p className="Test-result-srs-educares__stat-label">
                        Time Taken
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="Test-result-srs-educares__performance">
                  <h5 className="Test-result-srs-educares__performance-title">
                    Performance Analysis
                  </h5>
                  <div className="Test-result-srs-educares__progress-container">
                    <div
                      className="Test-result-srs-educares__progress-bar"
                      style={{
                        width: `${percentage}%`,
                        background: `linear-gradient(90deg, ${gradeInfo.color} 0%, ${gradeInfo.color}dd 100%)`,
                      }}
                    >
                      {percentage}%
                    </div>
                  </div>
                </div>

                {/* Motivational Message */}
                <div
                  className={`Test-result-srs-educares__message ${
                    percentage >= 70
                      ? "Test-result-srs-educares__message--excellent"
                      : percentage >= 50
                      ? "Test-result-srs-educares__message--good"
                      : "Test-result-srs-educares__message--poor"
                  }`}
                >
                  <h5
                    className={`Test-result-srs-educares__message-title ${
                      percentage >= 70
                        ? "Test-result-srs-educares__message-title--excellent"
                        : percentage >= 50
                        ? "Test-result-srs-educares__message-title--good"
                        : "Test-result-srs-educares__message-title--poor"
                    }`}
                  >
                    {percentage >= 90 && "🎉 Outstanding Performance!"}
                    {percentage >= 70 && percentage < 90 && "👏 Great Job!"}
                    {percentage >= 50 && percentage < 70 && "💪 Good Effort!"}
                    {percentage < 50 && "📚 Keep Practicing!"}
                  </h5>
                  <p
                    className="Test-result-srs-educares__message-text"
                    style={{
                      color:
                        percentage >= 70
                          ? "#155724"
                          : percentage >= 50
                          ? "#856404"
                          : "#721c24",
                    }}
                  >
                    {percentage >= 90 &&
                      "Excellent work! You have mastered this topic."}
                    {percentage >= 70 &&
                      percentage < 90 &&
                      "Well done! Keep up the good work."}
                    {percentage >= 50 &&
                      percentage < 70 &&
                      "Nice try! A bit more practice will help."}
                    {percentage < 50 &&
                      "Don't worry! Review the topics and try again."}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="Test-result-srs-educares__actions">
                  <button
                    className="btn btn-lg Test-result-srs-educares__btn-primary"
                    onClick={() => navigate("/student/tests")}
                  >
                    <i className="fas fa-home me-2"></i>
                    Back to Tests
                  </button>
                  <button
                    className="btn btn-lg Test-result-srs-educares__btn-secondary"
                    onClick={() => navigate(`/student/tests/${id}`)}
                  >
                    <i className="fas fa-eye me-2"></i>
                    View Test Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
