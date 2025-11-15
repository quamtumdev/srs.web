import ResultHeader from "./ResultHeader";
import StudentInfoCard from "./StudentInfoCard";
import TestResultTable from "./TestResultTable";

const TestResultReport = () => {
  const studentData = {
    name: "Student Name",
    rollNo: "123456",
    father: "Father's Name",
    mother: "Mother's Name",
    class: "12th",
    targetBatch: "Target Batch: IIT-JEE",
    photo: "https://via.placeholder.com/120",
    programme: "Programme Name: IIT-JEE",
    studentAppeared: "S.A. Student Appeared",
  };

  const mainTestData = {
    tests: [
      {
        testName: "SCUBA PRE. 2022 - 1",
        rank: 288,
        batch: "21th",
        tMark: 210,
        pdf: "ABSENT",
        chemistry: "",
        maths: "",
        ncert: "",
        total: 288,
      },
      {
        testName: "SCUBA RES. 2022 - 1",
        rank: 288,
        batch: "21th",
        tMark: 210,
        pdf: "ABSENT",
        chemistry: "",
        maths: "",
        ncert: "",
        total: 288,
      },
      {
        testName: "SCUBA RES. 2022 - 2",
        rank: 288,
        batch: "21th",
        tMark: 210,
        pdf: "ABSENT",
        chemistry: "",
        maths: "",
        ncert: "",
        total: 288,
      },
      {
        testName: "SCUBA RES. 2022 - 3",
        rank: 288,
        batch: "21th",
        tMark: 210,
        pdf: "ABSENT",
        chemistry: "",
        maths: "",
        ncert: "",
        total: 288,
      },
      {
        testName: "SCUBA RES. 2022 - 4",
        rank: 288,
        batch: "21th",
        tMark: 210,
        pdf: "ABSENT",
        chemistry: "",
        maths: "",
        ncert: "",
        total: 288,
      },
      {
        testName: "FINAL GRAND TEST - 01",
        rank: 288,
        batch: "21th",
        tMark: 180,
        pdf: "ABSENT",
        chemistry: "1C-800", // ⚠️ String me convert kiya
        maths: "1C-800", // ⚠️ String me convert kiya
        ncert: "1C-800", // ⚠️ String me convert kiya
        total: 288,
      },
    ],
  };

  const subjectiveTestData = {
    tests: [
      {
        testName: "SUBJECTIVE TEST - 01",
        batch: "S.A",
        tMark: "ENGLISH",
        physics: "",
        chem: "",
        maths: "",
        ncert: "",
        total: "",
      },
    ],
    noRecordFound: true,
  };

  return (
    <div className="trr-container">
      <ResultHeader />

      <div className="trr-content">
        <div className="row">
          {/* Student Info Card */}
          <div className="col-lg-3 col-md-4">
            <StudentInfoCard student={studentData} />
          </div>

          {/* Test Results */}
          <div className="col-lg-9 col-md-8">
            {/* Main Test Section */}
            <div className="trr-test-section">
              <div className="trr-section-header">
                <h5>MAIN TEST</h5>
              </div>
              <TestResultTable data={mainTestData} type="main" />
            </div>

            {/* Subjective Test Section */}
            <div className="trr-test-section">
              <div className="trr-section-header subjective">
                <h5>SUBJECTIVE TEST</h5>
              </div>
              <TestResultTable data={subjectiveTestData} type="subjective" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResultReport;
