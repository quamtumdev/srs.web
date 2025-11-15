/* eslint-disable react/prop-types */

import PageHeader from "./Common/PageHeader";
import MainTabs from "./Common/MainTabs";
import TestInfoCard from "./Common/TestInfoCard";
import CandidateStatistics from "./ScoreCard/CandidateStatistics";
import RankOverview from "./ScoreCard/RankOverview";
import QuestionStatistics from "./ScoreCard/QuestionStatistics";
import OverviewTable from "./ScoreCard/OverviewTable";

const ScoreCard = ({ activeTab = "scoreCard", onTabChange }) => {
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

  const candidateStats = {
    myMarks: 47,
    myPercentage: "15.67%",
    myPercentile: "20.06",
    rightQuestionMarks: "56/300",
    negativeQuestionMarks: "9/300",
    leftQuestionMarks: "268/300",
    attemptedQuestions: 23,
    timeOnQuestion: "02:24:56",
    avgSpeedSecQues: "378.08",
  };

  const rankData = {
    batchRank: 82,
    testRank: "263/329",
    campusRank: "N/A",
  };

  const questionStats = {
    accuracy: "68.87%",
    correctQuestions: 14,
    leftQuestions: 67,
    incorrectQuestions: 9,
  };

  const subjectOverview = [
    { subject: "PHYSICS", maximumMarks: 100, markScored: -1, percentage: "-1" },
    {
      subject: "CHEMISTRY",
      maximumMarks: 100,
      markScored: 44,
      percentage: "44",
    },
    { subject: "MATHS", maximumMarks: 100, markScored: 4, percentage: "4" },
  ];

  return (
    <div className="reports-student-dashboard-srs-container">
      <PageHeader />
      <MainTabs activeTab={activeTab} onTabChange={onTabChange} />

      <div className="reports-student-dashboard-srs-content">
        <TestInfoCard testData={testData} />

        <div className="reports-student-dashboard-srs-stats-grid">
          <CandidateStatistics data={candidateStats} />
          <RankOverview data={rankData} />
          <QuestionStatistics data={questionStats} />
        </div>

        <OverviewTable data={subjectOverview} />
      </div>
    </div>
  );
};

export default ScoreCard;
