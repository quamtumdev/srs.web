import StudentMasterLayout from "../backend/Student-Panel/StudentLayout/StudentMasterLayout/StudentMasterLayout";
import StudentDashboard from "../backend/Student-Panel/StudentDashboardModule/StudentDashboard";
import Student from "../backend/Student-Panel/StudentProfile/Student";
import MyCourses from "../backend/Student-Panel/StudentCourses/MyCourses";
import Subjects from "../backend/Student-Panel/StudentSubject/Subjects";
import Physics from "../backend/Student-Panel/StudentSubject/Physics";
import Chemistry from "../backend/Student-Panel/StudentSubject/Chemistry";
import Maths from "../backend/Student-Panel/StudentSubject/Maths";
import GenericChapterNotes from "../backend/Student-Panel/StudentNotes/GenericChapterNotes";
import StudentAssignment from "../backend/Student-Panel/StudentAssignment/StudentAssignment";
import AssignmentDashboard from "../backend/Student-Panel/StudentAssignment/AssignmentDashboard";
import AssignmentDetailsView from "../backend/Student-Panel/StudentAssignment/AssignmentDetailsView";
import StudentPractice from "../backend/Student-Panel/StudentPracticeQuestion/StudentPractice";
import TestModule from "../backend/Student-Panel/StudentTest/TestModule";
import CreateTest from "../backend/Student-Panel/StudentTest/CreateTest";
import ViewTest from "../backend/Student-Panel/StudentTest/ViewTest";
import EditTest from "../backend/Student-Panel/StudentTest/EditTest";
import StartTest from "../backend/Student-Panel/StudentTest/StartTest";
import TestResult from "../backend/Student-Panel/StudentTest/TestResult";
import DigitalMaterial from "../backend/Student-Panel/StudyMaterial/DigitalMaterial";
import TopicReport from "../backend/Student-Panel/StudentReports/TopicReport";
import ReportsDashboard from "../backend/Student-Panel/StudentReports/ReportsDashboard";
import ScoreCard from "../backend/Student-Panel/StudentReports/ScoreCard";
import TestAdmin from "../backend/Student-Panel/TestAdmin/TestAdmin";
import TestReports from "../backend/Student-Panel/TestReports/TestReports";
import TestSolutionModule from "../backend/Student-Panel/StudentTestSolution/TestSolutionModule";
const StudentRoute = [
  {
    path: "/student",
    element: <StudentMasterLayout />,
    children: [
      {
        index: true,
        element: <StudentDashboard />,
      },
      {
        path: "studentDashboard",
        element: <StudentDashboard />,
      },
      {
        path: "myProfile",
        element: <Student />,
      },
      {
        path: "profile/edit",
        element: <Student />,
      },
      {
        path: "profile/edit/:profileId",
        element: <Student />,
      },
      {
        path: "myCourses",
        element: <MyCourses />,
      },
      {
        path: "mySubjects",
        element: <Subjects />,
      },
      {
        path: ":subject/chapter/:chapterNumber",
        element: <GenericChapterNotes />,
      },
      {
        path: "physics",
        element: <Physics />,
      },
      {
        path: "chemistry",
        element: <Chemistry />,
      },
      {
        path: "maths",
        element: <Maths />,
      },

      {
        path: "study",
        element: <DigitalMaterial />,
      },

      {
        path: "reports",
        element: <ReportsDashboard />,
      },
      {
        path: "reports/score-card",
        element: <ScoreCard />,
      },
      {
        path: "reports/topic-report",
        element: <TopicReport />,
      },
      {
        path: "testsByAdmin",
        element: <TestAdmin />,
      },

      {
        path: "testsReports",
        element: <TestReports />,
      },
      {
        path: "testsReportSolutions",
        element: <TestSolutionModule />,
      },
      // Assignment Routes
      {
        path: "assignments/",
        element: <StudentAssignment />,
      },
      {
        path: "assignments/:id",
        element: <AssignmentDashboard />,
      },
      {
        path: "assignments/:subjectId/assignment-details/:assignmentId",
        element: <AssignmentDetailsView />,
      },

      {
        path: "practice_questions",
        element: <StudentPractice />,
      },
      {
        path: "practice_questions/:subjectId",
        element: <StudentPractice />,
      },
      {
        path: "practice_questions/:subjectId/:chapterId",
        element: <StudentPractice />,
      },
      {
        path: "practice_questions/:subjectId/:chapterId/:topicId",
        element: <StudentPractice />,
      },

      // Test Module Routes
      {
        path: "tests",
        element: <TestModule />,
      },
      {
        path: "tests/create",
        element: <CreateTest />,
      },
      {
        path: "tests/:id/view",
        element: <ViewTest />,
      },
      {
        path: "tests/:id/start",
        element: <StartTest />,
      },
      {
        path: "tests/:id/edit",
        element: <EditTest />,
      },
      {
        path: "tests/:id/result",
        element: <TestResult />,
      },
    ],
  },
];

export default StudentRoute;
