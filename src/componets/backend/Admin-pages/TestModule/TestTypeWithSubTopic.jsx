/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import the CSS for the Quill editor

// Import the sub-topic options from SubTopic.js
import subTopicOptions from "./SubTopic";

// Import the subjects data from subjects.js
import subjects from "./subjects"; // Import subjects array from subjects.js

// Import the unit data from unit.js
import units from "./unit"; // Import units array from unit.js

// Import the topic options from Topic.js
import topicOptions from "./Topic"; // Import topic array from Topic.js

function TestTypeWithSubTopic({
  onSaveTestType,
  selectedTestType,
  onSaveSubTopic,
  subTopic,
  onSaveSyllabus,
  syllabus, // To store the content from React Quill
  onSaveTopic,
  subjectsData,
  onSaveSubject,
  topic,
  onSaveUnit,
  unit,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  // Available test type options
  const options = [
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

  // Handle test type change
  const handleTestTypeChange = selectedOption => {
    setSelectedOption(selectedOption);
    const updatedTestType = selectedOption ? selectedOption.value : "";
    onSaveTestType(updatedTestType); // Send selected test type to parent
    onSaveSubTopic(""); // Reset sub-topic when test type changes
    onSaveTopic(""); // Reset topic when test type changes
    onSaveUnit(""); // Reset unit when test type changes
  };

  // Handle sub-topic change
  const handleSubTopicChange = selectedSubTopic => {
    onSaveSubTopic(selectedSubTopic ? selectedSubTopic.value : ""); // Send selected sub-topic to parent
  };
  const handleSubjectChange = selectedSubject => {
    onSaveSubject(selectedSubject ? selectedSubject.value : ""); // Send selected sub-topic to parent
  };

  // Handle topic change
  const handleTopicChange = selectedTopic => {
    onSaveTopic(selectedTopic ? selectedTopic.value : ""); // Send selected topic to parent
  };

  // Handle unit change
  const handleUnitChange = selectedUnit => {
    onSaveUnit(selectedUnit ? selectedUnit.value : ""); // Send selected unit to parent
  };

  // Handle content change in React Quill editor
  const handleEditorChange = value => {
    onSaveSyllabus(value); // Send syllabus content to parent
  };

  useEffect(() => {
    if (selectedTestType) {
      const selectedTestOption = options.find(
        option => option.value === selectedTestType
      );
      setSelectedOption(selectedTestOption || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestType]);

  // List of test types that require ReactQuill
  const reviewTests = [
    "Monthly Review Test Class XI",
    "Monthly Review Test Class XII",
    "Monthly Review Test Class XIII",
    "Practice Test",
    "Part Test",
    "Previous Year Paper",
    "Full Test",
  ];

  return (
    <div className="mt-2 mb-2">
      <Form.Label>Test Type</Form.Label>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleTestTypeChange} // Handle test type change
        placeholder="Select Test Type"
        closeMenuOnSelect={true}
      />

      {selectedOption?.value === "Sub Topic Test" && (
        <Form.Group className="mt-3" controlId="formSubTopic">
          <Form.Label>Sub Topic</Form.Label>
          <Select
            options={subTopicOptions} // Use the imported sub-topic options
            value={
              subTopicOptions.find(option => option.value === subTopic) || null
            }
            onChange={handleSubTopicChange} // Handle sub-topic change
            placeholder="Select Sub Topic"
            closeMenuOnSelect={true}
          />
        </Form.Group>
      )}

      {/* Check if selected test type is one of the "Monthly Review" tests */}
      {reviewTests.includes(selectedOption?.value) && (
        <Form.Group className="mt-3 mb-5 pb-4" controlId="formTestDescription">
          <Form.Label>Test Description</Form.Label>
          <ReactQuill
            value={syllabus} // Pass the content value to the Quill editor
            onChange={handleEditorChange} // Handle content change
            style={{ height: "230px" }}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline"],
                ["link"],
                ["blockquote", "code-block"],
                ["image"],
                [{ align: [] }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ direction: "rtl" }],
                [{ script: "sub" }, { script: "super" }],
              ],
            }}
            placeholder="Write test description here..."
          />
        </Form.Group>
      )}

      {/* Check if selected test type is "Subject Test", show additional select box */}
      {selectedOption?.value === "Subject Test" && (
        <Form.Group className="mt-3" controlId="formSubjectTestSelect">
          <Form.Label>Select a Subject</Form.Label>
          <Select
            options={subjects}
            value={
              subjects.find(option => option.value === subjectsData) || null
            }
            placeholder="Select Subject"
            onChange={handleSubjectChange}
            closeMenuOnSelect={true}
          />
        </Form.Group>
      )}

      {/* Check if selected test type is "Unit Test", show additional select box for units */}
      {selectedOption?.value === "Unit Test" && (
        <Form.Group className="mt-3" controlId="formUnitTestSelect">
          <Form.Label>Select a Unit</Form.Label>
          <Select
            options={units} // Use the imported unit options
            placeholder="Select Unit"
            value={units.find(option => option.value === unit) || null}
            onChange={handleUnitChange} // Handle unit change
            closeMenuOnSelect={true}
          />
        </Form.Group>
      )}

      {/* Check if selected test type is "Topic Test", show additional select box for topics */}
      {selectedOption?.value === "Topic Test" && (
        <Form.Group className="mt-3" controlId="formTopicTestSelect">
          <Form.Label>Select a Topic</Form.Label>
          <Select
            options={topicOptions} // Use the imported topic options
            placeholder="Select Topic"
            value={topicOptions.find(option => option.value === topic) || null}
            onChange={handleTopicChange} // Handle topic change
            closeMenuOnSelect={true}
          />
        </Form.Group>
      )}
    </div>
  );
}

export default TestTypeWithSubTopic;
