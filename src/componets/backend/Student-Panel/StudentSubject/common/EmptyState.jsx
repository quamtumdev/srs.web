/* eslint-disable react/prop-types */
const EmptyState = ({
  icon = "fas fa-book",
  title = "No Items Found",
  message = "No items available.",
}) => {
  return (
    <div className="col-12">
      <div className="text-center py-4">
        <i className={`${icon} fa-3x text-muted mb-3`}></i>
        <h5 className="text-muted">{title}</h5>
        <p className="text-muted">{message}</p>
      </div>
    </div>
  );
};

export default EmptyState;
