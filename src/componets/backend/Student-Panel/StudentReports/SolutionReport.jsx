/* eslint-disable react/prop-types */
import { useState } from "react";
import PageHeader from "./Common/PageHeader";
import MainTabs from "./Common/MainTabs";
import TestInfoCard from "./Common/TestInfoCard";
import SubjectTabs from "./Common/SubjectTabs";
import TopperTable from "./TopperTable";

const SolutionReport = ({ activeTab = "subjectReport", onTabChange }) => {
  const [activeSubject, setActiveSubject] = useState("physics");

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

  const subjects = [
    { id: "physics", label: "PHYSICS" },
    { id: "chemistry", label: "CHEMISTRY" },
    { id: "maths", label: "MATHS" },
  ];

  const topperData = [
    {
      rank: 263,
      topperName: "Shubham",
      score: 47,
      percentage: "15.67%",
      testModel: "CBT",
      time: "02:24:56",
      totalQuestions: 90,
      rightQuestions: 14,
      wrongQuestions: 9,
      leftQuestions: 67,
    },
    {
      rank: 1,
      topperName: "Gautam Kumar Kashyap",
      score: 206,
      percentage: "68.67%",
      testModel: "CBT",
      time: "03:00:00",
      totalQuestions: 90,
      rightQuestions: 55,
      wrongQuestions: 14,
      leftQuestions: 21,
    },
    {
      rank: 2,
      topperName: "Debyendu Mahatim",
      score: 206,
      percentage: "68.67%",
      testModel: "CBT",
      time: "02:57:37",
      totalQuestions: 90,
      rightQuestions: 53,
      wrongQuestions: 6,
      leftQuestions: 31,
    },
    {
      rank: 3,
      topperName: "Shishanu Kumar",
      score: 195,
      percentage: "65.00%",
      testModel: "CBT",
      time: "03:00:00",
      totalQuestions: 90,
      rightQuestions: 51,
      wrongQuestions: 9,
      leftQuestions: 30,
    },
    {
      rank: 4,
      topperName: "Utkarsh Sharma",
      score: 193,
      percentage: "64.33%",
      testModel: "CBT",
      time: "03:00:00",
      totalQuestions: 90,
      rightQuestions: 50,
      wrongQuestions: 9,
      leftQuestions: 31,
    },
    {
      rank: 5,
      topperName: "Ayushi Verma",
      score: 188,
      percentage: "62.67%",
      testModel: "CBT",
      time: "02:57:44",
      totalQuestions: 90,
      rightQuestions: 50,
      wrongQuestions: 12,
      leftQuestions: 28,
    },
    {
      rank: 6,
      topperName: "Rohin Bansal",
      score: 186,
      percentage: "62.00%",
      testModel: "CBT",
      time: "03:00:00",
      totalQuestions: 90,
      rightQuestions: 48,
      wrongQuestions: 6,
      leftQuestions: 36,
    },
    {
      rank: 7,
      topperName: "Shivam Verma",
      score: 183,
      percentage: "61.00%",
      testModel: "CBT",
      time: "03:00:00",
      totalQuestions: 90,
      rightQuestions: 48,
      wrongQuestions: 9,
      leftQuestions: 33,
    },
    {
      rank: 8,
      topperName: "Ananya Agarwal",
      score: 183,
      percentage: "61.00%",
      testModel: "CBT",
      time: "02:58:15",
      totalQuestions: 90,
      rightQuestions: 49,
      wrongQuestions: 13,
      leftQuestions: 28,
    },
  ];

  return (
    <div className="reports-student-dashboard-srs-container">
      <PageHeader />
      <MainTabs activeTab={activeTab} onTabChange={onTabChange} />

      <div className="reports-student-dashboard-srs-content">
        <TestInfoCard testData={testData} />
        <SubjectTabs
          subjects={subjects}
          activeSubject={activeSubject}
          onSubjectChange={setActiveSubject}
        />
        <TopperTable toppers={topperData} />
      </div>
    </div>
  );
};

export default SolutionReport;
