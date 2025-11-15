/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

function Stream({ onSaveStreams, selectedStreams }) {
  const [selectedOptions, setSelectedOptions] = useState([]); // To store selected options in { value, label } format

  // Available stream options in the format required by react-select
  const options = [
    { value: "Commerce", label: "Commerce" },
    { value: "Medical", label: "Medical" },
    { value: "Foundation", label: "Foundation" },
    { value: "Engineering", label: "Engineering" },
  ];

  // When the selection changes in the react-select dropdown
  const handleChange = selectedOptions => {
    setSelectedOptions(selectedOptions); // Update state with the selected options
    const updatedStreams = selectedOptions
      ? selectedOptions.map(option => option.value) // Map to values only
      : [];
    onSaveStreams(updatedStreams); // Save the selected stream values (just the values, not { value, label })
  };

  // Synchronize the local state with selectedStreams whenever it changes
  useEffect(() => {
    if (selectedStreams && Array.isArray(selectedStreams)) {
      // Update the state with selected streams when selectedStreams prop changes
      const selectedStreamOptions = selectedStreams.map(stream => ({
        value: stream,
        label: stream,
      }));
      setSelectedOptions(selectedStreamOptions); // Update the selected options state
    }
  }, [selectedStreams]);

  return (
    <div className="mt-2 mb-2">
      <Form.Label>Streams</Form.Label>

      <Select
        options={options}
        value={selectedOptions} // Set the selected options (stream) as the value
        onChange={handleChange} // Handle changes to the selected streams
        isMulti // Enable multi-select functionality
        placeholder="Select Stream(s)"
        closeMenuOnSelect={false} // Keep the dropdown open after selection (optional)
      />
    </div>
  );
}

export default Stream;
