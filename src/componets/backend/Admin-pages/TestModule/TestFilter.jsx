/* eslint-disable react/prop-types */
import { useState } from "react";

const TestFilter = ({ onTestSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); // State for the unified search term

  // Handle input change
  const handleChange = event => {
    const value = event.target.value;
    setSearchTerm(value); // Update the search term
    onTestSearch(value); // Pass the search term to the parent
  };

  return (
    <div className="test-filter">
      <div className="form-group">
        <input
          type="search"
          id="test-search"
          name="test-search"
          value={searchTerm} // Bind the value to the searchTerm state
          onChange={handleChange} // Handle input change
          placeholder="Enter Test Type or description"
          className="form-control"
        />
      </div>
    </div>
  );
};

export default TestFilter;
