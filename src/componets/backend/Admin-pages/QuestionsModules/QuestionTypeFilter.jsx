/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "react-select";
import { components } from "react-select";

// Question Type options for the filter
const questionTypeOptions = [
  { value: "Multiple Correct", label: "Multiple Correct" },
  { value: "Single Correct", label: "Single Correct" },
  { value: "Comprehension", label: "Comprehension" },
  { value: "Single Digit Integer", label: "Single Digit Integer" },
  { value: "Four Digit Integer", label: "Four Digit Integer" },
  { value: "Numeric Value", label: "Numeric Value" },
  { value: "Matrix 4*5", label: "Matrix 4*5" },
  { value: "Matrix 4*6", label: "Matrix 4*6" },
  { value: "Matrix 3*4", label: "Matrix 3*4" },
  { value: "Assertion Reasoning", label: "Assertion Reasoning" },
  { value: "Matrix Single Correct", label: "Matrix Single Correct" },
  { value: "True False", label: "True False" },
  { value: "Subjective", label: "Subjective" },
];

const QuestionTypeFilter = ({ onQuestionTypeSelect }) => {
  // State to handle loading status and filtered options
  const [loading, setLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(questionTypeOptions); // Store filtered options

  // Handle question type selection
  const handleQuestionTypeChange = selectedOption => {
    onQuestionTypeSelect(selectedOption); // Notify parent about the selected question type
  };

  // Handle default option to show all questions when nothing is selected
  const handleClearSelection = () => {
    onQuestionTypeSelect(null); // Reset selection
  };

  // Handle searching within the options
  const handleInputChange = inputValue => {
    setLoading(true); // Show loading spinner
    if (inputValue) {
      // Filter the options based on the input search
      const filtered = questionTypeOptions.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      // If input is empty, show all options
      setFilteredOptions(questionTypeOptions);
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
            onChange={handleQuestionTypeChange} // Handle question type selection change
            options={filteredOptions} // Dynamically filtered options
            placeholder="Select question type"
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

export default QuestionTypeFilter;
