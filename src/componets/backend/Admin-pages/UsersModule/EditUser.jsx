/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import "../../Admin/AdminCSS.css"; // Global CSS for styling
import "../../Admin/AdminJS.js"; // Additional JS if needed
import Role from "./Role.jsx";

const EditUser = ({ user, setUsersData, closeEditModal }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isActive, setIsActive] = useState(false); // Active status
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track errors
  const [role, setRoles] = useState(""); // User role

  // Set form values when the modal is opened
  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setEmail(user.email);
      setMobile(user.mobile);
      setIsActive(user.active);
      setRoles(user.role);
    }
  }, [user]);

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

  // Handle saving the updated user
  const handleSave = async () => {
    setLoading(true); // Set loading to true while making the API request
    try {
      const updatedUser = {
        ...user,
        userName,
        email,
        mobile,
        role,
        active: isActive,
        updatedBy: "admin", // Assuming admin is updating the user
        updatedOn: formatDate(),
      };

      const response = await fetch(
        `http://localhost:5000/api/auth/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedData = await response.json();
      // Update the users list with the modified user
      setUsersData(prevData =>
        prevData.map(u => (u._id === user._id ? updatedData : u))
      );

      closeEditModal(); // Close the modal after saving
    } catch (error) {
      setError("Error updating user: " + error.message); // Handle error
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  // Toggle the active status
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const handleSaveRoles = selectedRoles => {
    setRoles(selectedRoles); // Update the roles list in the parent component
  };

  // Handle user deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/users/${user._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        // After deletion, update the users list
        setUsersData(prevData => prevData.filter(u => u._id !== user._id));

        closeEditModal(); // Close the modal after deleting
      } catch (error) {
        setError("Error deleting user: " + error.message); // Handle error
      }
    }
  };

  return (
    <Modal show={true} onHide={closeEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Active/Inactive Toggle */}
        <Form.Group className="mb-3" controlId="formActiveToggle">
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
            value={userName}
            onChange={e => setUserName(e.target.value)}
            placeholder="Enter user name"
          />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter user email"
          />
        </Form.Group>

        {/* Mobile */}
        <Form.Group className="mb-3" controlId="formMobile">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="text"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            placeholder="Enter mobile number"
          />
        </Form.Group>
        {/* Role */}
        <div>
          <Role onSaveRoles={handleSaveRoles} selectedRoles={role} />
        </div>
        {/* Error message */}
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
          disabled={loading} // Disable save button while loading
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUser;
