import { TbSquareArrowRightFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import "../../../../custom.css";
const FormOlympiad = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-sm-12">
            <div className="video-sec vid-bg ">
              <div className="card rounded  d-flex-form">
                <div className="card-body">
                  <div className="award-list jee-award-list  d-flex align-items-center">
                    <span className="award-icon jee-icon">
                      <TbSquareArrowRightFilled className="iconCheckDone  form-jee arrow-icon-jee text-skyblue" />
                    </span>
                    <h5 className="font-wight text-dark">
                      Available this LIMITED TIME OFFER now!
                    </h5>
                  </div>
                  <form action="">
                    <div className="input-block">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your Student Name"
                      />
                    </div>
                    <div className="input-block">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email Id"
                      />
                    </div>
                    <div className="input-block">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter your Phone Number"
                      />
                    </div>
                    <div className="pass-group mb-3">
                      <select
                        className="form-control pass-input"
                        id="exampleFormControlSelect1"
                      >
                        <option selected>Class</option>
                        <option>5th</option>
                        <option>6th</option>
                        <option>7th</option>
                        <option>8th</option>
                        <option>9th</option>
                        <option>10th</option>
                      </select>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-6">
                        <div className="pass-group mb-3 ">
                          <select
                            className="form-control pass-input"
                            id="exampleFormControlSelect1"
                          >
                            <option selected>Select Medium</option>
                            <option selected>English</option>
                            <option>Hindi</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-6">
                        <div className="pass-group mb-3 ">
                          <select
                            className="form-control pass-input"
                            id="exampleFormControlSelect1"
                          >
                            <option selected>Select Board</option>
                            <option selected>CBSE Board</option>
                            <option>ICSE Board</option>
                            <option>State Board</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>

                  <div className="video-details olampiyad-vedio-details">
                    <Link to="#" className="btn btn-enroll w-100">
                      Submit Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FormOlympiad;
