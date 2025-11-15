import { useState } from "react";
import ReportsHeader from "./Components/ReportsHeader";
import ReportsTabs from "./Components/ReportsTabs";
import ReportsTable from "./Components/ReportsTable";
import TopicAnalysisView from "./Components/TopicAnalysisView";
import ReportCardView from "./Components/ReportCardView";

const TestReports = () => {
  const [activeTab, setActiveTab] = useState("testReports");

  const renderContent = () => {
    switch (activeTab) {
      case "testReports":
        return <ReportsTable />;
      case "topicAnalysis":
        return <TopicAnalysisView />;
      case "reportCard":
        return <ReportCardView />;
      default:
        return <ReportsTable />;
    }
  };

  return (
    <div className="admin-test-reports-srs-container">
      <ReportsHeader />
      <ReportsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="admin-test-reports-srs-content">{renderContent()}</div>
    </div>
  );
};

export default TestReports;
