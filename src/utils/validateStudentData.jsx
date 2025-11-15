// utils/studentValidation.js
export const validateStudentData = formData => {
  const errors = {};

  // Student Name validation
  if (!formData.studentName?.trim()) {
    errors.studentName = "Student name is required";
  } else if (formData.studentName.trim().length < 2) {
    errors.studentName = "Student name must be at least 2 characters";
  } else if (formData.studentName.trim().length > 50) {
    errors.studentName = "Student name cannot exceed 50 characters";
  }

  // Email validation
  if (!formData.studentEmail?.trim()) {
    errors.studentEmail = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.studentEmail)) {
      errors.studentEmail = "Please enter a valid email address";
    }
  }

  // Phone validation (exactly 10 digits)
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
    errors.course = "Course/Stream is required";
  } else if (formData.course.trim().length > 100) {
    errors.course = "Course name cannot exceed 100 characters";
  }

  // Qualification validation
  if (!formData.qualification?.trim()) {
    errors.qualification = "Qualification is required";
  } else if (formData.qualification.trim().length > 100) {
    errors.qualification = "Qualification cannot exceed 100 characters";
  }

  // Father Name validation
  if (!formData.fatherName?.trim()) {
    errors.fatherName = "Father's name is required";
  } else if (formData.fatherName.trim().length > 50) {
    errors.fatherName = "Father's name cannot exceed 50 characters";
  }

  // Mother Name validation
  if (!formData.motherName?.trim()) {
    errors.motherName = "Mother's name is required";
  } else if (formData.motherName.trim().length > 50) {
    errors.motherName = "Mother's name cannot exceed 50 characters";
  }

  // State validation
  if (!formData.state?.trim()) {
    errors.state = "State is required";
  } else if (formData.state.trim().length > 50) {
    errors.state = "State name cannot exceed 50 characters";
  }

  // City validation
  if (!formData.city?.trim()) {
    errors.city = "City is required";
  } else if (formData.city.trim().length > 50) {
    errors.city = "City name cannot exceed 50 characters";
  }

  // Pincode validation
  if (!formData.pincode?.trim()) {
    errors.pincode = "Pincode is required";
  } else {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(formData.pincode)) {
      errors.pincode = "Please enter a valid 6-digit pincode";
    }
  }

  // Address validation
  if (!formData.address?.trim()) {
    errors.address = "Address is required";
  } else if (formData.address.trim().length < 10) {
    errors.address = "Address must be at least 10 characters";
  } else if (formData.address.trim().length > 500) {
    errors.address = "Address cannot exceed 500 characters";
  }

  return errors;
};

// Format phone number for display
export const formatPhoneNumber = phone => {
  if (!phone) return "";
  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length === 10) {
    return `+91 ${phoneDigits.slice(0, 5)} ${phoneDigits.slice(5)}`;
  }
  return phone;
};

// Clean phone number (remove formatting)
export const cleanPhoneNumber = phone => {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
};
