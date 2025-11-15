/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import "../../Admin/AdminJS.js";
import "../../Admin/AdminCSS.css";

function EditTopic({ topic, setTopicsData, closeEditModal }) {
  const [isActive, setIsActive] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [units, setUnits] = useState(""); // Multiple units selected
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

  useEffect(() => {
    if (topic) {
      setTitle(topic.title);
      setUrl(topic.url);
      setContent(topic.content);
      setUnits(topic.units);
      setIsActive(topic.active);
      setError(null);
    }
  }, [topic]);

  // Format the current date as 'Nov 20, 2024, 12:58 PM'
  const formatDate = () => {
    const date = new Date();
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short", // Abbreviated month (e.g., "Nov")
      day: "2-digit", // Two-digit day (e.g., "20")
      hour: "2-digit", // Two-digit hour (e.g., "12")
      minute: "2-digit", // Two-digit minute (e.g., "58")
      hour12: true, // Use 12-hour format with AM/PM
    }).format(date);
  };

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
        if (typeof subTopic === "string") {
          return { subTitle: subTopic };
        }
        return subTopic;
      }),
    }));

    const updatedTopic = {
      title,
      url,
      content,
      units: formattedUnits,
      active: isActive,
      updatedOn: formatDate(),
    };

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/topic/topic/${topic._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTopic),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update Topics");
      }
      const updatedData = await response.json();
      // Update the streams list with the modified stream
      setTopicsData(prevData =>
        prevData.map(s => (s._id === topic._id ? updatedData : s))
      );

      closeEditModal(); // Close the modal after saving
    } catch (error) {
      setError("Error updating topics: " + error.message); // Handle error
    } finally {
      setLoading(false); // Reset loading state after request
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

  // Handle Delete Subject
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/topic/topic/${topic._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete Topics");
        }

        // After deletion, update the streams list
        setTopicsData(prevData => prevData.filter(s => s._id !== topic._id));

        closeEditModal(); // Close the modal after deleting
      } catch (error) {
        setError("Error deleting Topics: " + error.message); // Handle error
      }
    }
  };

  return (
    <>
      <Modal show={true} fullscreen={true} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Topic</Modal.Title>
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

          <Form.Group className="mb-3" controlId="formSubjectURL">
            <Form.Label>Topic URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Topic URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </Form.Group>

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

          {error && <p className="text-danger">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn-cancle-back"
            onClick={closeEditModal}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete} // Trigger delete
          >
            Delete
          </Button>
          <Button
            variant="primary"
            className="btn-cancle-back"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTopic;
