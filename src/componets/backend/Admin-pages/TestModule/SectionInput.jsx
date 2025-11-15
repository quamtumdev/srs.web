/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";

const SectionInput = ({
  sectionName,
  setSectionName,
  sectionDescription,
  setSectionDescription,
  sectionDisplayOrder,
  setSectionDisplayOrder,
  sectionGuideline,
  setSectionGuideline,
  sectionMarkingScheme,
  setSectionMarkingScheme,
  isActiveSection,
  setIsActiveSection,
}) => {
  // Handle Active Toggle
  const handleToggleActive = () => {
    setIsActiveSection(prevState => !prevState);
  };

  return (
    <>
      {/* Active Toggle */}
      <Form.Group
        className="mb-3 toggle-section-active"
        controlId="formActiveToggle"
      >
        <Form.Check
          type="switch"
          id="active-toggle"
          label={isActiveSection ? "Active" : "Inactive"}
          checked={isActiveSection}
          onChange={handleToggleActive}
        />
      </Form.Group>

      {/* Section Name Input */}
      <Form.Group className="mb-3" controlId="formSectionName">
        <Form.Label>Section Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Section Name"
          value={sectionName}
          onChange={e => setSectionName(e.target.value)}
        />
      </Form.Group>

      {/* Section Description Input */}
      <Form.Group className="mb-3" controlId="formSectionDescription">
        <Form.Label>Section Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Section Description"
          value={sectionDescription}
          onChange={e => setSectionDescription(e.target.value)}
        />
      </Form.Group>

      {/* Section Display Order Input */}
      <Form.Group className="mb-3" controlId="formSectionDisplayOrder">
        <Form.Label>Section Display Order</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Section Display Order"
          value={sectionDisplayOrder}
          onChange={e => setSectionDisplayOrder(e.target.value)}
        />
      </Form.Group>

      {/* Section Guideline Input */}
      <Form.Group className="mb-3" controlId="formSectionGuideline">
        <Form.Label>Section Guideline</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Section Guideline"
          value={sectionGuideline}
          onChange={e => setSectionGuideline(e.target.value)}
        />
      </Form.Group>

      {/* Section Marking Scheme Input */}
      <Form.Group className="mb-3" controlId="formSectionMarkingScheme">
        <Form.Label>Section Marking Scheme</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Section Marking Scheme"
          value={sectionMarkingScheme}
          onChange={e => setSectionMarkingScheme(e.target.value)}
        />
      </Form.Group>
    </>
  );
};

export default SectionInput;
