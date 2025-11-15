import "../../../../custom.css";
const Filter = () => {
  return (
    <>
      <div className="card search-filter categories-filter-blk">
        <div className="card-body">
          <div className="filter-widget mb-0">
            <div className="categories-head d-flex align-items-center">
              <h4>Filterd By</h4>
              <i className="fas fa-angle-down"></i>
            </div>
            <div>
              <label className="custom_check">
                <input type="checkbox" name="select_specialist" />
                <span className="checkmark"></span>JEE Class 11
              </label>
            </div>
            <div>
              <label className="custom_check">
                <input type="checkbox" name="select_specialist" />
                <span className="checkmark"></span> JEE Class 12
              </label>
            </div>
            <div>
              <label className="custom_check">
                <input type="checkbox" name="select_specialist" />
                <span className="checkmark"></span> JEE 12th Pass
              </label>
            </div>
            <div>
              <label className="custom_check">
                <input type="checkbox" name="select_specialist" />
                <span className="checkmark"></span>NEET Class 11
              </label>
            </div>
            <div>
              <label className="custom_check">
                <input type="checkbox" name="select_specialist" />
                <span className="checkmark"></span> NEET Class 12
              </label>
            </div>
            <div>
              <label className="custom_check">
                <input type="checkbox" name="select_specialist" />
                <span className="checkmark"></span> NEET 12th Pass
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Filter;
