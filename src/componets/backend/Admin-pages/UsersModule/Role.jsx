/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

function Role({ onSaveRoles, selectedRoles }) {
  const [selectedOptions, setSelectedOptions] = useState([]); // To store selected options in { value, label } format

  // Available role options in the format required by react-select
  const options = [
    { value: "Role_Admin", label: "Role_Admin" },
    { value: "Role_User", label: "Role_User" },
    { value: "Role_Editor", label: "Role_Editor" },
    { value: "Role_Super_Admin", label: "Role_Super_Admin" },
  ];

  // When the selection changes in the react-select dropdown
  const handleChange = selectedOptions => {
    setSelectedOptions(selectedOptions); // Update state with the selected options
    const updatedRoles = selectedOptions
      ? selectedOptions.map(option => option.value) // Map to values only
      : [];
    onSaveRoles(updatedRoles); // Save the selected role values (just the values, not { value, label })
  };

  // Synchronize the local state with selectedRoles whenever it changes
  useEffect(() => {
    if (selectedRoles && Array.isArray(selectedRoles)) {
      // Update the state with selected roles when selectedRoles prop changes
      const selectedRoleOptions = selectedRoles.map(role => ({
        value: role,
        label: role,
      }));
      setSelectedOptions(selectedRoleOptions); // Update the selected options state
    }
  }, [selectedRoles]);

  return (
    <div className="mt-2 mb-2">
      <Form.Label>Roles</Form.Label>

      <Select
        options={options}
        value={selectedOptions} // Set the selected options (roles) as the value
        onChange={handleChange} // Handle changes to the selected roles
        placeholder="Select Roles"
        closeMenuOnSelect={true}
        isMulti
      />
    </div>
  );
}

export default Role;
