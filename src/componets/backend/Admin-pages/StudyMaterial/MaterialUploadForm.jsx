/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const MaterialUploadForm = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    materialType: "study-material",
    course: "",
    subject: "",
    topic: "",
    title: "",
    description: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  // Configuration Data
  const materialTypes = [
    { value: "study-material", label: "Study Material" },
    { value: "exercise", label: "Exercise" },
    { value: "race", label: "RACE" },
    { value: "special-booklet", label: "Special Booklet" },
    { value: "class-notes", label: "Class Notes" },
  ];

  const courses = [
    { value: "neet", label: "NEET" },
    { value: "jee", label: "JEE" },
    { value: "foundation", label: "Foundation" },
    { value: "mca", label: "MCA" },
  ];

  const subjectsByCourse = {
    neet: [
      { value: "physics", label: "Physics" },
      { value: "chemistry", label: "Chemistry" },
      { value: "botany", label: "Botany" },
      { value: "zoology", label: "Zoology" },
    ],
    jee: [
      { value: "physics", label: "Physics" },
      { value: "chemistry", label: "Chemistry" },
      { value: "mathematics", label: "Mathematics" },
    ],
    foundation: [
      { value: "science", label: "Science" },
      { value: "mathematics", label: "Mathematics" },
    ],
    mca: [
      { value: "physics", label: "Physics" },
      { value: "mathematics", label: "Mathematics" },
    ],
  };

  const topicsBySubject = {
    physics: [
      "Mechanics",
      "Thermodynamics",
      "Electromagnetism",
      "Optics",
      "Modern Physics",
    ],
    chemistry: [
      "Physical Chemistry",
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Chemical Bonding",
    ],
    botany: ["Plant Physiology", "Plant Anatomy", "Ecology", "Genetics"],
    zoology: [
      "Animal Physiology",
      "Human Anatomy",
      "Reproduction in Organisms",
      "Evolution",
    ],
    mathematics: ["Algebra", "Calculus", "Trigonometry", "Coordinate Geometry"],
    science: ["General Science", "Applied Science"],
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "course" && { subject: "", topic: "" }),
      ...(name === "subject" && { topic: "" }),
    }));
    setError("");
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("File size should not exceed 10MB");
        return;
      }

      setFormData(prev => ({ ...prev, file }));
      setFileName(file.name);
      setError("");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    if (
      !formData.materialType ||
      !formData.course ||
      !formData.subject ||
      !formData.topic ||
      !formData.title ||
      !formData.file
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      // ✅ Get Admin Token from localStorage
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        setError("Admin authentication required. Please login as admin.");
        setLoading(false);
        return;
      }

      const uploadData = new FormData();
      uploadData.append("materialType", formData.materialType);
      uploadData.append("course", formData.course);
      uploadData.append("subject", formData.subject);
      uploadData.append("topic", formData.topic);
      uploadData.append("title", formData.title);
      uploadData.append("description", formData.description);
      uploadData.append("file", formData.file);

      // ✅ API Call with Admin Token
      const response = await axios.post(
        "https://srs-api-six.vercel.app/api/materials/upload",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminToken}`, // ✅ Add Token
          },
        }
      );

      if (response.data.success) {
        alert("Material uploaded successfully!");
        setFormData({
          materialType: "study-material",
          course: "",
          subject: "",
          topic: "",
          title: "",
          description: "",
          file: null,
        });
        setFileName("");
        if (onUploadSuccess) onUploadSuccess();
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.message || "Failed to upload material");
    } finally {
      setLoading(false);
    }
  };

  const availableSubjects = formData.course
    ? subjectsByCourse[formData.course]
    : [];
  const availableTopics = formData.subject
    ? topicsBySubject[formData.subject]
    : [];

  return (
    <div className="srs-admin-upload-form">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="srs-admin-alert srs-admin-alert-error">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <div className="row">
          <div className="col-md-6">
            <div className="srs-admin-form-group">
              <label>
                Material Type <span className="required">*</span>
              </label>
              <select
                name="materialType"
                value={formData.materialType}
                onChange={handleChange}
                className="srs-admin-form-control"
                required
              >
                {materialTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="srs-admin-form-group">
              <label>
                Course <span className="required">*</span>
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="srs-admin-form-control"
                required
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course.value} value={course.value}>
                    {course.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="srs-admin-form-group">
              <label>
                Subject <span className="required">*</span>
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="srs-admin-form-control"
                required
                disabled={!formData.course}
              >
                <option value="">Select Subject</option>
                {availableSubjects.map(subject => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="srs-admin-form-group">
              <label>
                Topic <span className="required">*</span>
              </label>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="srs-admin-form-control"
                required
                disabled={!formData.subject}
              >
                <option value="">Select Topic</option>
                {availableTopics.map(topic => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-12">
            <div className="srs-admin-form-group">
              <label>
                Material Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="srs-admin-form-control"
                placeholder="Enter material title"
                required
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="srs-admin-form-group">
              <label>Description (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="srs-admin-form-control"
                placeholder="Enter material description"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="col-md-12">
            <div className="srs-admin-form-group">
              <label>
                Upload PDF <span className="required">*</span>
              </label>
              <div className="srs-admin-file-upload">
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="srs-admin-file-input"
                  required
                />
                <label htmlFor="file-upload" className="srs-admin-file-label">
                  <i className="fas fa-cloud-upload-alt"></i>
                  {fileName || "Choose PDF file (Max 10MB)"}
                </label>
              </div>
              {fileName && (
                <div className="srs-admin-file-preview">
                  <i className="fas fa-file-pdf"></i>
                  <span>{fileName}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, file: null }));
                      setFileName("");
                    }}
                    className="srs-admin-file-remove"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="srs-admin-form-actions">
          <button
            type="submit"
            className="srs-admin-btn srs-admin-btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Uploading...
              </>
            ) : (
              <>
                <i className="fas fa-upload"></i>
                Upload Material
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MaterialUploadForm;
