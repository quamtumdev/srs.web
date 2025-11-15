/* eslint-disable react/prop-types */
import { useState } from "react";
import PageHeader from "./Common/PageHeader";
import MainTabs from "./Common/MainTabs";
import TestInfoCard from "./Common/TestInfoCard";
import QuestionFilter from "./QuestionReport/QuestionFilter";
import QuestionTable from "./QuestionReport/QuestionTable";

const QuestionReport = ({ activeTab = "questionReport", onTabChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const testData = {
    name: "MINOR TEST - 06",
    code: "(EG1934)",
    date: "18-02-2023",
    mode: "CBT",
    totalCandidates: 329,
    totalQuestions: 90,
    maximumMarks: 300,
    totalTime: 180,
  };

  const questionData = [
    {
      qNo: 1,
      questionStatus: "-",
      correctAnswer: "b",
      yourAnswer: "-",
      yourScore: 0,
      yourTime: "07:34",
      topperTime: "01:55",
    },
    {
      qNo: 2,
      questionStatus: "-",
      correctAnswer: "a",
      yourAnswer: "-",
      yourScore: 0,
      yourTime: "12:52",
      topperTime: "01:12",
    },
    {
      qNo: 3,
      questionStatus: "-",
      correctAnswer: "c",
      yourAnswer: "-",
      yourScore: 0,
      yourTime: "03:17",
      topperTime: "01:06",
    },
    {
      qNo: 4,
      questionStatus: "-",
      correctAnswer: "b",
      yourAnswer: "-",
      yourScore: 0,
      yourTime: "00:36",
      topperTime: "06:02",
    },
    {
      qNo: 5,
      questionStatus: "-",
      correctAnswer: "a",
      yourAnswer: "-",
      yourScore: 0,
      yourTime: "00:18",
      topperTime: "03:28",
    },
    {
      qNo: 6,
      questionStatus: "-",
      correctAnswer: "b",
      yourAnswer: "-",
      yourScore: 0,
      yourTime: "00:16",
      topperTime: "04:05",
    },
    {
      qNo: 7,
      questionStatus: "-",
      correctAnswer: "a",
      yourAnswer: "-",
      yourScore: 0,
      yourTime: "00:33",
      topperTime: "01:07",
    },
    {
      qNo: 8,
      questionStatus: "-",
      correctAnswer: "a",
      yourAnswer: "-",
      yourScore: 0,
      yourTime: "00:34",
      topperTime: "03:40",
    },
    {
      qNo: 9,
      questionStatus: "-",
      correctAnswer: "c",
      yourAnswer: "-",
      yourScore: 0,
      yourTime: "03:04",
      topperTime: "02:21",
    },
    {
      qNo: 10,
      questionStatus: "-",
      correctAnswer: "b",
      yourAnswer: "-",
      yourScore: 0,
      yourTime: "00:05",
      topperTime: "01:07",
    },
    {
      qNo: 11,
      questionStatus: "-",
      correctAnswer: "b",
      yourAnswer: "-",
      yourScore: 0,
      yourTime: "03:39",
      topperTime: "05:17",
    },
    {
      qNo: 12,
      questionStatus: "-",
      correctAnswer: "-",
      yourAnswer: "-",
      yourScore: 0,
      yourTime: "00:02",
      topperTime: "01:40",
    },
  ];

  return (
    <div className="reports-student-dashboard-srs-container">
      <PageHeader />
      <MainTabs activeTab={activeTab} onTabChange={onTabChange} />

      <div className="reports-student-dashboard-srs-content">
        <TestInfoCard testData={testData} />

        <div className="reports-student-dashboard-srs-question-report-section">
          <h3 className="reports-student-dashboard-srs-section-heading">
            QUESTION REPORT
          </h3>

          <QuestionFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <QuestionTable questions={questionData} />
        </div>
      </div>
    </div>
  );
};

export default QuestionReport;
