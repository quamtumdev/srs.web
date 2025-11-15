/* eslint-disable react/prop-types */
const FormInput = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  readOnly = false,
  maxLength,
  rows,
  isEditMode = true,
}) => {
  const isTextarea = type === "textarea";
  const InputComponent = isTextarea ? "textarea" : "input";

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <InputComponent
        type={isTextarea ? undefined : type}
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        maxLength={maxLength}
        rows={isTextarea ? rows : undefined}
        style={{
          backgroundColor: readOnly ? "#f8f9fa" : "#fff",
          cursor: readOnly ? "default" : "text",
          resize: isTextarea ? (isEditMode ? "vertical" : "none") : undefined,
        }}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormInput;
