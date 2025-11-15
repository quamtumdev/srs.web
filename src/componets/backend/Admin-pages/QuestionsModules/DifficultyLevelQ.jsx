/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function DifficultyLevelQ({ onSaveLevel, selectedLevels }) {
  const [level, setLevel] = useState(selectedLevels || ""); // State to store the selected tag

  const handleLevelChange = e => {
    const selectedDifficulty = e.target.value;
    setLevel(selectedDifficulty); // Update local state
    onSaveLevel(selectedDifficulty); // Pass the selected level to the parent component
  };
  // Synchronize the local state with selectedLevel whenever it changes
  useEffect(() => {
    setLevel(selectedLevels);
  }, [selectedLevels]); // Only re-run when selectedLevel changes

  return (
    <div>
      <Form.Group className="mb-3" controlId="formDifficultyLevel" name="level">
        <Form.Label>Difficulty Level</Form.Label>
        <Form.Control
          as="select"
          name="level"
          value={level} // Set the value of the select dropdown to be controlled by local state
          onChange={handleLevelChange} // Update local state and pass the value to the parent
        >
          <option value="">Select Difficulty Level</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Tough">Tough</option>
        </Form.Control>
      </Form.Group>
    </div>
  );
}

export default DifficultyLevelQ;
