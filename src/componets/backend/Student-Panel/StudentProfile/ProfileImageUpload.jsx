/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef } from "react";

const ProfileImageUpload = ({
  profileImage,
  setProfileImage,
  isEditMode,
  onImageSelect,
  selectedImageFile,
  imagePreview,
}) => {
  const fileInputRef = useRef(null);

  const getImageUrl = imagePath => {
    if (!imagePath) return "/assets/backend-img/user.png";
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("/assets")) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const triggerImageUpload = () => {
    if (isEditMode) {
      fileInputRef.current?.click();
    }
  };

  const removeSelectedImage = () => {
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, GIF)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      onImageSelect(file);
    }
  };

  return (
    <div className="widget-user-image position-absolute start-50 translate-middle my-profile-SRS-widget-user-image">
      <div className="position-relative d-inline-block">
        <img
          className="img-circle elevation-2 my-profile-SRS-user-avatar"
          src={imagePreview || getImageUrl(profileImage)}
          alt="User Avatar"
          style={{
            width: "90px",
            height: "90px",
            objectFit: "cover",
            cursor: isEditMode ? "pointer" : "default",
            border: "4px solid #fff",
            opacity: isEditMode ? 1 : 0.8,
          }}
          onClick={triggerImageUpload}
          onError={e => {
            e.target.src = "/assets/backend-img/user.png";
          }}
        />

        {isEditMode && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: "50%",
              cursor: "pointer",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
            onClick={triggerImageUpload}
            onMouseEnter={e => (e.target.style.opacity = 1)}
            onMouseLeave={e => (e.target.style.opacity = 0)}
          >
            <i
              className="fas fa-camera text-white"
              style={{ fontSize: "20px" }}
            ></i>
          </div>
        )}

        {isEditMode && (selectedImageFile || imagePreview) && (
          <button
            type="button"
            className="btn btn-danger btn-sm position-absolute"
            style={{
              top: "-5px",
              right: "-5px",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
              padding: "0",
              fontSize: "12px",
            }}
            onClick={removeSelectedImage}
            title="Remove Image"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ProfileImageUpload;
