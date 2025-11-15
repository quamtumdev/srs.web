/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

// Import the guidelines data from Guideline.js
import guidelines from "./Guideline"; // Import guidelines array from Guideline.js

function Guideline({ onSaveGuideline, selectedGuideline }) {
  const [selectedOption, setSelectedOption] = useState(null); // State to store the selected guideline

  // Handle guideline change
  const handleGuidelineChange = selectedOption => {
    setSelectedOption(selectedOption);
    const updatedGuideline = selectedOption
      ? selectedOption.map(option => option.value) // Map to values only if multi-select
      : [];
    onSaveGuideline(updatedGuideline); // Save the selected guidelines (either an array or null)
  };

  // Synchronize local state with the selectedGuideline prop
  useEffect(() => {
    if (selectedGuideline) {
      const selectedGuidelineOptions = guidelines.filter(
        option => selectedGuideline.includes(option.value) // Check if the value exists in selectedGuideline
      );
      setSelectedOption(selectedGuidelineOptions); // Set the selected options for multiple selection
    }
  }, [selectedGuideline]);

  return (
    <div className="mt-2 mb-2">
      <Form.Label>Guideline</Form.Label>
      <Select
        options={guidelines} // Use the imported guideline options
        value={selectedOption} // Set the selected options (support for multiple selections)
        onChange={handleGuidelineChange} // Handle changes to the selected guideline
        placeholder="Select Guideline"
        closeMenuOnSelect={false} // Allow multiple selections without closing the dropdown
        isMulti={true} // Enable multi-select
      />
    </div>
  );
}

export default Guideline;
