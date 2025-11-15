/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const MaterialEditForm = ({ material, onUpdateSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    materialType: "study-material",
    course: "",
    subject: "",
    topic: "",
    title: "",
    description: "",
    file: null,
  });

  const [updating, setUpdating] = useState(false);
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

  // ✅ Material load होने पर पुरानी file को field में load करो
  useEffect(() => {
    if (material) {
      console.log("📋 Material loaded:", material);

      setFormData({
        materialType: material.materialType || "study-material",
        course: material.course || "",
        subject: material.subject || "",
        topic: material.topic || "",
        title: material.title || "",
        description: material.description || "",
        file: null,
      });

      // ✅ पुरानी file का name show करो
      setFileName(`${material.fileName} (current)`);

      console.log("✅ Form loaded with current file");
    }
  }, [material]);

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

  // ✅ File Change Handler
  const handleFileChange = e => {
    const file = e.target.files[0];
    console.log("📁 New file selected:", file);

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
      setFileName(file.name); // ✅ नई file name दिखाओ
      setError("");
      console.log("✅ New file ready to upload:", file.name);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleUseCurrentFile = () => {
    console.log("🔄 Using current file");
    setFormData(prev => ({ ...prev, file: null }));
    setFileName(`${material.fileName} (current)`);
    setError("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    if (
      !formData.materialType ||
      !formData.course ||
      !formData.subject ||
      !formData.topic ||
      !formData.title
    ) {
      setError("All fields are required");
      return;
    }

    setUpdating(true);

    try {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        setError("Admin authentication required. Please login as admin.");
        setUpdating(false);
        return;
      }

      console.log("📤 Updating material:", material._id);
      console.log("📋 Form data:", formData);

      const uploadData = new FormData();
      uploadData.append("materialType", formData.materialType);
      uploadData.append("course", formData.course);
      uploadData.append("subject", formData.subject);
      uploadData.append("topic", formData.topic);
      uploadData.append("title", formData.title);
      uploadData.append("description", formData.description);

      // ✅ Only append file if new file selected
      if (formData.file) {
        console.log("📁 New file appended:", formData.file.name);
        uploadData.append("file", formData.file);
      } else {
        console.log("📁 No new file - keeping current file");
      }

      // ✅ Debug FormData
      console.log("📊 FormData contents:");
      for (let [key, value] of uploadData.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: File(${value.name})`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      }

      // ✅ API call
      console.log("🌐 Sending request to backend...");
      const response = await axios.put(
        `http://localhost:5000/api/materials/${material._id}`,
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      console.log("📥 Response received:", response.data);

      // ✅ Check response
      if (response.data && response.data.success) {
        console.log("✅ Material updated successfully");
        alert("Material updated successfully!");

        // ✅ Call callback
        if (onUpdateSuccess) {
          console.log("🔄 Calling onUpdateSuccess callback");
          onUpdateSuccess();
        }
      } else {
        console.error("❌ Response not successful:", response.data);
        setError(response.data?.message || "Update failed");
      }
    } catch (err) {
      console.error("❌ Update error:", err);
      console.error("Error response:", err.response?.data);

      if (err.response?.status === 404) {
        setError("Material not found");
      } else if (err.response?.status === 400) {
        setError(err.response.data?.message || "Invalid data");
      } else {
        setError(err.response?.data?.message || "Failed to update material");
      }
    } finally {
      setUpdating(false);
    }
  };

  if (!material) {
    return (
      <div className="srs-admin-upload-form">
        <div className="srs-admin-alert srs-admin-alert-error">
          <i className="fas fa-exclamation-circle"></i>
          No material selected for editing
        </div>
      </div>
    );
  }

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
          {/* Material Type */}
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

          {/* Course */}
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

          {/* Subject */}
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

          {/* Topic */}
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

          {/* Title */}
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

          {/* Description */}
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

          {/* ✅ Upload PDF */}
          <div className="col-md-12">
            <div className="srs-admin-form-group">
              <label>
                Upload PDF <span className="required">*</span>
              </label>
              <div className="srs-admin-file-upload">
                <input
                  type="file"
                  id="file-upload-edit"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="srs-admin-file-input"
                />
                <label
                  htmlFor="file-upload-edit"
                  className="srs-admin-file-label"
                >
                  <i className="fas fa-cloud-upload-alt"></i>
                  {fileName || "Choose PDF file (Max 10MB)"}
                </label>
              </div>

              {/* ✅ File Status - दिखाओ कि कौनसी file selected है */}
              <div style={{ marginTop: "15px" }}>
                {formData.file ? (
                  // ✅ नई file selected है
                  <div className="srs-admin-file-preview">
                    <i className="fas fa-file-pdf"></i>
                    <span>
                      <strong>New:</strong> {fileName}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, file: null }));
                        setFileName(`${material.fileName} (current)`);
                      }}
                      className="srs-admin-file-remove"
                    >
                      <i className="fas fa-times"></i> Use Current File
                    </button>
                  </div>
                ) : (
                  // ✅ पुरानी file selected है (current)
                  <div
                    style={{
                      backgroundColor: "#e7f3ff",
                      padding: "12px 15px",
                      borderRadius: "6px",
                      borderLeft: "4px solid #2196F3",
                    }}
                  >
                    <small>
                      <i className="fas fa-file-pdf"></i>{" "}
                      <strong>Current file:</strong> {material.fileName}{" "}
                      <span style={{ color: "#999" }}>
                        ({(material.fileSize / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="srs-admin-form-actions">
          <button
            type="button"
            className="srs-admin-btn srs-admin-btn-secondary"
            onClick={onCancel}
          >
            <i className="fas fa-times"></i>
            Cancel
          </button>
          <button
            type="submit"
            className="srs-admin-btn srs-admin-btn-primary"
            disabled={updating}
          >
            {updating ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Updating...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                Update Material
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MaterialEditForm;
