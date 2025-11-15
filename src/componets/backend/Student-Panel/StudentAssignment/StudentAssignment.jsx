/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import "../../../../assets/backend/dist/css/studentadmin.css";
import SubjectGrid from "./components/SubjectGrid";
import LoadingSpinner from "./components/LoadingSpinner";

const StudentAssignment = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      const storedStudentData = localStorage.getItem("studentData");
      if (!storedStudentData) {
        setSubjects(getDefaultSubjects());
        setLoading(false);
        return;
      }

      const studentData = JSON.parse(storedStudentData);
      const response = await axios.get(
        `http://localhost:5000/api/assignments/student/${studentData.id}/assignments`
      );

      if (response.data.success) {
        const subjectsWithData = processAssignmentsToSubjects(
          response.data.assignments
        );
        setSubjects(subjectsWithData);
      } else {
        setSubjects(getDefaultSubjects());
      }
    } catch (error) {
      console.error("Error loading assignments:", error);
      setSubjects(getDefaultSubjects());
    } finally {
      setLoading(false);
    }
  };

  const processAssignmentsToSubjects = assignments => {
    const subjectMap = {
      1: {
        id: 1,
        name: "Physics",
        image: "/assets/backend-img/physics.png",
        alt: "Physics",
        assignments: [],
        totalCount: 0,
        pendingCount: 0,
        submittedCount: 0,
      },
      2: {
        id: 2,
        name: "Chemistry",
        image: "/assets/backend-img/chemistry.png",
        alt: "Chemistry",
        assignments: [],
        totalCount: 0,
        pendingCount: 0,
        submittedCount: 0,
      },
      3: {
        id: 3,
        name: "Maths",
        image: "/assets/backend-img/maths.png",
        alt: "Maths",
        assignments: [],
        totalCount: 0,
        pendingCount: 0,
        submittedCount: 0,
      },
    };

    assignments.forEach(assignment => {
      const subjectId = assignment.subjectId;
      if (subjectMap[subjectId]) {
        subjectMap[subjectId].assignments.push(assignment);
        subjectMap[subjectId].totalCount++;

        const status = assignment.status;
        if (status === "pending" || status === "not-started") {
          subjectMap[subjectId].pendingCount++;
        } else if (status === "submitted") {
          subjectMap[subjectId].submittedCount++;
        }
      }
    });

    return Object.values(subjectMap);
  };

  const getDefaultSubjects = () => [
    {
      id: 1,
      name: "Physics",
      image: "/assets/backend-img/physics.png",
      alt: "Physics",
      totalCount: 0,
      pendingCount: 0,
      submittedCount: 0,
    },
    {
      id: 2,
      name: "Chemistry",
      image: "/assets/backend-img/chemistry.png",
      alt: "Chemistry",
      totalCount: 0,
      pendingCount: 0,
      submittedCount: 0,
    },
    {
      id: 3,
      name: "Maths",
      image: "/assets/backend-img/maths.png",
      alt: "Maths",
      totalCount: 0,
      pendingCount: 0,
      submittedCount: 0,
    },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="content">
      <div className="container-fluid">
        <h5 className="pt-4 mb-3">Subjects</h5>
        <SubjectGrid subjects={subjects} />
      </div>
    </section>
  );
};

export default StudentAssignment;
