/* eslint-disable react/prop-types */
const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="alert alert-danger">
      <i className="fas fa-exclamation-triangle me-2"></i>
      {error}
      {onRetry && (
        <button
          className="btn btn-outline-danger btn-sm ms-3"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
