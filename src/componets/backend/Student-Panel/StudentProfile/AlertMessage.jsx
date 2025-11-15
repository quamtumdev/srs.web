/* eslint-disable react/prop-types */
const AlertMessage = ({ message, messageType, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`alert ${
        messageType === "success"
          ? "alert-success"
          : messageType === "error"
          ? "alert-danger"
          : messageType === "warning"
          ? "alert-warning"
          : "alert-info"
      } alert-dismissible fade show mb-3`}
    >
      <i
        className={`fas ${
          messageType === "success"
            ? "fa-check-circle"
            : messageType === "error"
            ? "fa-exclamation-triangle"
            : messageType === "warning"
            ? "fa-exclamation-circle"
            : "fa-info-circle"
        } me-2`}
      ></i>
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
};

export default AlertMessage;
