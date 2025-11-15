// components/StudentRegistration/index.jsx
import StudentRegistrationList from "./StudentRegistrationList";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";

const StudentRegistration = () => {
  return <StudentRegistrationList />;
};

// Export all components
export default StudentRegistration;
export { AddStudentModal, EditStudentModal };
