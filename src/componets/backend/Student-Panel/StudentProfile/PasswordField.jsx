/* eslint-disable react/prop-types */

const PasswordField = ({
  value,
  onChange,
  error,
  isEditMode,
  showPasswordInput,
  setShowPasswordInput,
  onCancel,
  existingPasswordLength = 8,
}) => {
  const getPasswordDots = () => {
    return "•".repeat(existingPasswordLength);
  };

  const handlePasswordClick = () => {
    if (isEditMode) {
      setShowPasswordInput(true);
      setTimeout(() => {
        const passwordInput = document.querySelector('input[id="password"]');
        if (passwordInput) {
          passwordInput.focus();
        }
      }, 50);
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor="password" className="form-label">
        {showPasswordInput ? "New Password" : "Password (Current)"}
        {showPasswordInput && <span className="text-danger"> *</span>}
      </label>

      {!showPasswordInput ? (
        <div style={{ position: "relative" }}>
          <div
            className="form-control d-flex align-items-center justify-content-between"
            style={{
              backgroundColor: "#f8f9fa",
              cursor: isEditMode ? "pointer" : "default",
              fontFamily: "Verdana, sans-serif",
              letterSpacing: "0.2em",
              fontSize: "16px",
              color: "#495057",
              minHeight: "38px",
            }}
            onClick={handlePasswordClick}
          >
            <span>{getPasswordDots()}</span>
            {isEditMode && (
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
            )}
          </div>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <input
            type="password"
            className={`form-control ${error ? "is-invalid" : ""}`}
            id="password"
            placeholder="Enter new password (minimum 6 characters)"
            value={value}
            onChange={onChange}
          />
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary position-absolute"
            style={{
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "12px",
              padding: "2px 8px",
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      )}

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default PasswordField;
