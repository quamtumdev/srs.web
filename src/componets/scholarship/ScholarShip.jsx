import "../../custom.css";
export const ScholarShip = () => {
  return (
    <>
      <section className="home-three-transform">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9 col-md-8 col-sm-12">
              <div className="cta-content">
                <h2>
                  Take the scholarship test to unlock scholarships of up to 100%{" "}
                </h2>
                <p>NEET |JEE | FOUNDATION</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12">
              <img
                src="assets/img/1.png"
                className="custom-img-height"
                alt="Image"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="transform-button-three">
              <a href="#" className="btn btn-action btn-enroll-now ">
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
