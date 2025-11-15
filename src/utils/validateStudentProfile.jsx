// utils/validateStudentProfile.js

export const validateStudentProfile = formData => {
  const errors = {};

  // Student Name validation
  if (!formData.studentName?.trim()) {
    errors.studentName = "Student name is required";
  } else if (formData.studentName.trim().length < 2) {
    errors.studentName = "Student name must be at least 2 characters";
  }

  // Student Email validation
  if (!formData.studentEmail?.trim()) {
    errors.studentEmail = "Student email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.studentEmail)) {
    errors.studentEmail = "Please enter a valid email address";
  }

  // Student Phone validation
  if (!formData.studentPhone?.trim()) {
    errors.studentPhone = "Phone number is required";
  } else {
    // Remove all non-digit characters
    const phoneDigits = formData.studentPhone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      errors.studentPhone = "Phone number must be exactly 10 digits";
    } else if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      errors.studentPhone = "Please enter a valid Indian mobile number";
    }
  }

  // Course validation
  if (!formData.course?.trim()) {
    errors.course = "Course is required";
  }

  // Qualification validation
  if (!formData.qualification?.trim()) {
    errors.qualification = "Qualification is required";
  }

  // Father Name validation
  if (!formData.fatherName?.trim()) {
    errors.fatherName = "Father name is required";
  }

  // Mother Name validation
  if (!formData.motherName?.trim()) {
    errors.motherName = "Mother name is required";
  }

  // State validation
  if (!formData.state?.trim()) {
    errors.state = "State is required";
  }

  // City validation
  if (!formData.city?.trim()) {
    errors.city = "City is required";
  }

  // Pincode validation
  if (!formData.pincode?.trim()) {
    errors.pincode = "Pincode is required";
  } else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) {
    errors.pincode = "Please enter a valid 6-digit pincode";
  }

  // Address validation
  if (!formData.address?.trim()) {
    errors.address = "Address is required";
  } else if (formData.address.trim().length < 10) {
    errors.address = "Address must be at least 10 characters";
  }

  return errors;
};

// API Error Messages
export const getApiErrorMessage = error => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return "Invalid data provided. Please check your information.";
      case 409:
        return "Email already exists. Please use a different email.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return (
          error.response.data?.message ||
          "Error saving profile. Please try again."
        );
    }
  } else if (error.request) {
    return "Network error. Please check your internet connection.";
  } else {
    return "Something went wrong. Please try again.";
  }
};
