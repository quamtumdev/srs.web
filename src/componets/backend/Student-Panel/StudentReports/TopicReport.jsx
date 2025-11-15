/* eslint-disable react/prop-types */
import { useState } from "react";
import PageHeader from "./Common/PageHeader";
import MainTabs from "./Common/MainTabs";
import TestInfoCard from "./Common/TestInfoCard";
import SubjectTabs from "./Common/SubjectTabs";
import TopicTable from "./TopicReport/TopicTable";

const TopicReport = ({ activeTab = "topicReport", onTabChange }) => {
  const [activeSubject, setActiveSubject] = useState("physics");

  const testData = {
    name: "MINOR TEST - 06",
    code: "EG1934",
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

  const topicData = [
    {
      id: 1,
      topic: "W & R",
      subTopic: "Conservative forces & Non-conservative Energy",
      totalQuestion: 4,
      topicMaxMarks: 16,
      correctIncorrect: "0/0",
      rightNegativeMarks: "0/0",
      questionLeft: "4/16",
      marksScored: 0,
      highestMarks: 16,
      toppersTiming: 11,
      avgMarks: 4.73,
    },
    // ... rest of topic data
  ];

  const summaryData = {
    totalQuestions: 90,
    totalMarks: 300,
    correctIncorrect: "0/1",
    rightNegative: "0/0",
    questionLeft: "29/116",
    marksScored: -1,
    highestMarks: 152,
    avgMarks: 14,
  };

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
        <TopicTable topicData={topicData} summaryData={summaryData} />
      </div>
    </div>
  );
};

export default TopicReport;
