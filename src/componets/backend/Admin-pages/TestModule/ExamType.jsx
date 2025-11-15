/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

function ExamType({ onSaveExamType, selectedExamType }) {
  const [selectedOptions, setSelectedOptions] = useState([]); // Store the selected options in { value, label } format

  // Available exam type options in the format required by react-select
  const options = [
    { value: "JEE Main", label: "JEE Main" },
    { value: "NTSE", label: "NTSE" },
    { value: "NEET", label: "NEET" },
    { value: "JEE Scholarship Test", label: "JEE Scholarship Test" },
    {
      value: "Foundation Scholarship Test",
      label: "Foundation Scholarship Test",
    },
    { value: "JEE Advanced", label: "JEE Advanced" },
  ];

  // When the selection changes in the react-select dropdown
  const handleChange = selectedOptions => {
    setSelectedOptions(selectedOptions); // Update state with the selected options
    const updatedExamTypes = selectedOptions
      ? selectedOptions.map(option => option.value) // Map to values only
      : [];
    onSaveExamType(updatedExamTypes); // Save the selected exam types (just the values, not { value, label })
  };

  // Synchronize the local state with selectedExamType whenever it changes
  useEffect(() => {
    if (selectedExamType && Array.isArray(selectedExamType)) {
      // Update the state with selected exam types when selectedExamType prop changes
      const selectedExamOption = selectedExamType.map(exam => ({
        value: exam,
        label: exam,
      }));
      setSelectedOptions(selectedExamOption); // Update the selected options state
    }
  }, [selectedExamType]); // Effect runs when selectedExamType changes

  return (
    <div className="mt-2 mb-2">
      <Form.Label>Exam Type</Form.Label>

      <Select
        options={options}
        value={selectedOptions} // Set the selected options (exam types) as the value
        onChange={handleChange} // Handle changes to the selected exam types
        placeholder="Select Exam Type"
        closeMenuOnSelect={true}
        isMulti // Enable multi-selection
      />
    </div>
  );
}

export default ExamType;
