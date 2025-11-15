/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

// Import the marking schemes data from another file (similar to how guidelines are imported)
import markingSchemes from "./MarkingSchme"; // Import the marking schemes array

function MarkingSchme({ onSaveMarkingScheme, selectedMarkingScheme }) {
  const [selectedOption, setSelectedOption] = useState(null); // State to store the selected marking scheme

  // Handle marking scheme change
  const handleMarkingSchemeChange = selectedOption => {
    setSelectedOption(selectedOption);
    const updatedMarkingScheme = selectedOption
      ? selectedOption.map(option => option.value) // Map to values only
      : [];
    onSaveMarkingScheme(updatedMarkingScheme);
  };

  // Synchronize local state with the selectedMarkingScheme prop
  useEffect(() => {
    if (selectedMarkingScheme) {
      const selectedMarkingSchemeOptions = markingSchemes.filter(
        option => selectedMarkingScheme.includes(option.value) // Check if the value exists in selectedMarkingScheme
      );
      setSelectedOption(selectedMarkingSchemeOptions); // Set the selected options for multiple selection
    }
  }, [selectedMarkingScheme]);

  return (
    <div className="mt-2 mb-2">
      <Form.Label>Marking Scheme</Form.Label>
      <Select
        options={markingSchemes} // Use the imported marking scheme options
        value={selectedOption} // Set the selected options (support for multiple selections)
        onChange={handleMarkingSchemeChange} // Handle changes to the selected marking scheme
        placeholder="Select Marking Scheme"
        closeMenuOnSelect={false} // Allow multiple selections
        isMulti={true} // Enable multi-select
      />
    </div>
  );
}

export default MarkingSchme;
