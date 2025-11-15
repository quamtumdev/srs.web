/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "react-select";
import { components } from "react-select";

// User roles options for the filter (Replace these with actual roles if needed)
const userRoleOptions = [
  { value: "Role_Admin", label: "Role_Admin" },
  { value: "Role_User", label: "Role_User" },
  { value: "Role_Editor", label: "Role_Editor" },
  { value: "Role_Super_Admin", label: "Role_Super_Admin" },
];

const UserFilter = ({ onUserRoleSelect }) => {
  // State to handle loading status and filtered options
  const [loading, setLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(userRoleOptions); // Store filtered options

  // Handle user role selection (supports multi-value selection)
  const handleRoleChange = selectedOptions => {
    onUserRoleSelect(selectedOptions); // Notify parent about the selected roles (an array of selected options)
  };

  // Handle default option to show all user roles when nothing is selected
  const handleClearSelection = () => {
    onUserRoleSelect(null); // Reset selection (set to null)
  };

  // Handle searching within the options
  const handleInputChange = inputValue => {
    setLoading(true); // Show loading spinner
    if (inputValue) {
      // Filter the options based on the input search
      const filtered = userRoleOptions.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      // If input is empty, show all options
      setFilteredOptions(userRoleOptions);
    }
    setLoading(false); // Hide loading spinner after filtering
  };

  // Custom Loading Indicator for React Select
  const CustomLoadingIndicator = () => (
    <components.LoadingIndicator>
      <div className="loading-spinner">
        <span>Loading...</span>
      </div>
    </components.LoadingIndicator>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Select
            className="user-role-filter"
            onChange={handleRoleChange} // Handle role selection change
            options={filteredOptions} // Dynamically filtered options
            placeholder="Select user roles"
            isClearable // Allow clearing the selection (to reset to "all")
            onClear={handleClearSelection} // Call when the selection is cleared
            defaultValue={null} // Default value to null, meaning no selection
            onInputChange={handleInputChange} // Triggered during input search
            components={{ LoadingIndicator: CustomLoadingIndicator }} // Custom loading indicator
            isSearchable // Allow searching within the dropdown
            isLoading={loading} // Show loading spinner when searching
            isMulti // Enable multi-select (allow selecting multiple roles)
            closeMenuOnSelect={false} // Keeps the dropdown open when selecting multiple options
          />
        </div>
      </div>
    </div>
  );
};

export default UserFilter;
