import AdminMasterLayout from "../backend/Admin-pages/AdminLayout/AdminMaster/AdminMasterLayout";
import Guidelines from "../backend/Admin-pages/Guidelines";
import Stream from "../backend/Admin-pages/Stream";
import Subject from "../backend/Admin-pages/SubjectModule/Subject";
import Exam from "../backend/Admin-pages/ExamModule/Exam";
import Test from "../backend/Admin-pages/TestTypeModule/Test";
import DifficultyLevel from "../backend/Admin-pages/DifficultyLevelModule/DifficultyLevel";
import Skills from "../backend/Admin-pages/SkillsModule/Skills";
import Tag from "../backend/Admin-pages/TagModule/Tag";
import Topic from "../backend/Admin-pages/TopicModule/Topic";
import TestSeries from "../backend/Admin-pages/TestSeriesModule/TestSeries";
import TestList from "../backend/Admin-pages/TestModule/TestList";
import MarkingScheme from "../backend/Admin-pages/MarkingSchemeModule/MarkingScheme";
import Questions from "../backend/Admin-pages/QuestionsModules/Questions";

import User from "../backend/Admin-pages/UsersModule/User";
import Student from "../backend/Admin-pages/StudentRegistration/Student";
import AdminStudyMaterialUpload from "../backend/Admin-pages/StudyMaterial/AdminStudyMaterialUpload";
import ManageTest from "../backend/Admin-pages/TestManagement/ManageTests";
import ManageQuestions from "../backend/Admin-pages/TestManagement/ManageQuestions";
const AdminRoute = [
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "guidelines",
        element: <Guidelines />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "students",
        element: <Student />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "streams",
        element: <Stream />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "subjects",
        element: <Subject />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "exams",
        element: <Exam />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "study-material",
        element: <AdminStudyMaterialUpload />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "ManageTests",
        element: <ManageTest />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "ManageQuestions",
        element: <ManageQuestions />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "tests",
        element: <Test />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "difficulty-levels",
        element: <DifficultyLevel />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "skills",
        element: <Skills />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "tag",
        element: <Tag />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "topics",
        element: <Topic />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "test-series",
        element: <TestSeries />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "test-list",
        element: <TestList />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "marking-scheme",
        element: <MarkingScheme />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "questions",
        element: <Questions />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMasterLayout />,
    children: [
      {
        path: "users",
        element: <User />,
      },
    ],
  },
];

export default AdminRoute;
