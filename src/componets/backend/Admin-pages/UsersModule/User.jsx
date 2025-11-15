import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import * as XLSX from "xlsx"; // Import xlsx

import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import AddUser from "./AddUser.jsx";
import EditUser from "./EditUser.jsx";
import UserFilter from "./UserFilter.jsx";
import UserDetailFilter from "./UserDetailFilter.jsx";

const User = () => {
  const [usersData, setUsersData] = useState([]); // Initially empty array
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal open/close state
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors
  const [selectedRoles, setSelectedRoles] = useState(null);
  const [selectedUersDetailed, setSelectedUersDetailed] = useState(null);

  const handleUserRoleSelect = selectedOptions => {
    setSelectedRoles(selectedOptions);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading state to true
      setError(null); // Reset any previous errors

      try {
        let url = "http://localhost:5000/api/auth/users"; // Default URL
        const filters = [];

        // Add selectedRoles to filters if they exist (for roles filtering)
        if (selectedRoles && selectedRoles.length > 0) {
          selectedRoles.forEach(role => {
            filters.push(`role=${encodeURIComponent(role.value.trim())}`);
          });
        }

        // Now handle the user details filtering (username, email, mobile)
        const detailsFilters = [];
        // Now handle the user details filtering (username, email, mobile)
        if (selectedUersDetailed) {
          if (selectedUersDetailed.mobile) {
            detailsFilters.push(
              `mobile=${encodeURIComponent(selectedUersDetailed.mobile)}`
            );
          } else if (selectedUersDetailed.email) {
            detailsFilters.push(
              `email=${encodeURIComponent(selectedUersDetailed.email)}`
            );
          } else if (selectedUersDetailed.userName) {
            detailsFilters.push(
              `userName=${encodeURIComponent(selectedUersDetailed.userName)}`
            );
          }
        }

        // Combine all filters into one query string
        if (filters.length > 0) {
          // Append filters and details filters into the same URL
          url = `${url}/filter?${filters.concat(detailsFilters).join("&")}`;
        }

        if (detailsFilters.length > 0) {
          // Append details filters
          url = `${url}/filter/details?${detailsFilters.join("&")}`;
        }

        // Fetch the filtered data
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch filtered users");
        }

        const data = await response.json();
        setUsersData(data); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching users: " + error.message); // Handle error
      } finally {
        setLoading(false); // Reset loading state after request
      }
    };

    fetchUsers(); // Fetch data when selectedRoles or selectedUersDetailed changes
  }, [selectedRoles, selectedUersDetailed]);

  // Add a new user
  const addNewUser = newUser => {
    setUsersData([...usersData, newUser]);
  };

  // Toggle the active status of a user
  const toggleActiveStatus = id => {
    setUsersData(prevData =>
      prevData.map(user =>
        user.userId === id ? { ...user, active: !user.active } : user
      )
    );
  };

  // Open the edit modal
  const openEditModal = user => {
    setSelectedUser(user); // Set the selected user to edit
    setIsEditModalOpen(true); // Open the edit modal
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setSelectedUser(null); // Clear selected user
  };

  // Function to handle Export to Excel
  const exportToExcel = () => {
    // Mapping the users data into a simpler structure for the Excel file
    const exportData = usersData.map((user, index) => ({
      "S.No": index + 1,
      Name: user.userName,
      Email: user.email,
      "Phone Number": user.mobile,
      Provider: user.provider,
      "Date of Creation": user.createdOn,
    }));

    // Create a new workbook
    const ws = XLSX.utils.json_to_sheet(exportData); // Convert the JSON data into a worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Users"); // Append the worksheet to the workbook

    // Export the workbook to a file
    XLSX.writeFile(wb, "users_data.xlsx"); // Download the file as "users_data.xlsx"
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="mb-3 mt-2">
              <div className="row">
                <h6>Filter By</h6>
                <div className="col-lg-5">
                  <UserFilter onUserRoleSelect={handleUserRoleSelect} />
                </div>
                <div className="col-lg-5">
                  <UserDetailFilter onChange={setSelectedUersDetailed} />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <h1 className="user-h1">Users</h1>
            </div>
            <div className="col-sm-3">
              <ol className="breadcrumb float-sm-right">
                <AddUser addNewUser={addNewUser} />
              </ol>
            </div>
            <div className="col-sm-3">
              {/* Export to Excel Button */}
              <button
                className="btn btn-primary user-excel-btn"
                onClick={exportToExcel}
              >
                Export to Excel
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Loading and Error Handling */}
            {loading && <p>Loading users...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Loop through fetched users data and display them */}
            {usersData.map(user => (
              <div className="col-md-12" key={user.userId}>
                <div className="card collapsed-card">
                  <div className="card-header ">
                    <div className="user-container">
                      <div>
                        <span className="user-title">{user.userName}</span>
                      </div>
                      <div>
                        <span className="user-details-label">
                          Email: {user.email}
                        </span>
                      </div>
                      <div>
                        <span className="user-details-label">
                          Provider: {user.provider}
                        </span>
                      </div>
                    </div>
                    <div className="card-tools ">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                      <button
                        type="button"
                        className={`btn user-custom-btn ${
                          user.active ? "active-btn" : "inactive-btn"
                        }`}
                        onClick={() => toggleActiveStatus(user.userId)}
                      >
                        {user.active ? "Active" : "Inactive"}
                      </button>
                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn user-custom-btn edit-btn"
                        onClick={() => openEditModal(user)}
                      >
                        <FaEdit className="fs-4" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body user -card">
                    {/* User details */}
                    <div className="row">
                      <div className="col-md-6 details-label">
                        <strong>User Id:</strong>
                        {user.userId}
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>Roles:</strong>
                        {user.role}
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>Email:</strong>
                        {user.email}
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>Mobile Number:</strong>
                        {user.mobile}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Render EditUser  Modal */}
      {isEditModalOpen && (
        <EditUser
          user={selectedUser}
          setUsersData={setUsersData}
          closeEditModal={closeEditModal}
        />
      )}
    </>
  );
};

export default User;
