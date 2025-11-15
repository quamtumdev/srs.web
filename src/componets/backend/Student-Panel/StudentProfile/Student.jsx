/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { useState } from "react";
import { useStudentProfile } from "./useStudentProfile";
import AlertMessage from "./AlertMessage";
import LoadingSpinner from "./LoadingSpinner";
import ProfileImageUpload from "./ProfileImageUpload";
import FormInput from "./FormInput";
import PasswordField from "./PasswordField";
import {
  validateStudentProfile,
  getApiErrorMessage,
} from "../../../../utils/validateStudentProfile";
import axios from "axios";

const Student = () => {
  const {
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
    dataLoading,
  } = useStudentProfile();

  // Edit mode and password states
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  // Image states
  const [profileImage, setProfileImage] = useState(
    "/assets/backend-img/user.png"
  );
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle input changes
  const handleInputChange = e => {
    const { id, value } = e.target;
    let processedValue = value;

    // Phone validation
    if (id === "studentPhone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length <= 10) {
        processedValue = digits;
      } else return;
    }

    // Pincode validation
    if (id === "pincode") {
      const digits = value.replace(/\D/g, "");
      if (digits.length <= 6) {
        processedValue = digits;
      } else return;
    }

    // Password validation
    if (id === "password") {
      if (value.length > 128) return;
      setIsPasswordChanged(value.length > 0);
    }

    setFormData(prev => ({ ...prev, [id]: processedValue }));

    // Clear errors
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditMode(true);
    setMessage("Now you can edit your profile information.");
    setMessageType("info");
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setFormData(JSON.parse(JSON.stringify(originalData)));
    setIsPasswordChanged(false);
    setShowPasswordInput(false);
    setSelectedImageFile(null);
    setImagePreview(null);
    setErrors({});

    setMessage("Changes cancelled. Profile restored to original state.");
    setMessageType("warning");
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  // Handle image selection
  const handleImageSelect = file => {
    setSelectedImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = e => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Handle password cancel
  const handleCancelPasswordEdit = () => {
    setShowPasswordInput(false);
    setIsPasswordChanged(false);
    setFormData(prev => ({ ...prev, password: "" }));
  };

  // Upload image
  const uploadImage = async file => {
    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await axios.post(
        `http://localhost:5000/api/auth/studentRegistration/upload-image/${profileId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return response.data.imageUrl;
    } catch (error) {
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    if (!isEditMode) {
      setMessage("Please click Edit button to modify your profile.");
      setMessageType("warning");
      return;
    }

    let dataToValidate = { ...formData };
    if (!isPasswordChanged) {
      delete dataToValidate.password;
    }

    const validationErrors = validateStudentProfile(
      dataToValidate,
      !isPasswordChanged
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage("Please fix the errors below and try again.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      let imageUrl = profileImage;

      if (selectedImageFile) {
        try {
          imageUrl = await uploadImage(selectedImageFile);
          setProfileImage(imageUrl);
        } catch (imageError) {
          setMessage("Profile saved but image upload failed.");
          setMessageType("warning");
        }
      }

      const submissionData = { ...formData, studentprofileImage: imageUrl };
      if (!isPasswordChanged) {
        delete submissionData.password;
      }

      const response = await axios.put(
        `http://localhost:5000/api/auth/studentRegistration/profile/${profileId}`,
        submissionData
      );

      setMessage("Profile updated successfully!");
      setMessageType("success");

      setOriginalData(
        JSON.parse(JSON.stringify({ ...formData, password: "" }))
      );
      setIsEditMode(false);
      setIsPasswordChanged(false);
      setShowPasswordInput(false);
      setFormData(prev => ({ ...prev, password: "" }));
      setSelectedImageFile(null);
      setImagePreview(null);

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (error) {
      setMessage(getApiErrorMessage(error));
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return <LoadingSpinner message="Loading your profile..." />;
  }

  return (
    <div className="d-flex justify-content-center align-items-start my-profile-SRS-container">
      <div className="col-md-9">
        <AlertMessage
          message={message}
          messageType={messageType}
          onClose={() => {
            setMessage("");
            setMessageType("");
          }}
        />

        <div className="card card-widget shadow">
          <div className="card-header position-relative text-center my-profile-SRS-card-header">
            <ProfileImageUpload
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              isEditMode={isEditMode}
              onImageSelect={handleImageSelect}
              selectedImageFile={selectedImageFile}
              imagePreview={imagePreview}
            />

            {/* Edit/Cancel Buttons */}
            <div className="card-tools position-absolute my-profile-SRS-card-tools">
              {!isEditMode ? (
                <button
                  type="button"
                  className="btn btn-tool bg-primary text-white"
                  onClick={handleEditClick}
                >
                  Edit <i className="fa fa-edit"></i>
                </button>
              ) : (
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-tool bg-success text-white"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}{" "}
                    <i className="fa fa-check"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-tool bg-secondary text-white ms-1"
                    onClick={handleCancelEdit}
                  >
                    Cancel <i className="fa fa-times"></i>
                  </button>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="card-body mt-4">
              {/* Edit mode indicator */}
              {isEditMode && (
                <div className="row mb-3">
                  <div className="col-12">
                    <div className="alert alert-info">
                      <i className="fas fa-edit me-2"></i>
                      <strong>Edit Mode Active:</strong> You can now modify your
                      profile information.
                    </div>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-md-6">
                  <FormInput
                    label="Student Name"
                    id="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Student Name"
                    error={errors.studentName}
                    required
                    readOnly={!isEditMode}
                    isEditMode={isEditMode}
                  />
                </div>

                <div className="col-md-6">
                  <FormInput
                    label="Student Email"
                    id="studentEmail"
                    type="email"
                    value={formData.studentEmail}
                    onChange={handleInputChange}
                    placeholder="student@example.com"
                    error={errors.studentEmail}
                    required
                    readOnly={!isEditMode}
                    isEditMode={isEditMode}
                  />
                </div>

                <div className="col-md-6">
                  <PasswordField
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    isEditMode={isEditMode}
                    showPasswordInput={showPasswordInput}
                    setShowPasswordInput={setShowPasswordInput}
                    onCancel={handleCancelPasswordEdit}
                  />
                </div>

                <div className="col-md-6">
                  <FormInput
                    label="Student Phone"
                    id="studentPhone"
                    type="tel"
                    value={formData.studentPhone}
                    onChange={handleInputChange}
                    placeholder="+91 234 567 8900"
                    error={errors.studentPhone}
                    required
                    readOnly={!isEditMode}
                    maxLength="10"
                    isEditMode={isEditMode}
                  />
                </div>

                <div className="col-md-6">
                  <FormInput
                    label="Course"
                    id="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    placeholder="Enter course"
                    error={errors.course}
                    required
                    readOnly={!isEditMode}
                    isEditMode={isEditMode}
                  />
                </div>

                <div className="col-md-6">
                  <FormInput
                    label="Qualification"
                    id="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    placeholder="Enter qualification"
                    error={errors.qualification}
                    required
                    readOnly={!isEditMode}
                    isEditMode={isEditMode}
                  />
                </div>

                <div className="col-md-6">
                  <FormInput
                    label="Father Name"
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    placeholder="Enter father's name"
                    error={errors.fatherName}
                    required
                    readOnly={!isEditMode}
                    isEditMode={isEditMode}
                  />
                </div>

                <div className="col-md-6">
                  <FormInput
                    label="Mother Name"
                    id="motherName"
                    value={formData.motherName}
                    onChange={handleInputChange}
                    placeholder="Enter mother's name"
                    error={errors.motherName}
                    required
                    readOnly={!isEditMode}
                    isEditMode={isEditMode}
                  />
                </div>

                <div className="col-md-6">
                  <FormInput
                    label="State"
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    error={errors.state}
                    required
                    readOnly={!isEditMode}
                    isEditMode={isEditMode}
                  />
                </div>

                <div className="col-md-6">
                  <FormInput
                    label="City"
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    error={errors.city}
                    required
                    readOnly={!isEditMode}
                    isEditMode={isEditMode}
                  />
                </div>

                <div className="col-md-12">
                  <FormInput
                    label="Pincode"
                    id="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter pincode"
                    error={errors.pincode}
                    required
                    readOnly={!isEditMode}
                    maxLength="6"
                    isEditMode={isEditMode}
                  />
                </div>

                <div className="col-12">
                  <FormInput
                    label="Address"
                    id="address"
                    type="textarea"
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter full address"
                    error={errors.address}
                    required
                    readOnly={!isEditMode}
                    isEditMode={isEditMode}
                  />
                </div>
              </div>
            </div>

            <div className="card-footer d-flex justify-content-between">
              <div>
                {!isEditMode && (
                  <small className="text-muted">
                    Click Edit button to modify your profile information.
                  </small>
                )}
              </div>

              <div>
                {isEditMode && (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                      disabled={loading}
                    >
                      <i className="fa fa-times me-2"></i>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary ms-2"
                      disabled={loading}
                    >
                      <i className="fa fa-save me-2"></i>
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Student;
