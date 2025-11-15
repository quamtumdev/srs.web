/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

function LevelC({ onSaveLevel, selectedLevel }) {
  const [level, setLevel] = useState(selectedLevel || ""); // Local state to store the selected level

  // Handle the change in selected difficulty level
  const handleLevelChange = e => {
    const selectedLevel = e.target.value;
    setLevel(selectedLevel); // Update the local state
    onSaveLevel(selectedLevel); // Pass the selected level to the parent component
  };

  // Synchronize the local state with the selectedLevel prop whenever it changes
  useEffect(() => {
    setLevel(selectedLevel); // Update the level state when selectedLevel prop changes
  }, [selectedLevel]);

  return (
    <div>
      <Form.Group className="mb-3" controlId="formLevel">
        <Form.Label>Select Difficulty Level</Form.Label>
        <Form.Control
          as="select"
          value={level}
          onChange={handleLevelChange} // Handle level change
        >
          <option value="">Select Level</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </Form.Control>
      </Form.Group>
    </div>
  );
}

export default LevelC;
