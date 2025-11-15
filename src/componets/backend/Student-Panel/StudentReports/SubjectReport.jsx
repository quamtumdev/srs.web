/* eslint-disable react/prop-types */

import PageHeader from "./Common/PageHeader";
import MainTabs from "./Common/MainTabs";
import TestInfoCard from "./Common/TestInfoCard";
import TimeManagementTable from "./SubjectReport/TimeManagementTable";
import SubjectAnalysisCharts from "./SubjectReport/SubjectAnalysisCharts";

const SubjectReport = ({ activeTab = "subjectReport", onTabChange }) => {
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

  const timeManagementData = [
    {
      subjectName: "PHYSICS",
      attempted: 1,
      correctQues: 0,
      incorrectQues: 1,
      percentage: "-1%",
      score: -1,
      time: "00:43:26",
    },
    {
      subjectName: "CHEMISTRY",
      attempted: 21,
      correctQues: 13,
      incorrectQues: 8,
      percentage: "44%",
      score: 44,
      time: "01:37:49",
    },
    {
      subjectName: "MATHS",
      attempted: 1,
      correctQues: 1,
      incorrectQues: 0,
      percentage: "4%",
      score: 4,
      time: "00:03:31",
    },
    {
      subjectName: "Total Summary",
      attempted: 23,
      correctQues: 14,
      incorrectQues: 9,
      percentage: "15.67%",
      score: 47,
      time: "02:24:56",
    },
  ];

  const subjectAnalysisData = [
    {
      subject: "PHYSICS",
      notAttempted: 29,
      correct: 0,
      incorrect: 1,
      scoredMarks: "-1/100",
      percentage: "-1%",
    },
    {
      subject: "CHEMISTRY",
      notAttempted: 9,
      correct: 13,
      incorrect: 8,
      scoredMarks: "44/100",
      percentage: "44%",
    },
    {
      subject: "MATHS",
      notAttempted: 29,
      correct: 1,
      incorrect: 0,
      scoredMarks: "4/100",
      percentage: "4%",
    },
  ];

  return (
    <div className="reports-student-dashboard-srs-container">
      <PageHeader />
      <MainTabs activeTab={activeTab} onTabChange={onTabChange} />

      <div className="reports-student-dashboard-srs-content">
        <TestInfoCard testData={testData} />

        {/* Time Management Section */}
        <div className="reports-student-dashboard-srs-subject-section">
          <h3 className="reports-student-dashboard-srs-section-heading">
            Time Management
          </h3>
          <TimeManagementTable data={timeManagementData} />
        </div>

        {/* Subject Analysis Section */}
        <div className="reports-student-dashboard-srs-subject-section">
          <h3 className="reports-student-dashboard-srs-section-heading">
            Subject Analysis
          </h3>
          <SubjectAnalysisCharts data={subjectAnalysisData} />
        </div>
      </div>
    </div>
  );
};

export default SubjectReport;
