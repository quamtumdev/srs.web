/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "react-select";
import { components } from "react-select";

// SubjectType options for the filter
const subjectTypeOptions = [
  { value: "Chemistry", label: "Chemistry" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Physics", label: "Physics" },
  { value: "Legal Studies", label: "Legal Studies" },
  { value: "Economics", label: "Economics" },
  { value: "Biology", label: "Biology" },
  { value: "Accounts", label: "Accounts" },
  { value: "Business Studies", label: "Business Studies" },
  { value: "English", label: "English" },
  { value: "Social Science Foundation", label: "Social Science Foundation" },
  { value: "General Knowledge", label: "General Knowledge" },
];

const SubjectTypeSelector = ({ onSubjectSelect }) => {
  const [loading, setLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(subjectTypeOptions);

  const handleSubjectChange = selectedOption => {
    onSubjectSelect(selectedOption); // Pass selected subject to parent
  };

  const handleInputChange = inputValue => {
    setLoading(true);
    if (inputValue) {
      // Filter options based on input search
      const filtered = subjectTypeOptions.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      // If input is empty, show all options
      setFilteredOptions(subjectTypeOptions);
    }
    setLoading(false);
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
      <Select
        className="stream-filter"
        onChange={handleSubjectChange}
        options={filteredOptions}
        placeholder="Select a subject"
        isClearable
        onClear={() => onSubjectSelect(null)}
        defaultValue={null}
        onInputChange={handleInputChange}
        components={{ LoadingIndicator: CustomLoadingIndicator }}
        isSearchable
        isLoading={loading}
      />
    </div>
  );
};

export default SubjectTypeSelector;
