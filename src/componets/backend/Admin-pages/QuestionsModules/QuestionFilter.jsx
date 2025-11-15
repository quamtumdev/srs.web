/* eslint-disable react/prop-types */
import { useState } from "react";

const QuestionFilter = ({ onQuestionSearch }) => {
  const [term, setTerm] = useState(""); // State to store the search term

  // Handle input change
  const handleChange = event => {
    const searchTerm = event.target.value; // Get the search term
    setTerm(searchTerm); // Update the local state
    onQuestionSearch(searchTerm); // Pass the search term to the parent component
  };

  return (
    <div>
      <input
        type="search"
        id="question-search"
        name="question-search"
        value={term} // Bind the value to the term state
        onChange={handleChange} // Handle the input change
        placeholder="Search by Question"
        className="form-control" // Optional styling
      />
    </div>
  );
};

export default QuestionFilter;
