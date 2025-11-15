/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import styles from "../GuideLineUI/guideline.module.css";
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import axios from "axios";
import {
  validateStudentData,
  cleanPhoneNumber,
} from "../../../../utils/validateStudentData.jsx";

const EditStudentModal = ({ student, onClose, onSuccess, setStudentsData }) => {
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

  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false); // New state for showing input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  // Pre-populate form with student data
  useEffect(() => {
    if (student) {
      setFormData({
        studentName: student.studentName || "",
        studentEmail: student.studentEmail || "",
        studentPhone: cleanPhoneNumber(student.studentPhone) || "",
        course: student.course || "",
        qualification: student.qualification || "",
        fatherName: student.fatherName || "",
        motherName: student.motherName || "",
        state: student.state || "",
        city: student.city || "",
        pincode: student.pincode || "",
        address: student.address || "",
        password: "",
      });

      setIsPasswordChanged(false);
      setShowPasswordInput(false); // Reset to show dots initially
    }
  }, [student]);

  // Format the current date
  const formatDate = () => {
    const date = new Date();
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    let processedValue = value;

    // Special handling for phone number (only 10 digits)
    if (name === "studentPhone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length <= 10) {
        processedValue = digits;
      } else {
        return;
      }
    }

    // Special handling for pincode (only 6 digits)
    if (name === "pincode") {
      const digits = value.replace(/\D/g, "");
      if (digits.length <= 6) {
        processedValue = digits;
      } else {
        return;
      }
    }

    // Special handling for password
    if (name === "password") {
      if (value.length > 128) {
        return;
      }
      setIsPasswordChanged(value.length > 0);
    }

    // Text length limits
    const textLimits = {
      studentName: 50,
      fatherName: 50,
      motherName: 50,
      state: 50,
      city: 50,
      course: 100,
      qualification: 100,
      address: 500,
    };

    if (textLimits[name] && value.length > textLimits[name]) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
    setError(null);
  };

  const handleSave = async () => {
    let dataToValidate = { ...formData };

    if (!isPasswordChanged) {
      delete dataToValidate.password;
    }

    const validationErrors = validateStudentData(
      dataToValidate,
      !isPasswordChanged
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setError("Please fix the errors below and try again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedStudent = {
        ...student,
        ...formData,
        studentPhone: cleanPhoneNumber(formData.studentPhone),
        updatedBy: "admin",
        updatedOn: formatDate(),
      };

      if (!isPasswordChanged) {
        delete updatedStudent.password;
      }

      const response = await axios.put(
        `http://localhost:5000/api/auth/studentRegistration/profile/${student._id}`,
        updatedStudent
      );

      if (response.data.success) {
        setStudentsData(prevData =>
          prevData.map(s => (s._id === student._id ? response.data.student : s))
        );
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating student:", error);

      if (error.response?.data?.message?.includes("phone")) {
        setErrors({ studentPhone: "Phone number already exists" });
      } else if (error.response?.data?.message?.includes("email")) {
        setErrors({ studentEmail: "Email already exists" });
      } else {
        setError(error.response?.data?.message || "Error updating student");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${student.studentName}? This action cannot be undone.`
    );

    if (confirmDelete) {
      try {
        setLoading(true);
        const response = await axios.delete(
          `http://localhost:5000/api/auth/studentRegistration/profile/${student._id}`
        );

        if (response.data.success) {
          setStudentsData(prevData =>
            prevData.filter(s => s._id !== student._id)
          );
          onClose();
        }
      } catch (error) {
        setError(
          "Error deleting student: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        setLoading(false);
      }
    }
  };

  // Generate dots based on password length
  const getPasswordDots = () => {
    if (student?.password) {
      return "•".repeat(student.password.length);
    }
    return "••••••••"; // Default 8 dots
  };

  // Handle password field click
  const handlePasswordClick = () => {
    setShowPasswordInput(true);
    // Small delay to ensure DOM updates before focusing
    setTimeout(() => {
      const passwordInput = document.querySelector('input[name="password"]');
      if (passwordInput) {
        passwordInput.focus();
      }
    }, 50);
  };

  // Handle cancel password edit
  const handleCancelPasswordEdit = () => {
    setShowPasswordInput(false);
    setIsPasswordChanged(false);
    setFormData(prev => ({
      ...prev,
      password: "",
    }));
  };

  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Student: {student?.studentName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          {/* Student Name */}
          <div className="col-md-4">
            <Form.Group className={`mb-3 ${styles.formControl}`}>
              <Form.Label>Student Name * </Form.Label>
              <Form.Control
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="Enter student name"
                isInvalid={!!errors.studentName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.studentName}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          {/* Student Email */}
          <div className="col-md-4">
            <Form.Group className={`mb-3 ${styles.formControl}`}>
              <Form.Label>Student Email *</Form.Label>
              <Form.Control
                type="email"
                name="studentEmail"
                value={formData.studentEmail}
                onChange={handleInputChange}
                placeholder="Enter email address"
                isInvalid={!!errors.studentEmail}
              />
              <Form.Control.Feedback type="invalid">
                {errors.studentEmail}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          {/* Password Field with Better UX */}
          <div className="col-md-4">
            <Form.Group className={`mb-3 ${styles.formControl}`}>
              <Form.Label>
                {showPasswordInput ? "New Password *" : "Password (Current)"}
              </Form.Label>

              {!showPasswordInput ? (
                // Show dots display with edit option
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "0.375rem",
                      padding: "0.375rem 0.75rem",
                      backgroundColor: "#f8f9fa",
                      minHeight: "38px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      fontFamily: "Verdana, sans-serif",
                      letterSpacing: "0.2em",
                      fontSize: "16px",
                      color: "#495057",
                    }}
                    onClick={handlePasswordClick}
                  >
                    <span>{getPasswordDots()}</span>
                    <small
                      style={{
                        fontSize: "12px",
                        color: "#6c757d",
                        letterSpacing: "normal",
                        fontFamily: "inherit",
                      }}
                    >
                      Click to edit
                    </small>
                  </div>
                </div>
              ) : (
                // Show password input with cancel option
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter new password (minimum 6 characters)"
                    isInvalid={!!errors.password}
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#6c757d",
                      fontSize: "12px",
                      cursor: "pointer",
                      padding: "2px 4px",
                    }}
                    onClick={handleCancelPasswordEdit}
                  >
                    Cancel
                  </button>
                </div>
              )}

              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>

              {!showPasswordInput && (
                <Form.Text className="text-muted">
                  Current password is set ({student?.password?.length || 0}{" "}
                  characters)
                </Form.Text>
              )}

              {showPasswordInput && (
                <Form.Text className="text-muted">
                  Leave blank to keep current password. Click Cancel to go back.
                </Form.Text>
              )}
            </Form.Group>
          </div>

          {/* Rest of the form fields remain the same... */}
          {/* Student Phone */}
          <div className="col-md-6">
            <Form.Group className={`mb-3 ${styles.formControl}`}>
              <Form.Label>Student Phone * </Form.Label>
              <Form.Control
                type="tel"
                name="studentPhone"
                value={formData.studentPhone}
                onChange={handleInputChange}
                placeholder="Enter 10 digit mobile number"
                isInvalid={!!errors.studentPhone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.studentPhone}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          {/* Course */}
          <div className="col-md-6">
            <Form.Group className={`mb-3 ${styles.formControl}`}>
              <Form.Label>Course/Stream * </Form.Label>
              <Form.Control
                type="text"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                placeholder="Enter course or stream"
                isInvalid={!!errors.course}
              />
              <Form.Control.Feedback type="invalid">
                {errors.course}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          {/* Qualification */}
          <div className="col-md-4">
            <Form.Group className={`mb-3 ${styles.formControl}`}>
              <Form.Label>Qualification * </Form.Label>
              <Form.Control
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                placeholder="Enter qualification"
                isInvalid={!!errors.qualification}
              />
              <Form.Control.Feedback type="invalid">
                {errors.qualification}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          {/* Father Name */}
          <div className="col-md-4">
            <Form.Group className={`mb-3 ${styles.formControl}`}>
              <Form.Label>Father Name * </Form.Label>
              <Form.Control
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                placeholder="Enter father's name"
                isInvalid={!!errors.fatherName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fatherName}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          {/* Mother Name */}
          <div className="col-md-4">
            <Form.Group className={`mb-3 ${styles.formControl}`}>
              <Form.Label>Mother Name * </Form.Label>
              <Form.Control
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
                placeholder="Enter mother's name"
                isInvalid={!!errors.motherName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.motherName}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          {/* State */}
          <div className="col-md-4">
            <Form.Group className={`mb-3 ${styles.formControl}`}>
              <Form.Label>State * </Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter state"
                isInvalid={!!errors.state}
              />
              <Form.Control.Feedback type="invalid">
                {errors.state}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          {/* City */}
          <div className="col-md-4">
            <Form.Group className={`mb-3 ${styles.formControl}`}>
              <Form.Label>City * </Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          {/* Pincode */}
          <div className="col-md-4">
            <Form.Group className={`mb-3 ${styles.formControl}`}>
              <Form.Label>Pincode * </Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Enter 6 digit pincode"
                isInvalid={!!errors.pincode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.pincode}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          {/* Address */}
          <div className="col-12">
            <Form.Group className={`mb-2 ${styles.formControl}`}>
              <Form.Label>Address * </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter complete address"
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>

        {/* Error message */}
        {error && <div className="alert alert-danger">{error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className={`btn-cancle-back ${styles.btnCancelBack}`}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          Delete
        </Button>
        <Button
          variant="primary"
          className={`btn-cancle-back ${styles.btnCancelBack}`}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditStudentModal;
