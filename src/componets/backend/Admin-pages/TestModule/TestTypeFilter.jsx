/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "react-select";
import { components } from "react-select";

// TestType options for the filter (Example options, replace with your actual data)
const testTypeOptions = [
  { value: "Sub Topic Test", label: "Sub Topic Test" },
  {
    value: "Monthly Review Test Class XI",
    label: "Monthly Review Test Class XI",
  },
  {
    value: "Monthly Review Test Class XII",
    label: "Monthly Review Test Class XII",
  },
  {
    value: "Monthly Review Test Class XIII",
    label: "Monthly Review Test Class XIII",
  },
  { value: "Subject Test", label: "Subject Test" },
  { value: "Topic Test", label: "Topic Test" },
  { value: "Practice Test", label: "Practice Test" },
  { value: "Part Test", label: "Part Test" },
  { value: "Unit Test", label: "Unit Test" },
  { value: "Previous Year Paper", label: "Previous Year Paper" },
  { value: "Full Test", label: "Full Test" },
];

const TestTypeFilter = ({ onTestTypeSelect }) => {
  // State to handle loading status and filtered options
  const [loading, setLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(testTypeOptions); // Store filtered options

  // Handle test type selection
  const handleTestTypeChange = selectedOption => {
    onTestTypeSelect(selectedOption); // Notify parent about the selected test type
  };

  // Handle default option to show all test types when nothing is selected
  const handleClearSelection = () => {
    onTestTypeSelect(null); // Reset selection
  };

  // Handle searching within the options
  const handleInputChange = inputValue => {
    setLoading(true); // Show loading spinner
    if (inputValue) {
      // Filter the options based on the input search
      const filtered = testTypeOptions.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      // If input is empty, show all options
      setFilteredOptions(testTypeOptions);
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
            className="test-type-filter"
            onChange={handleTestTypeChange} // Handle test type selection change
            options={filteredOptions} // Dynamically filtered options
            placeholder="Select a test type"
            isClearable // Allow clearing the selection (to reset to "all")
            onClear={handleClearSelection} // Call when the selection is cleared
            defaultValue={null} // Default value to null, meaning no selection
            onInputChange={handleInputChange} // Triggered during input search
            components={{ LoadingIndicator: CustomLoadingIndicator }} // Custom loading indicator
            isSearchable // Allow searching within the dropdown
            isLoading={loading} // Show loading spinner when searching
          />
        </div>
      </div>
    </div>
  );
};

export default TestTypeFilter;
