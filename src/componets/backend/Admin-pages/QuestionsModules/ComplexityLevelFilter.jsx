/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "react-select";
import { components } from "react-select";

// Difficulty options for the filter
const complexityOptions = [
  { value: "Easy", label: "Easy" },
  { value: "Moderate", label: "Moderate" },
  { value: "Tough", label: "Tough" },
];

const ComplexityLevelFilter = ({ onComplexitySelect }) => {
  // State to handle loading status and filtered options
  const [loading, setLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(complexityOptions); // Store filtered options

  // Handle complexity selection
  const handleComplexityChange = selectedOption => {
    onComplexitySelect(selectedOption); // Notify parent about the selected complexity
  };

  // Handle default option to show all questions when nothing is selected
  const handleClearSelection = () => {
    onComplexitySelect(null); // Reset selection
  };

  // Handle searching within the options
  const handleInputChange = inputValue => {
    setLoading(true); // Show loading spinner
    if (inputValue) {
      // Filter the options based on the input search
      const filtered = complexityOptions.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      // If input is empty, show all options
      setFilteredOptions(complexityOptions);
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
            onChange={handleComplexityChange} // Handle complexity selection change
            options={filteredOptions} // Dynamically filtered options
            placeholder="Select  Difficulty level"
            isClearable // Allow clearing the selection (to reset to "all")
            onClear={handleClearSelection} // Call when the selection is cleared
            defaultValue={null} // Default value to null, meaning no selection
            onInputChange={handleInputChange} // Triggered during input search
            components={{ LoadingIndicator: CustomLoadingIndicator }} // Custom
            isSearchable // Allow searching within the dropdown
            isLoading={loading} // Show loading spinner when searching
          />
        </div>
      </div>
    </div>
  );
};

export default ComplexityLevelFilter;
