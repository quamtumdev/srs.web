import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useStudentProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentPhone: "",
    course: "",
    qualification: "",
    fatherName: "",
    motherName: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [profileId, setProfileId] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [errors, setErrors] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [studentInfo, setStudentInfo] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  // Load student data
  const loadStudentData = async () => {
    try {
      setDataLoading(true);

      const token = localStorage.getItem("studentToken");
      const storedStudentData = localStorage.getItem("studentData");

      if (!token) {
        navigate("/student-login");
        return;
      }

      if (!storedStudentData) {
        setMessage("No student data found. Please login again.");
        setMessageType("error");
        setTimeout(() => navigate("/student-login"), 2000);
        return;
      }

      const studentData = JSON.parse(storedStudentData);
      setStudentInfo(studentData);
      setProfileId(studentData.id);

      const response = await axios.get(
        `http://localhost:5000/api/auth/studentRegistration/profile/${studentData.id}`
      );

      if (response.data.success && response.data.student) {
        const completeStudentData = response.data.student;

        const studentFormData = {
          studentName: completeStudentData.studentName || "",
          studentEmail: completeStudentData.studentEmail || "",
          studentPhone: completeStudentData.studentPhone || "",
          course: completeStudentData.course || "",
          qualification: completeStudentData.qualification || "",
          fatherName: completeStudentData.fatherName || "",
          motherName: completeStudentData.motherName || "",
          state: completeStudentData.state || "",
          city: completeStudentData.city || "",
          pincode: completeStudentData.pincode || "",
          address: completeStudentData.address || "",
          password: "",
        };

        setFormData(studentFormData);
        setOriginalData(JSON.parse(JSON.stringify(studentFormData)));

        setMessage("Profile data loaded successfully!");
        setMessageType("success");

        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error loading student data:", error);
      setMessage("Error loading profile data. Please try again.");
      setMessageType("error");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    loadStudentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return {
    formData,
    setFormData,
    loading,
    setLoading,
    message,
    setMessage,
    messageType,
    setMessageType,
    errors,
    setErrors,
    originalData,
    setOriginalData,
    profileId,
    studentInfo,
    dataLoading,
  };
};
