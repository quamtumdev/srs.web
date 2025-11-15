import { useNavigate } from "react-router-dom";

const StudentLoginButton = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/student-login");
  };

  return (
    <div className="student-login-container">
      <button
        type="button"
        className="student-login btn"
        onClick={handleLoginClick}
      >
        <i className="fas fa-user-graduate"></i>
        Student Login
      </button>
    </div>
  );
};

export default StudentLoginButton;
