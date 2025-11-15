/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
function TagQ({ onSaveTags, selectedTags }) {
  const [tags, setTags] = useState(selectedTags || ""); // State to store the selected tag

  // Handle the change in selected tag
  const handleTagChange = e => {
    const selectedTag = e.target.value;
    setTags(selectedTag); // Update local state
    onSaveTags(selectedTag); // Pass the selected tag to the parent component
  };
  useEffect(() => {
    setTags(selectedTags);
  }, [selectedTags]);

  return (
    <div>
      <Form.Group className="mb-3" controlId="formTags" name="tags">
        <Form.Label>Tags</Form.Label>
        <Form.Control
          as="select"
          name="tags"
          value={tags}
          onChange={handleTagChange}
        >
          <option value="">Select Tags</option>
          <option value="Visualisation">Visualisation</option>
          <option value="Previous JEE Main">Previous JEE Main</option>
          <option value="Previous JEE Advanced">Previous JEE Advanced</option>
        </Form.Control>
      </Form.Group>
    </div>
  );
}

export default TagQ;
