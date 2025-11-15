/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

function Tags({ onSaveTags, selectedTags }) {
  const [selectedOptions, setSelectedOptions] = useState([]); // To store selected options in { value, label } format

  // Available tag options (this can be dynamic based on your data)
  const options = [
    { value: "Review Pending", label: "Review Pending" },
    { value: "Previous JEE Main", label: "Previous JEE Main" },
    { value: "Previous JEE Advanced", label: "Previous JEE Advanced" },
  ];

  // When the selection changes in the react-select dropdown
  const handleChange = selectedOptions => {
    setSelectedOptions(selectedOptions); // Update state with the selected options
    const updatedTags = selectedOptions
      ? selectedOptions.map(option => option.value) // Map to values only
      : [];
    onSaveTags(updatedTags); // Save the selected tag values (just the values, not { value, label })
  };

  // Synchronize the local state with selectedTags whenever it changes
  useEffect(() => {
    if (selectedTags && Array.isArray(selectedTags)) {
      // Update the state with selected tags when selectedTags prop changes
      const selectedTagOptions = selectedTags.map(tag => ({
        value: tag,
        label: tag,
      }));
      setSelectedOptions(selectedTagOptions); // Update the selected options state
    }
  }, [selectedTags]);

  return (
    <div className="mt-2 mb-2">
      <Form.Label>Tags</Form.Label>

      <Select
        options={options}
        value={selectedOptions} // Set the selected options (tags) as the value
        onChange={handleChange} // Handle changes to the selected tags
        placeholder="Select Tag(s)"
        closeMenuOnSelect={true} // Keep the dropdown open after selection (optional)
        isMulti // Allow multiple selections
      />
    </div>
  );
}

export default Tags;
