/* eslint-disable react/prop-types */
import { useState } from "react";

const UserDetailFilter = ({ onChange }) => {
  const [term, setTerm] = useState(""); // State to store the search term

  // Handle input change
  const handleChange = event => {
    const searchTerm = event.target.value; // Get the search term
    setTerm(searchTerm); // Update the local state
    onChange(searchTerm); // Pass the search term to the parent component
  };

  return (
    <div>
      <input
        type="search"
        id="userDetailSearch"
        name="userDetailSearch"
        value={term} // Bind the value to the term state
        onChange={handleChange} // Handle the input change
        placeholder="Search by Username, Mobile, or Email"
        className="form-control user-detailed-input-form" // Optional styling
      />
    </div>
  );
};

export default UserDetailFilter;
