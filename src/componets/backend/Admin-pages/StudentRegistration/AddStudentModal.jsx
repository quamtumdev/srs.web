/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import styles from "../GuideLineUI/guideline.module.css";
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import axios from "axios";
import {
  validateStudentData,
  // eslint-disable-next-line no-unused-vars
  formatPhoneNumber,
  cleanPhoneNumber,
} from "../../../../utils/validateStudentData.jsx";

const AddStudentModal = ({ onClose, onSuccess }) => {
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
    password: "", // ✅ Add password field
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

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

    // Special handling for phone number
    if (name === "studentPhone") {
      // Only allow digits and format automatically
      const digits = value.replace(/\D/g, "");
      if (digits.length <= 10) {
        processedValue = digits;
      } else {
        return; // Don't update if more than 10 digits
      }
    }

    // Special handling for pincode
    if (name === "pincode") {
      // Only allow digits up to 6
      const digits = value.replace(/\D/g, "");
      if (digits.length <= 6) {
        processedValue = digits;
      } else {
        return;
      }
    }

    // ✅ Special handling for password
    if (name === "password") {
      if (value.length > 128) {
        return; // Don't update if more than 128 characters
      }
    }

    // Limit text fields
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
    // Validate form
    const validationErrors = validateStudentData(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setError("Please fix the errors below and try again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Prepare data with cleaned phone number
      const studentData = {
        ...formData,
        studentPhone: cleanPhoneNumber(formData.studentPhone),
        registrationDate: formatDate(),
        status: "active",
        createdBy: "admin",
        createdOn: formatDate(),
      };

      const response = await axios.post(
        "http://localhost:5000/api/auth/studentRegistration/register",
        studentData
      );

      if (response.data.success) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating student:", error);

      if (error.response?.data?.message?.includes("phone")) {
        setErrors({ studentPhone: "Phone number already exists" });
      } else if (error.response?.data?.message?.includes("email")) {
        setErrors({ studentEmail: "Email already exists" });
      } else {
        setError(error.response?.data?.message || "Error creating student");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Student</Modal.Title>
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
            </Form.Group>
          </div>
          <div className="col-md-4">
            <Form.Group className={`mb-3 ${styles.formControl}`}>
              <Form.Label>Password * </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password (minimum 6 characters)"
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
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
            <Form.Group className={`mb-3 ${styles.formControl}`}>
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
        <Button
          variant="primary"
          className={`btn-cancle-back ${styles.btnCancelBack}`}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Student"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStudentModal;
