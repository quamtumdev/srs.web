/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select"; // Import react-select

function StreamC({ onSaveStreams, selectedStreams }) {
  const [selectedOptions, setSelectedOptions] = useState([]); // To store selected streams in { value, label } format

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
      ? selectedOptions.map(option => option.value)
      : [];
    onSaveStreams(updatedStreams); // Save the selected stream values (just the values, not { value, label })
  };

  // Synchronize the local state with selectedStreams whenever it changes
  useEffect(() => {
    if (selectedStreams) {
      // Update the state with selected streams when selectedStreams prop changes
      const selectedStreamOptions = selectedStreams.map(stream => ({
        value: stream,
        label: stream,
      }));
      setSelectedOptions(selectedStreamOptions); // Update the selected options state
    }
  }, [selectedStreams]);

  return (
    <div>
      {/* React-Select dropdown for multi-select */}
      <Form.Group className="mb-3" controlId="formSubjectStream">
        <Form.Label>Select Stream(s)</Form.Label>
        <Select
          options={options} // Pass the stream options
          value={selectedOptions} // Set the selected options (streams) as the value
          onChange={handleChange} // Handle changes to the selected streams
          isMulti // Enable multi-select functionality
          placeholder="Select Stream(s)"
        />
      </Form.Group>
    </div>
  );
}

export default StreamC;
