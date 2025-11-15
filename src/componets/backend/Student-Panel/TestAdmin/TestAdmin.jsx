import { useState } from "react";
import TestHeader from "./Components/TestHeader";
import TestTabs from "./Components/TestTabs";
import TestTable from "./Components/TestTable";

const TestAdmin = () => {
  const [activeTab, setActiveTab] = useState("myTest");

  const testData = [
    {
      sNo: 1,
      testName: "SCORE FULL TEST",
      testCode: "(ST80017)",
      startDate: "03 Apr-23",
      testWindow: "03 Apr-23 09:00 AM to 03 Apr-23 10:00 AM",
      duration: "180 min",
      status: "Missed",
    },
    {
      sNo: 2,
      testName: "SCORE FULL TEST",
      testCode: "(ST80003)",
      startDate: "31 Mar-23",
      testWindow: "31 Mar-23 09:00 AM to 31 Mar-23 10:00 AM",
      duration: "180 min",
      status: "Missed",
    },
    {
      sNo: 3,
      testName: "MCT",
      testCode: "(TNP090)",
      startDate: "26 Mar-23",
      testWindow: "26 Mar-23 09:00 AM to 30 Mar-23 10:00 AM",
      duration: "190 min",
      status: "Missed",
    },
    {
      sNo: 4,
      testName: "SCORE FULL TEST",
      testCode: "(GS88800)",
      startDate: "23 Mar-23",
      testWindow: "23 Mar-23 09:00 AM to 31 Mar-23 10:00 AM",
      duration: "180 min",
      status: "Missed",
    },
    {
      sNo: 5,
      testName: "SEMI MAJOR TEST - 02",
      testCode: "(AB61668)",
      startDate: "15 Mar-23",
      testWindow: "12 Mar-23 09:00 AM to 18 Mar-23 09:01 AM",
      duration: "180 min",
      status: "Missed",
    },
    {
      sNo: 6,
      testName: "SEMI MAJOR TEST - 01",
      testCode: "(SR13992)",
      startDate: "21 Jan-23",
      testWindow: "21 Jan-23 02:00 PM to 21 Jan-23 02:01 PM",
      duration: "180 min",
      status: "Missed",
    },
    {
      sNo: 7,
      testName: "PYP-JM 21/2/23 MCR",
      testCode: "(BK6834)",
      startDate: "13 Mar-23",
      testWindow: "13 Mar-23 09:00 AM to 14 Apr-23 08:00 PM",
      duration: "180 min",
      status: "Missed",
    },
    {
      sNo: 8,
      testName: "PYP-JM 01/2/23 EVE",
      testCode: "(BK6633)",
      startDate: "13 Mar-23",
      testWindow: "13 Mar-23 09:00 AM to 15 Apr-23 08:00 PM",
      duration: "180 min",
      status: "Start Test",
    },
    {
      sNo: 9,
      testName: "PYP-JM 01/2/23 MCR",
      testCode: "(BK6836)",
      startDate: "13 Mar-23",
      testWindow: "13 Mar-23 09:00 AM to 15 Apr-23 08:00 PM",
      duration: "180 min",
      status: "Start Test",
    },
    {
      sNo: 10,
      testName: "PYP-JM 24/1/23 MCR",
      testCode: "(BK6810)",
      startDate: "13 Mar-23",
      testWindow: "13 Mar-23 09:00 AM to 15 Apr-23 08:00 PM",
      duration: "180 min",
      status: "Resumed",
    },
    {
      sNo: 11,
      testName: "PYP-JM 24/1/23 EVE",
      testCode: "(BK6820)",
      startDate: "13 Mar-23",
      testWindow: "13 Mar-23 09:00 AM to 15 Apr-23 08:00 PM",
      duration: "180 min",
      status: "Start Test",
    },
  ];

  return (
    <div className="test-admin-srs-1-container">
      <TestHeader />
      <TestTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="test-admin-srs-1-content">
        <TestTable tests={testData} />
      </div>
    </div>
  );
};

export default TestAdmin;
