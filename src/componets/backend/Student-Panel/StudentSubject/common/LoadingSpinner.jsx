/* eslint-disable react/prop-types */
const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="text-center">
      <div className="spinner-border" role="status"></div>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
