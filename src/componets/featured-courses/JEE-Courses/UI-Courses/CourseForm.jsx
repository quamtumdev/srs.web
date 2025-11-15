import { TbSquareArrowRightFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import "../../../../custom.css";
const CourseForm = () => {
  return (
    <>
      <div className="video-sec vid-bg">
        <div className="card">
          <div className="card-body">
            <div className="award-list jee-award-list  d-flex align-items-center">
              <span className="award-icon jee-icon">
                <TbSquareArrowRightFilled className="iconCheckDone  form-jee arrow-icon-jee text-skyblue" />
              </span>
              <h5 className="font-wight">
                Submit form for free counselling & scholarship
              </h5>
            </div>
            <form action="#l">
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
                  <option>Select className</option>
                  <option>11th</option>
                  <option>12th</option>
                  <option>12th Pass</option>
                </select>
              </div>
              <div className="pass-group mb-3 ">
                <select
                  className="form-control pass-input"
                  id="exampleFormControlSelect1"
                >
                  <option>Select Course</option>
                  <option selected>JEE(Main) + Advanced)</option>
                  <option>NEET</option>
                </select>
              </div>
            </form>

            <div className="video-details">
              <Link to="#" className="btn btn-enroll w-100">
                Submit Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CourseForm;
