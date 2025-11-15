const LoadingSpinner = () => {
  return (
    <section className="content">
      <div className="container-fluid">
        <h5 className="pt-4 mb-3">Subjects</h5>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingSpinner;
