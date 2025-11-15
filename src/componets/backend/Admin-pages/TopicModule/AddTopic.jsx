import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap"; // To use Form components like Input
import "../../Admin/AdminJS.js";
import "../../Admin/AdminCSS.css";

// eslint-disable-next-line react/prop-types
function AddTopic({ addNewTopics }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState(""); // Subject content (text)
  const [units, setUnits] = useState([]); // Multiple units selected
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const unitOptions = [
    {
      unitTitle: "Physical Chemistry",
      subTopics: ["Physical Chemistry For IIT"],
    },
    {
      unitTitle: "Organic Chemistry",
      subTopics: ["Organic Chemistry For IIT"],
    },
    {
      unitTitle: "Inorganic Chemistry",
      subTopics: ["Inorganic Chemistry For IIT"],
    },
    {
      unitTitle: "Algebra",
      subTopics: ["Algebra For IIT"],
    },
    {
      unitTitle: "Calculus",
      subTopics: ["Calculus For IIT"],
    },
    {
      unitTitle: "Coordinate Geometry",
      subTopics: ["Coordinate Geometry For IIT"],
    },
    {
      unitTitle: "Trigonometry",
      subTopics: ["Trigonometry For IIT"],
    },
    {
      unitTitle: "Wave Optics",
      subTopics: ["Wave Optics For IIT"],
    },
    {
      unitTitle: "Ray Optics",
      subTopics: ["Ray Optics For IIT"],
    },
    {
      unitTitle: "Wave Oscillation",
      subTopics: ["Wave Oscillation For IIT"],
    },
    {
      unitTitle: "Social Science VIII",
      subTopics: ["Social Science VIII For Class VIII"],
    },
    {
      unitTitle: "Fluid Mechanics and Properties of Matter",
      subTopics: ["Fluid Mechanics For IIT", "Properties of Matter For IIT"],
    },
    {
      unitTitle: "Physics VIII",
      subTopics: ["Physics For Class VIII"],
    },
    {
      unitTitle: "Mental Ability VIII",
      subTopics: ["Mental Ability For Class VIII"],
    },
    {
      unitTitle: "Biology VIII",
      subTopics: ["Biology For Class VIII"],
    },
    {
      unitTitle: "General Knowledge Class IX",
      subTopics: ["General Knowledge For Class IX"],
    },
    {
      unitTitle: "Element of Business Class IX",
      subTopics: ["Element of Business For Class IX"],
    },
    {
      unitTitle: "Mathematics Class IX",
      subTopics: ["Mathematics For Class IX"],
    },
    {
      unitTitle: "Mathematics Class X",
      subTopics: ["Mathematics For Class X"],
    },
    {
      unitTitle: "Element of Business Class X",
      subTopics: ["Element of Business For Class X"],
    },
    {
      unitTitle: "General Knowledge Class X",
      subTopics: ["General Knowledge For Class X"],
    },
    {
      unitTitle: "Mathematics Class VIII",
      subTopics: ["Mathematics For Class VIII"],
    },
    {
      unitTitle: "Chemistry Class IX",
      subTopics: ["Chemistry For Class IX"],
    },
    {
      unitTitle: "Chemistry Class X",
      subTopics: ["Chemistry For Class X"],
    },
    {
      unitTitle: "Electromagnetism",
      subTopics: ["Electromagnetism For IIT"],
    },
    {
      unitTitle: "Chemistry Class VIII",
      subTopics: ["Chemistry For Class VIII"],
    },
    {
      unitTitle: "Zoology",
      subTopics: ["Zoology For IIT"],
    },
    {
      unitTitle: "Botany",
      subTopics: ["Botany For IIT"],
    },
    {
      unitTitle: "Heat and Thermodynamics",
      subTopics: ["Heat and Thermodynamics For IIT"],
    },
    {
      unitTitle: "Electronics EM Waves and Communication",
      subTopics: [
        "Electronics For IIT",
        "EM Waves For IIT",
        "Communication For IIT",
      ],
    },
    {
      unitTitle: "Mechanics",
      subTopics: ["Mechanics For IIT"],
    },
    {
      unitTitle: "Modern Physics",
      subTopics: ["Modern Physics For IIT"],
    },
    {
      unitTitle: "Physics Class IX",
      subTopics: ["Physics For Class IX"],
    },
    {
      unitTitle: "Physics Class X",
      subTopics: ["Physics For Class X"],
    },
    {
      unitTitle: "Mental Ability Class IX",
      subTopics: ["Mental Ability For Class IX"],
    },
    {
      unitTitle: "Mental Ability Class X",
      subTopics: ["Mental Ability For Class X"],
    },
    {
      unitTitle: "Biology Class IX",
      subTopics: ["Biology For Class IX"],
    },
    {
      unitTitle: "Biology Class X",
      subTopics: ["Biology For Class X"],
    },
    {
      unitTitle: "Social Science IX",
      subTopics: ["Social Science For Class IX"],
    },
    {
      unitTitle: "Social Science X",
      subTopics: ["Social Science For Class X"],
    },
    {
      unitTitle: "English Class IX",
      subTopics: ["English For Class IX"],
    },
    {
      unitTitle: "English Class X",
      subTopics: ["English For Class X"],
    },
    {
      unitTitle: "English Class VIII",
      subTopics: ["English For Class VIII"],
    },
    {
      unitTitle: "General Knowledge VIII",
      subTopics: ["General Knowledge For Class VIII"],
    },
    {
      unitTitle: "Elements of Book Keeping and Accountancy Class IX",
      subTopics: ["Elements of Book Keeping For Class IX"],
    },
    {
      unitTitle: "Elements of Book Keeping and Accountancy Class X",
      subTopics: ["Elements of Book Keeping For Class X"],
    },
    {
      unitTitle: "Accounts",
      subTopics: ["Accounts For IIT"],
    },
    {
      unitTitle: "Business Studies",
      subTopics: ["Business Studies For IIT"],
    },
    {
      unitTitle: "Economics",
      subTopics: ["Economics For IIT"],
    },
    {
      unitTitle: "Legal Studies",
      subTopics: ["Legal Studies For IIT"],
    },
  ];

  // Show modal
  function handleShow() {
    setShow(true);
  }

  // Close modal and clear form
  function handleClose() {
    setShow(false);
    setTitle("");
    setUrl("");
    setContent("");
    setUnits([]); // Reset the units
    setIsActive(false);
    setError(null);
  }

  // Toggle active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const handleSave = async () => {
    // Basic validation
    if (!title || !url || !content || units.length === 0) {
      setError(
        "Please provide a title, URL, description, and select at least one Unit."
      );
      return;
    }

    // Ensure subTopics is an array of objects with the correct structure
    const formattedUnits = units.map(unit => ({
      ...unit,
      subTopics: unit.subTopics.map(subTopic => {
        // Check if subTopic is a string or object and convert it to the required format
        if (typeof subTopic === "string") {
          return { subTitle: subTopic }; // Create an object with a subTitle field
        }
        return subTopic; // Return the subTopic object as is if it's already in the correct format
      }),
    }));

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());

    const newTopic = {
      title,
      url,
      content,
      units: formattedUnits, // Send the formatted units with subTopics as objects
      createdOn: formattedDate,
      updatedOn: formattedDate,
      active: isActive,
    };

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/topic/topic",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTopic),
        }
      );

      if (response.ok) {
        const savedTopics = await response.json();
        addNewTopics(savedTopics);
        handleClose();
      } else {
        const errorData = await response.json();
        setError(
          `Failed to save Topic List: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error details:", error);
      setError("Error saving subject: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitChange = e => {
    const selectedUnitTitle = e.target.value;
    const selectedUnit = unitOptions.find(
      unit => unit.unitTitle === selectedUnitTitle
    );

    if (selectedUnit) {
      setUnits([selectedUnit]); // Store the full unit object in `units`
    } else {
      setUnits([]); // Clear if no unit is selected
    }
  };

  return (
    <>
      <Button className="me-2 mb-2" onClick={handleShow}>
        Add New Topics
      </Button>

      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Topics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group
            className="mb-3 toggle-subject-active"
            controlId="formActiveToggle"
          >
            <Form.Check
              type="switch"
              id="active-toggle"
              label={isActive ? "Active" : "Inactive"}
              checked={isActive}
              onChange={handleToggle}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSubjectTitle">
            <Form.Label>Topic Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Topic Name"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Subject URL */}
          <Form.Group className="mb-3" controlId="formSubjectURL">
            <Form.Label>Topic URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Topic URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </Form.Group>

          {/* Subject Description */}
          <Form.Group className="mb-3" controlId="formSubjectDescription">
            <Form.Label>Topic Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter Topic Description"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>

          {/* Units Selection */}
          <Form.Group className="mb-3" controlId="formUnitsSelect">
            <Form.Label>Select Units</Form.Label>
            <Form.Control
              as="select"
              value={units.length ? units[0].unitTitle : ""}
              onChange={handleUnitChange}
            >
              <option value="">Select Unit</option>
              {unitOptions.map((unit, index) => {
                const subTopicsString = unit.subTopics.join(", ");
                return (
                  <option key={index} value={unit.unitTitle}>
                    {unit.unitTitle} ({subTopicsString})
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>

          {/* Error Message */}
          {error && <p className="text-danger">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn-cancle-back"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="btn-cancle-back"
            onClick={handleSave}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTopic;
