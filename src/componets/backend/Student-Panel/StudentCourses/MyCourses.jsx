import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../../assets/backend/dist/css/studentadmin.css";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      // Get student ID from localStorage
      const storedStudentData = localStorage.getItem("studentData");
      if (!storedStudentData) return;

      const studentData = JSON.parse(storedStudentData);

      // Fetch courses from backend
      const response = await axios.get(
        `http://localhost:5000/api/course/student/${studentData.id}/courses`
      );

      if (response.data.success) {
        setCourses(response.data.courses || []);
      }
    } catch (error) {
      console.error("Error loading courses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="content">
        <div className="container-fluid">
          <h5 className="mb-3 pt-3">My Courses</h5>
          <div className="text-center">
            <div className="spinner-border" role="status"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <h5 className="mb-3 pt-3">My Courses</h5>
          <div className="row">
            {courses.map(course => (
              <div className="col-lg-3 col-6" key={course.courseId}>
                <div className="courseBoxWrapper">
                  <Link to="/student/mySubjects">
                    <div className="small-box text-white myCourses-box">
                      <div className="inner myCourseInner">
                        {/* Course Image */}
                        {course.courseImage && (
                          <img
                            src={course.courseImage}
                            alt={course.courseName}
                          />
                        )}
                      </div>
                    </div>
                    <h6 className="myCoursesText">{course.courseName}</h6>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyCourses;
