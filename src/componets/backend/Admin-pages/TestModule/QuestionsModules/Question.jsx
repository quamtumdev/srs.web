// Question.js
import { useState } from "react";
import Questions from "../../QuestionsModules/Questions"; // Your Questions component
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap Modal and Button

export default function Question() {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleShow = () => setShowModal(true); // Function to open modal
  const handleClose = () => setShowModal(false); // Function to close modal

  return (
    <div>
      {/* Button to trigger modal */}
      <Button variant="primary" onClick={handleShow}>
        Add Questions
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Questions</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "110vh", // Sets the max height of modal body
            overflowY: "auto", // Enables scrolling
          }}
        >
          {/* Render the Questions component inside the modal */}
          <Questions />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
