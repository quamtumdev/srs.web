import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap"; // To use Form components like Input
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import Role from "./Role.jsx";

// eslint-disable-next-line react/prop-types
function AddUser({ addNewUser }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [userName, setUserName] = useState(""); // User name
  const [mobile, setMobile] = useState(""); // User mobile
  const [email, setEmail] = useState(""); // User email
  const [password, setPassword] = useState(""); // User password
  const [role, setRoles] = useState(""); // User role
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Show modal
  function handleShow() {
    setShow(true);
  }

  // Close modal and clear form
  function handleClose() {
    setShow(false);
    setUserName(""); // Clear userName field
    setMobile(""); // Clear mobile field
    setEmail(""); // Clear email field
    setPassword(""); // Clear password field
    setRoles(""); // Clear role field
    setIsActive(false); // Reset active status to false
    setError(null); // Clear any error message
  }

  // Toggle active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  // Handle Save User
  const handleSave = async () => {
    // Basic validation
    if (!userName || !mobile || !email || !password || !role) {
      setError("Please provide all required fields.");
      return;
    }

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short", // Abbreviated month (e.g., "Feb")
      day: "2-digit", // Two-digit day (e.g., "10")
      hour: "2-digit", // Two-digit hour (e.g., "10")
      minute: "2-digit", // Two-digit minute (e.g., "18")
      hour12: true, // Use 12-hour format with AM/PM
    }).format(new Date());

    const newUser = {
      userName,
      mobile,
      email,
      password,
      role, // Assume role is a single string in an array
      createdOn: formattedDate,
      updatedOn: formattedDate,
      active: isActive,
    };

    setLoading(true); // Set loading state to true while saving

    try {
      // Send POST request to the backend to save the new user
      const response = await fetch("http://localhost:5000/api/auth/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser), // Convert the user object to a JSON string
      });

      if (response.ok) {
        const savedUser = await response.json();
        addNewUser(savedUser); // Add the new user to the parent component's list
        handleClose(); // Close the modal and reset the form
      } else {
        throw new Error("Failed to save user.");
      }
    } catch (error) {
      setError("Error saving user: " + error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleSaveRoles = selectedRoles => {
    setRoles(selectedRoles); // Update the roles list in the parent component
  };

  return (
    <>
      {/* Button to trigger modal */}
      <Button onClick={handleShow}>Add New User</Button>

      {/* Fullscreen Modal */}
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Active/Inactive Toggle */}
          <Form.Group
            className="mb-3 toggle-stream-active"
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
          {/* User Name */}
          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </Form.Group>

          {/* Mobile */}
          <Form.Group className="mb-3" controlId="formMobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* Role */}
          <div>
            <Role onSaveRoles={handleSaveRoles} selectedRoles={role} />
          </div>
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

export default AddUser;
