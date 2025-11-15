import { useState } from "react";
import "../../custom.css";
export default function NoticeBoard() {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("Results");

  // Data for each tab (updated structure with title and description)
  const tabContent = {
    Results: [
      { title: "Result 1", description: "John scored 90% in Math." },
      {
        title: "Result 2",
        description: "Sarah achieved first place in Science.",
      },
      {
        title: "Result 3",
        description: "Annual results will be released on Dec 15.",
      },
      { title: "Result 4", description: "John scored 90% in Math." },
      {
        title: "Result 5",
        description: "Sarah achieved first place in Science.",
      },
      {
        title: "Result 6",
        description: "Annual results will be released on Dec 15.",
      },
      { title: "Result 7", description: "John scored 90% in Math." },
      {
        title: "Result 8",
        description: "Sarah achieved first place in Science.",
      },
      {
        title: "Result 9",
        description: "Annual results will be released on Dec 15.",
      },
    ],
    NewCourses: [
      { title: "Course 1", description: "Advanced Math starts next month." },
      { title: "Course 2", description: "New Robotics course available now." },
      { title: "Course 3", description: "Registration open for AI Basics." },
    ],
    Notifications: [
      {
        title: "Notice 1",
        description: "School will remain closed on Friday.",
      },
      { title: "Notice 2", description: "New library books are available." },
      { title: "Notice 3", description: "Exam schedule has been updated." },
    ],
  };

  return (
    <div className="container  notice-board-custom-margin">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="card notice-border-radius">
            <div className="card-body">
              {/* Tabs */}
              <ul className="nav nav-tabs d-flex w-100">
                <li className="nav-item flex-fill">
                  <button
                    className={`nav-link ${
                      activeTab === "Results"
                        ? "notice-board-result-btn active"
                        : ""
                    } w-100 border-notice-btn`}
                    onClick={() => setActiveTab("Results")}
                  >
                    <strong>Results</strong> {/* Bold Tab Label */}
                  </button>
                </li>
                <li className="nav-item flex-fill">
                  <button
                    className={`nav-link ${
                      activeTab === "NewCourses"
                        ? "notice-board-result-btn active"
                        : ""
                    } w-100 border-notice-btn`}
                    onClick={() => setActiveTab("NewCourses")}
                  >
                    <strong>New Courses</strong> {/* Bold Tab Label */}
                  </button>
                </li>
                <li className="nav-item flex-fill">
                  <button
                    className={`nav-link ${
                      activeTab === "Notifications"
                        ? "notice-board-result-btn active"
                        : ""
                    } w-100 border-notice-btn`}
                    onClick={() => setActiveTab("Notifications")}
                  >
                    <strong>Notifications</strong> {/* Bold Tab Label */}
                  </button>
                </li>
              </ul>

              {/* Tab Content */}
              <div
                className="mt-3"
                style={{ height: "200px", overflowY: "auto" }}
              >
                <ul className="list-unstyled mb-0">
                  {tabContent[activeTab].map((item, index) => (
                    <li key={index} className="mb-2">
                      <strong>{item.title}</strong>: {item.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  );
}
