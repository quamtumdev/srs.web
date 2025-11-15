import "../../custom.css";
const QuickEnquiry = () => {
  return (
    <>
      <div className="d-flex align-items-center">
        {/* Trigger Button */}
        <button
          type="button"
          data-bs-toggle="modal" // Updated for Bootstrap 5
          data-bs-target="#exampleModal" // Updated for Bootstrap 5
          className="signin-three-head banner-enquiry "
        >
          Quick Enquiry
        </button>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content bg-light modal-enquiry">
            <div className="modal-header modal-enquiry-header">
              <h5
                className="modal-title text-center text-blue"
                id="exampleModalLabel"
              >
                QUICK ENQUIRY
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal" // Updated for Bootstrap 5
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body modal-enquiry-body">
              <div className="input-block">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Full Name"
                />
              </div>
              <div className="input-block">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="input-block">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Your Mobile"
                />
              </div>
              <div className="input-block">
                <select name="course" className="form-control" required>
                  <option value="">Select Course</option>
                  <option selected>NEET 1 YEAR COURSE (IMPULSE)</option>
                  <option>NEET 2 YEAR COURSE (AGILE)</option>
                  <option>NEET 3 YEAR COURSE (EDGE)</option>
                  <option>NEET 4 YEAR COURSE (SEED)</option>
                  <option>JEE (Main + Advanced) 1 Year Course (IMPULSE)</option>
                  <option>JEE (Main + Advanced) 2 Year Course (AGILE)</option>
                  <option>JEE (Main + Advanced) 3-Year Course (EDGE)</option>
                  <option>JEE (Main + Advanced) 4-Year Course (SEED)</option>
                  <option>
                    Foundation (Class X) 1 Year / 3 Year Course (EDGE)
                  </option>
                  <option>
                    Foundation (Class IX) 1 Year / 2 Year / 4 Year Course (SEED)
                  </option>
                  <option>NEET 1 YEAR COURSE (EMERGE)</option>
                  <option>JEE (Main + Advanced) 1 Year Course (EMERGE)</option>
                  <option>Crash Course</option>
                  <option>Test Series Course</option>
                  <option>MTSE</option>
                </select>
              </div>
              <div className="input-block">
                <textarea
                  rows="4"
                  className="form-control"
                  placeholder="Your Comments"
                ></textarea>
              </div>
            </div>
            <div className="submit-section">
              <button
                type="button"
                className="btn submit-btn modal-enquiry-btn"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickEnquiry;
