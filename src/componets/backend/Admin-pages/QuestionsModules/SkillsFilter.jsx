/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "react-select";
import { components } from "react-select";

// Skill options for the filter
const skillOptions = [
  { value: "Calculation Based", label: "Calculation Based" },
  { value: "Visualisation", label: "Visualisation" },
  { value: "Analytical", label: "Analytical" },
  { value: "Memory Based", label: "Memory Based" },
  { value: "Formula Based", label: "Formula Based" },
  { value: "Critical Thinking", label: "Critical Thinking" },
  { value: "Manipulation or Tricky", label: "Manipulation or Tricky" },
];

const SkillsFilter = ({ onSkillSelect }) => {
  // State to handle loading status and filtered options
  const [loading, setLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(skillOptions); // Store filtered options

  // Handle skill selection
  const handleSkillChange = selectedOption => {
    onSkillSelect(selectedOption); // Notify parent about the selected skill
  };

  // Handle default option to show all questions when nothing is selected
  const handleClearSelection = () => {
    onSkillSelect(null); // Reset selection
  };

  // Handle searching within the options
  const handleInputChange = inputValue => {
    setLoading(true); // Show loading spinner
    if (inputValue) {
      // Filter the options based on the input search
      const filtered = skillOptions.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      // If input is empty, show all options
      setFilteredOptions(skillOptions);
    }
    setLoading(false); // Hide loading spinner after filtering
  };

  // Custom Loading Indicator for React Select
  const CustomLoadingIndicator = () => (
    <components.LoadingIndicator>
      <div className="loading-spinner">
        <span>Loading...</span>
      </div>
    </components.LoadingIndicator>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Select
            className="stream-filter"
            onChange={handleSkillChange} // Handle skill selection change
            options={filteredOptions} // Dynamically filtered options
            placeholder="Search or select a skill"
            isClearable // Allow clearing the selection (to reset to "all")
            onClear={handleClearSelection} // Call when the selection is cleared
            defaultValue={null} // Default value to null, meaning no selection
            onInputChange={handleInputChange} // Triggered during input search
            components={{ LoadingIndicator: CustomLoadingIndicator }} // Custom
            // isMulti
            isSearchable // Allow searching within the dropdown
            isLoading={loading} // Show loading spinner when searching
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsFilter;
