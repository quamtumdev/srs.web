import "../../custom.css";
const ColleagePredictor = () => {
  return (
    <>
      <section className="share-knowledge-five mt-5 pt-5">
        <div className="container mt-4 pt-4">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="card comment-sec card-collg-predi">
                <div className="card-body">
                  <h5 className="subs-title text-center mb-5-college">
                    College & Branch Predictor{" "}
                  </h5>
                  <p className="text-center ">
                    <b> Your online counsellor and partner</b>
                  </p>
                  <form>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="input-block">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Total Mark"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="input-block">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Name"
                      />
                    </div>
                    <div className="input-block">
                      <select className="form-control" required>
                        <option selected>Class</option>
                        <option>12th</option>
                        <option>12th Pass</option>
                      </select>
                    </div>
                    <div className="input-block">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Mobile Number"
                      />
                    </div>

                    <div className="input-block">
                      <select name="course" className="form-control" required>
                        <option></option>
                        <option selected>Select Type/Category</option>
                        <option>EWS</option>
                        <option>EWS (PwD)</option>
                        <option>OBC-NCL</option>
                        <option>OBC-NCL (PwD)</option>
                        <option>OPEN</option>
                        <option>OPEN (PwD)</option>
                        <option>SC</option>
                        <option>SC (PwD)</option>
                        <option>ST</option>
                      </select>
                    </div>

                    <div className="submit-section ">
                      <button className="learn-more-five w-50" type="submit">
                        Submit Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="section-five-sub">
                <img
                  src="assets/img/jee-main-predictor.jpg"
                  className="cllg-predictor-img rounded img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ColleagePredictor;
