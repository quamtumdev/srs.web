import { useState } from "react";
import ScoreCard from "./ScoreCard";
import SolutionReport from "./SolutionReport";
import TopicReport from "./TopicReport";
import QuestionReport from "./QuestionReport";
import SubjectReport from "./SubjectReport";

const ReportsDashboard = () => {
  const [activeTab, setActiveTab] = useState("scoreCard");

  const handleTabChange = tabId => {
    setActiveTab(tabId);
  };

  return (
    <>
      {activeTab === "scoreCard" && (
        <ScoreCard activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      {activeTab === "compareYourself" && (
        <SolutionReport activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      {activeTab === "topicReport" && (
        <TopicReport activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      {activeTab === "questionReport" && (
        <QuestionReport activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      {activeTab === "subjectReport" && (
        <SubjectReport activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </>
  );
};

export default ReportsDashboard;
