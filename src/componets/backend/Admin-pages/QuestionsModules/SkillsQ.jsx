/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";
function SkillsQ({ onSaveSkills, selectedSkills }) {
  const [selectedOptions, setSelectedOptions] = useState([]); // To store selected skills in { value, label } format

  // Available skill options in the format required by react-select
  const options = [
    { value: "Calculation Based", label: "Calculation Based" },
    { value: "Visualisation", label: "Visualisation" },
    { value: "Analytical", label: "Analytical" },
    { value: "Memory Based", label: "Memory Based" },
    { value: "Formula Based", label: "Formula Based" },
    { value: "Critical Thinking", label: "Critical Thinking" },
    { value: "Manipulation or Tricky", label: "Manipulation or Tricky" },
  ];

  // When the selection changes in the react-select dropdown
  const handleChange = selectedOptions => {
    setSelectedOptions(selectedOptions); // Update state with the selected options
    const updatedSkills = selectedOptions
      ? selectedOptions.map(option => option.value)
      : [];
    onSaveSkills(updatedSkills); // Save the selected skill values (just the values, not { value, label })
  };

  // Synchronize the local state with selectedSkills whenever it changes
  useEffect(() => {
    if (selectedSkills) {
      // Update the state with selected skills when selectedSkills prop changes
      const selectedSkillOptions = selectedSkills.map(skill => ({
        value: skill,
        label: skill,
      }));
      setSelectedOptions(selectedSkillOptions); // Update the selected options state
    }
  }, [selectedSkills]);

  return (
    <div className="mt-2 mb-2">
      {/* React-Select dropdown for multi-select */}
      <Form.Label>Skills</Form.Label>
      <Select
        options={options}
        value={selectedOptions} // Set the selected options (skills) as the value
        onChange={handleChange} // Handle changes to the selected skills
        isMulti // Enable multi-select functionality
        placeholder="Select Skill(s)"
      />
    </div>
  );
}

export default SkillsQ;
