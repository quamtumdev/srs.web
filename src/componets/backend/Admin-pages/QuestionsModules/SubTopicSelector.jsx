/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Select from "react-select";
import { components } from "react-select";
import { subjectData } from "../../Data/subjectData"; // Assuming subjectData is imported from a separate file

const SubTopicSelector = ({ selectedSubject, onSubTopicSelect }) => {
  const [loading, setLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    console.log("Selected Subject: ", selectedSubject); // Debugging line

    if (selectedSubject && subjectData[selectedSubject]) {
      setFilteredOptions(
        subjectData[selectedSubject].map(subTopic => ({
          value: subTopic,
          label: subTopic,
        }))
      );
    } else {
      setFilteredOptions([]); // Reset if no subject is selected or subject has no subtopics
    }
  }, [selectedSubject]);

  // Handle subtopic selection
  const handleSubTopicChange = selectedOption => {
    onSubTopicSelect(selectedOption); // Notify parent about the selected subtopic
  };

  // Handle searching within the options
  const handleInputChange = inputValue => {
    console.log("Search Input: ", inputValue); // Debugging line
    setLoading(true);
    if (inputValue && selectedSubject) {
      const filtered = subjectData[selectedSubject].filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(
        filtered.map(subTopic => ({
          value: subTopic,
          label: subTopic,
        }))
      );
    } else if (selectedSubject) {
      setFilteredOptions(
        subjectData[selectedSubject]?.map(subTopic => ({
          value: subTopic,
          label: subTopic,
        })) || []
      );
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
      <div className="row">
        <div className="col-lg-12">
          <Select
            className="subtopic-filter"
            onChange={handleSubTopicChange}
            options={filteredOptions} // Pass filtered options here
            placeholder="Select a subtopic"
            isClearable
            onClear={() => onSubTopicSelect(null)}
            defaultValue={null}
            onInputChange={handleInputChange}
            components={{ LoadingIndicator: CustomLoadingIndicator }}
            isSearchable
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default SubTopicSelector;
