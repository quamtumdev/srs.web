/* eslint-disable react/prop-types */
import { useEffect } from "react";
import TestResultReport from "../StudentTestResult/TestResultReport";

const TestResultModal = ({ onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="trm-overlay" onClick={onClose}>
      <div className="trm-modal" onClick={e => e.stopPropagation()}>
        <button className="trm-close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="trm-content">
          <TestResultReport />
        </div>
      </div>
    </div>
  );
};

export default TestResultModal;
